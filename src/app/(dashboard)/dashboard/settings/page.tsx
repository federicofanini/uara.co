import { SettingsPage } from "@/components/dashboard/settings";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function DashboardSettingsPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  // Fetch user data with billing information
  const dbUser = await prisma.user.findUnique({
    where: { authProviderId: user.id },
    include: {
      subscriptions: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
      payments: {
        orderBy: { paidAt: "desc" },
        take: 5,
      },
    },
  });

  if (!dbUser) {
    redirect("/api/auth/creation");
  }

  const userData = {
    plan: dbUser.plan,
    stripeCustomerId: dbUser.stripeCustomerId,
    subscription: dbUser.subscriptions[0]
      ? {
          status: dbUser.subscriptions[0].status,
          currentPeriodEnd: dbUser.subscriptions[0].currentPeriodEnd,
          cancelAtPeriodEnd: dbUser.subscriptions[0].cancelAtPeriodEnd,
        }
      : null,
    recentPayments: dbUser.payments.map((payment) => ({
      id: payment.id,
      amountCents: payment.amountCents,
      currency: payment.currency,
      paidAt: payment.paidAt,
      periodStart: payment.periodStart,
      periodEnd: payment.periodEnd,
    })),
  };

  return <SettingsPage userData={userData} />;
}
