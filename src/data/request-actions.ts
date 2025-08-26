"use server";

import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { revalidatePath, revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { sanitizeObject } from "@/lib/utils";
import type { ActionResponse } from "@/data/types/action-response";
import { appErrors } from "@/data/types/errors";
import { RequestStatus, ActivityType, CommentVisibility } from "@prisma/client";
import { getCurrentUser, logActivity } from "./request-utils";

// Schemas for validation
const createRequestSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
  priority: z.number().int().min(1).max(5).default(3),
});

const updateRequestSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(255).optional(),
  description: z.string().min(1).optional(),
  priority: z.number().int().min(1).max(5).optional(),
  status: z.nativeEnum(RequestStatus).optional(),
  eta: z.date().optional(),
  previewUrl: z.string().url().optional().nullable(),
});

const updateRequestStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.nativeEnum(RequestStatus),
});

const addCommentSchema = z.object({
  requestId: z.string().uuid(),
  body: z.string().min(1, "Comment cannot be empty"),
  visibility: z.nativeEnum(CommentVisibility).default(CommentVisibility.PUBLIC),
});

const addAttachmentSchema = z.object({
  requestId: z.string().uuid(),
  url: z.string().url(),
  kind: z.string().optional(),
});

const createBulkRequestsSchema = z.object({
  requests: z
    .array(
      z.object({
        title: z.string().min(1, "Title is required").max(255),
        description: z.string().min(1, "Description is required"),
        priority: z.number().int().min(1).max(5).default(3),
      })
    )
    .min(1, "At least one request is required"),
});

// Create new request
export const createRequest = createSafeActionClient()
  .schema(createRequestSchema)
  .action(async (input): Promise<ActionResponse> => {
    try {
      const user = await getCurrentUser();

      // Check if user already has an active request
      const activeRequest = await prisma.request.findFirst({
        where: {
          userId: user.id,
          status: RequestStatus.ACTIVE,
        },
      });

      if (activeRequest) {
        return {
          success: false,
          error:
            "You already have an active request. Only one request can be active at a time.",
        };
      }

      // Get the highest order index for backlog items
      const lastBacklogItem = await prisma.request.findFirst({
        where: {
          userId: user.id,
          status: RequestStatus.BACKLOG,
        },
        orderBy: { orderIndex: "desc" },
      });

      const newOrderIndex = (lastBacklogItem?.orderIndex || 0) + 1;

      const sanitizedData = sanitizeObject(input.parsedInput);

      const request = await prisma.request.create({
        data: {
          ...sanitizedData,
          userId: user.id,
          createdById: user.id,
          status: RequestStatus.BACKLOG,
          orderIndex: newOrderIndex,
        },
        include: {
          comments: true,
          attachments: true,
          _count: {
            select: {
              comments: true,
              attachments: true,
            },
          },
        },
      });

      // Log activity
      await logActivity(user.id, request.id, ActivityType.CREATED, {
        title: request.title,
      });

      // Invalidate cache
      revalidateTag("requests");
      revalidatePath("/dashboard/requests");

      return {
        success: true,
        data: request,
      };
    } catch (error) {
      console.error("Create request error:", error);
      return {
        success: false,
        error: appErrors.DATABASE_ERROR,
      };
    }
  });

// Update request
export const updateRequest = createSafeActionClient()
  .schema(updateRequestSchema)
  .action(async (input): Promise<ActionResponse> => {
    try {
      const user = await getCurrentUser();

      // Get current request to track changes
      const currentRequest = await prisma.request.findFirst({
        where: {
          id: input.parsedInput.id,
          userId: user.id,
        },
      });

      if (!currentRequest) {
        return {
          success: false,
          error: appErrors.NOT_FOUND,
        };
      }

      const { id: requestId, ...updateData } = input.parsedInput;
      const sanitizedUpdateData = sanitizeObject(updateData);

      const updatedRequest = await prisma.request.update({
        where: { id: requestId },
        data: sanitizedUpdateData,
        include: {
          comments: true,
          attachments: true,
          _count: {
            select: {
              comments: true,
              attachments: true,
            },
          },
        },
      });

      // Log activity for changes
      const changes: Record<string, { from: unknown; to: unknown }> = {};
      if (updateData.title && updateData.title !== currentRequest.title) {
        changes.title = { from: currentRequest.title, to: updateData.title };
      }
      if (updateData.status && updateData.status !== currentRequest.status) {
        changes.status = { from: currentRequest.status, to: updateData.status };
      }
      if (
        updateData.priority &&
        updateData.priority !== currentRequest.priority
      ) {
        changes.priority = {
          from: currentRequest.priority,
          to: updateData.priority,
        };
      }

      if (Object.keys(changes).length > 0) {
        await logActivity(
          user.id,
          updatedRequest.id,
          ActivityType.UPDATED,
          changes
        );
      }

      // Invalidate cache
      revalidateTag("requests");
      revalidateTag("request");
      revalidatePath("/dashboard/requests");
      revalidatePath(`/dashboard/requests/${requestId}`);

      return {
        success: true,
        data: updatedRequest,
      };
    } catch (error) {
      console.error("Update request error:", error);
      return {
        success: false,
        error: appErrors.DATABASE_ERROR,
      };
    }
  });

