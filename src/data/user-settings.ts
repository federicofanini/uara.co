"use server";

import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/prisma";
import type { ActionResponse } from "@/data/types/action-response";
import { appErrors } from "@/data/types/errors";

// Schemas for validation
const updateNotificationSettingsSchema = z.object({
  notifyOnStatus: z.boolean(),
  notifyOnComment: z.boolean(),
  marketingEmails: z.boolean(),
});

const createUserSettingsSchema = z.object({
  userId: z.string().uuid(),
  notifyOnStatus: z.boolean().default(true),
  notifyOnComment: z.boolean().default(true),
  marketingEmails: z.boolean().default(false),
});

// Helper function to get current user
async function getCurrentUser() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id) {
    throw new Error(appErrors.UNAUTHORIZED);
  }

  const dbUser = await prisma.user.findUnique({
    where: { authProviderId: user.id },
    include: { settings: true },
  });

  if (!dbUser) {
    throw new Error(appErrors.NOT_FOUND);
  }

  return dbUser;
}

// Action to get user settings
export async function getUserSettings(): Promise<ActionResponse> {
  try {
    const user = await getCurrentUser();

    // If no settings exist, create default ones
    if (!user.settings) {
      const defaultSettings = await prisma.userSettings.create({
        data: {
          userId: user.id,
          notifyOnStatus: true,
          notifyOnComment: true,
          marketingEmails: false,
        },
      });

      return {
        success: true,
        data: defaultSettings,
      };
    }

    return {
      success: true,
      data: user.settings,
    };
  } catch (error) {
    console.error("Get user settings error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : appErrors.UNEXPECTED_ERROR,
    };
  }
}

// Action to create user settings (used during user creation)
export const createUserSettings = createSafeActionClient()
  .schema(createUserSettingsSchema)
  .action(async (input): Promise<ActionResponse> => {
    try {
      const settings = await prisma.userSettings.create({
        data: input.parsedInput,
      });

      return {
        success: true,
        data: settings,
      };
    } catch (error) {
      console.error("Create user settings error:", error);
      return {
        success: false,
        error: appErrors.DATABASE_ERROR,
      };
    }
  });

// Action to update notification settings
export const updateNotificationSettings = createSafeActionClient()
  .schema(updateNotificationSettingsSchema)
  .action(async (input): Promise<ActionResponse> => {
    try {
      const user = await getCurrentUser();

      const updatedSettings = await prisma.userSettings.upsert({
        where: { userId: user.id },
        update: input.parsedInput,
        create: {
          userId: user.id,
          ...input.parsedInput,
        },
      });

      revalidatePath("/dashboard/settings");

      return {
        success: true,
        data: updatedSettings,
      };
    } catch (error) {
      console.error("Update notification settings error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : appErrors.UNEXPECTED_ERROR,
      };
    }
  });

// Action to delete user account and all associated data
export const deleteUserAccount = createSafeActionClient()
  .schema(z.object({}))
  .action(async (): Promise<ActionResponse> => {
    try {
      const user = await getCurrentUser();

      // Delete user (cascade will handle related data)
      await prisma.user.delete({
        where: { id: user.id },
      });

      return {
        success: true,
        data: { message: "Account deleted successfully" },
      };
    } catch (error) {
      console.error("Delete user account error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : appErrors.UNEXPECTED_ERROR,
      };
    }
  });
