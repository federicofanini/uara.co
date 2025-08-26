"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { updateNotificationSettings } from "@/data/user-settings";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { useState } from "react";
import { Bell, MessageSquare, Mail } from "lucide-react";

interface NotificationSettingsProps {
  initialSettings: {
    notifyOnStatus: boolean;
    notifyOnComment: boolean;
    marketingEmails: boolean;
  };
}

export function NotificationSettings({
  initialSettings,
}: NotificationSettingsProps) {
  const [notifyOnStatus, setNotifyOnStatus] = useState(
    initialSettings.notifyOnStatus
  );
  const [notifyOnComment, setNotifyOnComment] = useState(
    initialSettings.notifyOnComment
  );
  const [marketingEmails, setMarketingEmails] = useState(
    initialSettings.marketingEmails
  );

  const { execute: updateSettings, isExecuting: isUpdating } = useAction(
    updateNotificationSettings,
    {
      onSuccess: () => {
        toast.success("Notification settings updated successfully");
      },
      onError: ({ error }) => {
        toast.error(error.serverError || "Failed to update settings");
      },
    }
  );

  const handleSave = () => {
    updateSettings({
      notifyOnStatus,
      notifyOnComment,
      marketingEmails,
    });
  };

  return (
    <div className="space-y-8">
      {/* Request Notifications */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Request Notifications</h3>
          <p className="text-sm text-muted-foreground">
            Get notified about updates to your requests and projects.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <div className="space-y-1">
                <Label htmlFor="status-notifications">Status Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when your request status changes (Active, Review,
                  Done)
                </p>
              </div>
            </div>
            <Switch
              id="status-notifications"
              checked={notifyOnStatus}
              onCheckedChange={setNotifyOnStatus}
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
              <div className="space-y-1">
                <Label htmlFor="comment-notifications">New Comments</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when someone comments on your requests
                </p>
              </div>
            </div>
            <Switch
              id="comment-notifications"
              checked={notifyOnComment}
              onCheckedChange={setNotifyOnComment}
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Marketing Communications */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Marketing Communications</h3>
          <p className="text-sm text-muted-foreground">
            Receive updates about new features, tips, and company news.
          </p>
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <div className="space-y-1">
              <Label htmlFor="marketing-emails">Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">
                Receive occasional updates about new features and company
                updates
              </p>
            </div>
          </div>
          <Switch
            id="marketing-emails"
            checked={marketingEmails}
            onCheckedChange={setMarketingEmails}
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <Button onClick={handleSave} disabled={isUpdating}>
          {isUpdating ? "Saving..." : "Save Changes"}
        </Button>

        <div className="text-sm text-muted-foreground">
          <p>
            💡 <strong>Tip:</strong> You can always unsubscribe from any email
            notifications using the link at the bottom of each email.
          </p>
        </div>
      </div>
    </div>
  );
}