// Update request status (with business logic)
export const updateRequestStatus = createSafeActionClient()
  .schema(updateRequestStatusSchema)
  .action(async (input): Promise<ActionResponse> => {
    try {
      const user = await getCurrentUser();

      // Get current request
      const currentRequest = await prisma.request.findFirst({
        where: {
          id: input.parsedInput.id,
          userId: user.id,
        },
      });

      if (!currentRequest) {
        return {
          success: false,
          error: appErrors.NOT_FOUND,
        };
      }

      // If setting to ACTIVE, check if user already has an active request
      if (input.parsedInput.status === RequestStatus.ACTIVE) {
        const activeRequest = await prisma.request.findFirst({
          where: {
            userId: user.id,
            status: RequestStatus.ACTIVE,
            id: { not: input.parsedInput.id },
          },
        });

        if (activeRequest) {
          return {
            success: false,
            error:
              "You already have an active request. Only one request can be active at a time.",
          };
        }
      }

      const updatedRequest = await prisma.request.update({
        where: { id: input.parsedInput.id },
        data: { status: input.parsedInput.status },
        include: {
          comments: true,
          attachments: true,
          _count: {
            select: {
              comments: true,
              attachments: true,
            },
          },
        },
      });

      // Log status change activity
      await logActivity(
        user.id,
        updatedRequest.id,
        ActivityType.STATUS_CHANGED,
        {
          from: currentRequest.status,
          to: input.parsedInput.status,
        }
      );

      // Invalidate cache
      revalidateTag("requests");
      revalidateTag("request");
      revalidatePath("/dashboard/requests");
      revalidatePath(`/dashboard/requests/${input.parsedInput.id}`);

      return {
        success: true,
        data: updatedRequest,
      };
    } catch (error) {
      console.error("Update request status error:", error);
      return {
        success: false,
        error: appErrors.DATABASE_ERROR,
      };
    }
  });

// Add comment to request
export const addComment = createSafeActionClient()
  .schema(addCommentSchema)
  .action(async (input): Promise<ActionResponse> => {
    try {
      const user = await getCurrentUser();

      // Verify user owns the request
      const request = await prisma.request.findFirst({
        where: {
          id: input.parsedInput.requestId,
          userId: user.id,
        },
      });

      if (!request) {
        return {
          success: false,
          error: appErrors.NOT_FOUND,
        };
      }

      const sanitizedCommentData = sanitizeObject(input.parsedInput);

      const comment = await prisma.requestComment.create({
        data: {
          ...sanitizedCommentData,
          authorId: user.id,
        },
        include: {
          author: {
            select: { name: true, email: true, avatarUrl: true },
          },
        },
      });

      // Log comment activity
      await logActivity(
        user.id,
        input.parsedInput.requestId,
        ActivityType.COMMENT_ADDED,
        { commentId: comment.id }
      );

      // Invalidate cache
      revalidateTag("request");
      revalidatePath(`/dashboard/requests/${input.parsedInput.requestId}`);

      return {
        success: true,
        data: comment,
      };
    } catch (error) {
      console.error("Add comment error:", error);
      return {
        success: false,
        error: appErrors.DATABASE_ERROR,
      };
    }
  });

// Add attachment to request
export const addAttachment = createSafeActionClient()
  .schema(addAttachmentSchema)
  .action(async (input): Promise<ActionResponse> => {
    try {
      const user = await getCurrentUser();

      // Verify user owns the request
      const request = await prisma.request.findFirst({
        where: {
          id: input.parsedInput.requestId,
          userId: user.id,
        },
      });

      if (!request) {
        return {
          success: false,
          error: appErrors.NOT_FOUND,
        };
      }

      const attachment = await prisma.attachment.create({
        data: {
          ...input.parsedInput,
          userId: user.id,
          uploadedBy: user.id,
        },
      });

      // Log attachment activity
      await logActivity(
        user.id,
        input.parsedInput.requestId,
        ActivityType.ATTACHMENT_ADDED,
        { attachmentId: attachment.id, url: attachment.url }
      );

      // Invalidate cache
      revalidateTag("request");
      revalidatePath(`/dashboard/requests/${input.parsedInput.requestId}`);

      return {
        success: true,
        data: attachment,
      };
    } catch (error) {
      console.error("Add attachment error:", error);
      return {
        success: false,
        error: appErrors.DATABASE_ERROR,
      };
    }
  });

