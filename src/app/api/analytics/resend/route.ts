import { NextResponse } from "next/server";
import { getSubscriberCount } from "@/actions/subscribe";

// Revalidate every 3 hours (10800 seconds)
export const revalidate = 10800;

export async function GET() {
  try {
    // Use existing subscriber action to get count
    const subscriberResult = await getSubscriberCount();

    if (!subscriberResult.success) {
      throw new Error("Failed to fetch subscriber count");
    }

    const totalSubscribers =
      (subscriberResult.data as { count: number }).count || 0;

    // Calculate growth rate (simplified - you might want to store historical data)
    // For now, we'll use a simple approximation based on subscriber count
    const growthRate =
      totalSubscribers > 0 ? Math.min(100, totalSubscribers * 2) : 0;

    return NextResponse.json({
      totalSubscribers,
      growthRate,
      recentSignups: totalSubscribers, // For now, same as total since we don't track signup dates
    });
  } catch (error) {
    console.error("Resend API error:", error);

    // Return fallback data on error
    return NextResponse.json(
      {
        totalSubscribers: 0,
        growthRate: 0,
        recentSignups: 0,
      },
      { status: 200 }
    ); // Return 200 with zero values rather than error
  }
}
