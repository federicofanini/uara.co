import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.email) {
      return NextResponse.redirect(new URL("/api/auth/login", request.url));
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { authProviderId: user.id },
    });

    // Create user if doesn't exist
    if (!existingUser) {
      const newUser = await prisma.user.create({
        data: {
          authProviderId: user.id,
          email: user.email,
          name:
            user.given_name && user.family_name
              ? `${user.given_name} ${user.family_name}`
              : user.given_name ?? user.family_name ?? null,
          avatarUrl: user.picture ?? null,
        },
      });

      // Initialize default user settings
      await prisma.userSettings.create({
        data: {
          userId: newUser.id,
          notifyOnStatus: true,
          notifyOnComment: true,
          marketingEmails: false,
        },
      });
    }

    // Redirect to home page
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } catch (error) {
    console.error("Error in user creation:", error);
    return NextResponse.json(
      { error: "Failed to process user creation" },
      { status: 500 }
    );
  }
}