// Delete request (only if in BACKLOG)
export const deleteRequest = createSafeActionClient()
  .schema(z.object({ id: z.string().uuid() }))
  .action(async (input): Promise<ActionResponse> => {
    try {
      const user = await getCurrentUser();

      const request = await prisma.request.findFirst({
        where: {
          id: input.parsedInput.id,
          userId: user.id,
        },
      });

      if (!request) {
        return {
          success: false,
          error: appErrors.NOT_FOUND,
        };
      }

      // Only allow deletion of BACKLOG requests
      if (request.status !== RequestStatus.BACKLOG) {
        return {
          success: false,
          error: "Only requests in BACKLOG can be deleted",
        };
      }

      await prisma.request.delete({
        where: { id: input.parsedInput.id },
      });

      // Invalidate cache
      revalidateTag("requests");
      revalidatePath("/dashboard/requests");

      return {
        success: true,
        data: { message: "Request deleted successfully" },
      };
    } catch (error) {
      console.error("Delete request error:", error);
      return {
        success: false,
        error: appErrors.DATABASE_ERROR,
      };
    }
  });

// Create multiple requests in bulk
export const createBulkRequests = createSafeActionClient()
  .schema(createBulkRequestsSchema)
  .action(async (input): Promise<ActionResponse> => {
    try {
      const user = await getCurrentUser();

      // Check if user already has an active request
      const activeRequest = await prisma.request.findFirst({
        where: {
          userId: user.id,
          status: RequestStatus.ACTIVE,
        },
      });

      if (activeRequest) {
        return {
          success: false,
          error:
            "You already have an active request. Only one request can be active at a time.",
        };
      }

      // Get the highest order index for backlog items
      const lastBacklogItem = await prisma.request.findFirst({
        where: {
          userId: user.id,
          status: RequestStatus.BACKLOG,
        },
        orderBy: { orderIndex: "desc" },
      });

      let currentOrderIndex = (lastBacklogItem?.orderIndex || 0) + 1;

      // Create all requests in a transaction
      const createdRequests = await prisma.$transaction(
        input.parsedInput.requests.map((requestData) => {
          const sanitizedData = sanitizeObject(requestData);
          const orderIndex = currentOrderIndex++;

          return prisma.request.create({
            data: {
              ...sanitizedData,
              userId: user.id,
              createdById: user.id,
              status: RequestStatus.BACKLOG,
              orderIndex,
            },
            include: {
              comments: true,
              attachments: true,
              _count: {
                select: {
                  comments: true,
                  attachments: true,
                },
              },
            },
          });
        })
      );

      // Log activity for each created request
      await Promise.all(
        createdRequests.map((request) =>
          logActivity(user.id, request.id, ActivityType.CREATED, {
            title: request.title,
            bulkCreate: true,
          })
        )
      );

      // Invalidate cache
      revalidateTag("requests");
      revalidatePath("/dashboard/requests");

      return {
        success: true,
        data: createdRequests,
      };
    } catch (error) {
      console.error("Create bulk requests error:", error);
      return {
        success: false,
        error: appErrors.DATABASE_ERROR,
      };
    }
  });

// Reorder requests in backlog
export const reorderRequests = createSafeActionClient()
  .schema(
    z.object({
      requestIds: z.array(z.string().uuid()),
    })
  )
  .action(async (input): Promise<ActionResponse> => {
    try {
      const user = await getCurrentUser();

      // Update order indexes
      await Promise.all(
        input.parsedInput.requestIds.map((id, index) =>
          prisma.request.updateMany({
            where: {
              id,
              userId: user.id,
              status: RequestStatus.BACKLOG,
            },
            data: { orderIndex: index + 1 },
          })
        )
      );

      // Invalidate cache
      revalidateTag("requests");
      revalidatePath("/dashboard/requests");

      return {
        success: true,
        data: { message: "Requests reordered successfully" },
      };
    } catch (error) {
      console.error("Reorder requests error:", error);
      return {
        success: false,
        error: appErrors.DATABASE_ERROR,
      };
    }
  });
