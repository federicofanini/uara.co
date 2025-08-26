"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/prisma";
import { appErrors } from "@/data/types/errors";
import { ActivityType, Prisma } from "@prisma/client";

// Helper function to get current user with retry logic
export async function getCurrentUser() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id) {
    throw new Error(appErrors.UNAUTHORIZED);
  }

  // Retry logic for database operations
  const maxRetries = 3;
  let lastError: Error;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const dbUser = await prisma.user.findUnique({
        where: { authProviderId: user.id },
      });

      if (!dbUser) {
        throw new Error(appErrors.NOT_FOUND);
      }

      return dbUser;
    } catch (error) {
      lastError = error as Error;

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

// Helper function to log activity
export async function logActivity(
  userId: string,
  requestId: string,
  type: ActivityType,
  meta?: Record<string, unknown> | null,
  actorId?: string
) {
  await prisma.activity.create({
    data: {
      userId,
      requestId,
      type,
      meta: meta as unknown as Prisma.InputJsonValue, // Prisma JsonB type handling
      actorId: actorId || userId,
    },
  });
}
