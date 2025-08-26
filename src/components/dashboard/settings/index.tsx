"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQueryState } from "nuqs";
import { GeneralSettings } from "./general";
import { NotificationSettings } from "./notifications";
import { BillingSettings } from "./billing";
import { useEffect, useState } from "react";
import { getUserSettings } from "@/data/user-settings";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface UserSettings {
  notifyOnStatus: boolean;
  notifyOnComment: boolean;
  marketingEmails: boolean;
}

interface UserData {
  plan: string;
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

interface SettingsPageProps {
  userData?: UserData;
}

export function SettingsPage({ userData }: SettingsPageProps) {
  const [tab, setTab] = useQueryState("tab", {
    defaultValue: "general",
  });

  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const result = await getUserSettings();
        if (result.success && result.data) {
          setSettings(result.data as UserSettings);
        } else {
          toast.error("Failed to load settings");
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
        toast.error("Failed to load settings");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const tabs = [
    {
      id: "general",
      title: "General",
    },
    {
      id: "notifications",
      title: "Notifications",
    },
    {
      id: "billing",
      title: "Billing",
    },
  ];

  if (isLoading) {
    return (
      <div className="w-full px-4 md:px-8 py-4">
        <div className="space-y-6">
          <div className="flex space-x-4">
            {tabs.map((tab) => (
              <Skeleton key={tab.id} className="h-10 w-24" />
            ))}
          </div>
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="w-full px-4 md:px-8 py-4">
        <p className="text-center text-muted-foreground">
          Failed to load settings
        </p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 md:px-8 py-4">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>

        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="justify-start rounded-none h-auto p-0 bg-transparent space-x-4 md:space-x-6 overflow-x-auto">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="rounded-none border-b-2 border-transparent text-primary data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-2 text-sm md:text-base whitespace-nowrap"
              >
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mt-6">
            <TabsContent value="general" className="mt-0">
              <GeneralSettings />
            </TabsContent>

            <TabsContent value="notifications" className="mt-0">
              <NotificationSettings
                initialSettings={{
                  notifyOnStatus: settings.notifyOnStatus,
                  notifyOnComment: settings.notifyOnComment,
                  marketingEmails: settings.marketingEmails,
                }}
              />
            </TabsContent>

            <TabsContent value="billing" className="mt-0">
              <BillingSettings
                userPlan={userData?.plan || "STARTER"}
                stripeCustomerId={userData?.stripeCustomerId}
                subscription={userData?.subscription}
                recentPayments={userData?.recentPayments}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
