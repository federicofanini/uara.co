"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Download, ExternalLink } from "lucide-react";

interface BillingSettingsProps {
  userPlan: string;
  stripeCustomerId?: string | null;
  subscription?: {
    status: string;
    currentPeriodEnd: Date;
    cancelAtPeriodEnd: boolean;
  } | null;
  recentPayments?: Array<{
    id: string;
    amountCents: number;
    currency: string;
    paidAt: Date;
    periodStart?: Date | null;
    periodEnd?: Date | null;
  }>;
}

export function BillingSettings({
  userPlan,
  stripeCustomerId,
  subscription,
  recentPayments = [],
}: BillingSettingsProps) {
  const formatCurrency = (amountCents: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amountCents / 100);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "default";
      case "trialing":
        return "secondary";
      case "past_due":
      case "unpaid":
        return "destructive";
      case "canceled":
        return "outline";
      default:
        return "secondary";
    }
  };

  const handleManageBilling = () => {
    // This would typically redirect to Stripe Customer Portal
    window.open(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/billing/portal`,
      "_blank"
    );
  };

  const handleUpgrade = () => {
    // This would redirect to pricing/upgrade page
    window.open("/pricing", "_blank");
  };

  return (
    <div className="space-y-8">
      {/* Current Plan */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Current Plan</h3>
          <p className="text-sm text-muted-foreground">
            Manage your subscription and billing details.
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-medium">{userPlan} Plan</h4>
              {subscription && (
                <Badge variant={getStatusBadgeVariant(subscription.status)}>
                  {subscription.status}
                </Badge>
              )}
            </div>
            {subscription && (
              <p className="text-sm text-muted-foreground">
                {subscription.cancelAtPeriodEnd
                  ? `Cancels on ${formatDate(subscription.currentPeriodEnd)}`
                  : `Next billing: ${formatDate(
                      subscription.currentPeriodEnd
                    )}`}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            {userPlan === "STARTER" && (
              <Button variant="outline" onClick={handleUpgrade}>
                <ExternalLink className="mr-2 h-4 w-4" />
                Upgrade to Pro
              </Button>
            )}
            {stripeCustomerId && (
              <Button variant="outline" onClick={handleManageBilling}>
                <CreditCard className="mr-2 h-4 w-4" />
                Manage Billing
              </Button>
            )}
          </div>
        </div>
      </div>

      {!stripeCustomerId && (
        <div className="p-4 border border-amber-200 bg-amber-50 rounded-lg">
          <div className="space-y-2">
            <h4 className="font-medium text-amber-800">
              No Active Subscription
            </h4>
            <p className="text-sm text-amber-700">
              You don&apos;t have an active subscription yet.
            </p>
            <Button onClick={handleUpgrade} size="sm">
              <ExternalLink className="mr-2 h-4 w-4" />
              Subscribe Now
            </Button>
          </div>
        </div>
      )}

      <Separator />

      {/* Plan Features */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Plan Features</h3>
          <p className="text-sm text-muted-foreground">
            What&apos;s included in your current plan.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-sm">
              {userPlan === "STARTER"
                ? "1 active request"
                : "2 active requests"}{" "}
              at a time
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-sm">Unlimited requests in backlog</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-sm">2-3 day turnaround</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-sm">Pause or cancel anytime</span>
          </div>
          {userPlan === "PRO" && (
            <>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span className="text-sm">Priority support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span className="text-sm">Slack integration</span>
              </div>
            </>
          )}
        </div>
      </div>

      {recentPayments.length > 0 && (
        <>
          <Separator />

          {/* Recent Payments */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Recent Payments</h3>
              <p className="text-sm text-muted-foreground">
                Your recent billing history and invoices.
              </p>
            </div>

            <div className="space-y-3">
              {recentPayments.slice(0, 5).map((payment, index) => (
                <div
                  key={payment.id}
                  className={index > 0 ? "pt-3 border-t" : ""}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {formatCurrency(payment.amountCents, payment.currency)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(payment.paidAt)}
                        {payment.periodStart && payment.periodEnd && (
                          <span className="ml-2">
                            (Service: {formatDate(payment.periodStart)} -{" "}
                            {formatDate(payment.periodEnd)})
                          </span>
                        )}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
