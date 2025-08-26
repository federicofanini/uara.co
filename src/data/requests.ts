"use server";

import { unstable_cache } from "next/cache";
import { appErrors } from "@/data/types/errors";
import type { ActionResponse } from "@/data/types/action-response";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "./request-utils";

// Internal function to fetch user requests from database
async function _getUserRequestsFromDB(userId: string) {
  const maxRetries = 3;
  let lastError: Error;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const requests = await prisma.request.findMany({
        where: { userId },
        include: {
          comments: {
            include: {
              author: {
                select: { name: true, email: true, avatarUrl: true },
              },
            },
            orderBy: { createdAt: "desc" },
            take: 3, // Only latest 3 comments for list view
          },
          attachments: true,
          _count: {
            select: {
              comments: true,
              attachments: true,
            },
          },
        },
        orderBy: [
          { status: "asc" }, // ACTIVE first, then BACKLOG, etc.
          { priority: "asc" },
          { orderIndex: "asc" },
          { createdAt: "desc" },
        ],
      });

      return requests;
    } catch (error) {
      lastError = error as Error;
      console.error(`Get user requests error (attempt ${attempt}):`, error);

      // If it's the last attempt, throw the error
      if (attempt === maxRetries) {
        throw lastError;
      }

      // Wait before retrying (exponential backoff)
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, attempt) * 100)
      );
    }
  }

  throw lastError!;
}

// Cached version of getUserRequests
const getCachedUserRequests = unstable_cache(
  async (userId: string) => _getUserRequestsFromDB(userId),
  ["user-requests"],
  {
    tags: ["requests"],
    revalidate: 300, // 5 minutes
  }
);

// Get all user requests with caching
export async function getUserRequests(): Promise<ActionResponse> {
  try {
    const user = await getCurrentUser();
    const requests = await getCachedUserRequests(user.id);

    return {
      success: true,
      data: requests,
    };
  } catch (error) {
    console.error("Get user requests error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : appErrors.UNEXPECTED_ERROR,
    };
  }
}

// Internal function to fetch a single request from database
async function _getRequestFromDB(id: string, userId: string) {
  const maxRetries = 3;
  let lastError: Error;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const request = await prisma.request.findFirst({
        where: {
          id,
          userId, // Ensure user owns the request
        },
        include: {
          comments: {
            include: {
              author: {
                select: { name: true, email: true, avatarUrl: true },
              },
            },
            orderBy: { createdAt: "asc" },
          },
          attachments: true,
          activities: {
            include: {
              actor: {
                select: { name: true, email: true, avatarUrl: true },
              },
            },
            orderBy: { createdAt: "desc" },
            take: 20,
          },
          createdBy: {
            select: { name: true, email: true, avatarUrl: true },
          },
        },
      });

      return request;
    } catch (error) {
      lastError = error as Error;
      console.error(`Get request error (attempt ${attempt}):`, error);

      // If it's the last attempt, throw the error
      if (attempt === maxRetries) {
        throw lastError;
      }

      // Wait before retrying (exponential backoff)
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, attempt) * 100)
      );
    }
  }

  throw lastError!;
}

// Cached version of getRequest
const getCachedRequest = unstable_cache(
  async (id: string, userId: string) => _getRequestFromDB(id, userId),
  ["request-detail"],
  {
    tags: ["request"],
    revalidate: 180, // 3 minutes
  }
);

// Get single request with full details and caching
export async function getRequest(id: string): Promise<ActionResponse> {
  try {
    const user = await getCurrentUser();
    const request = await getCachedRequest(id, user.id);

    if (!request) {
      return {
        success: false,
        error: appErrors.NOT_FOUND,
      };
    }

    return {
      success: true,
      data: request,
    };
  } catch (error) {
    console.error("Get request error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : appErrors.UNEXPECTED_ERROR,
    };
  }
}
