"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteUserAccount } from "@/data/user-settings";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

interface GeneralSettingsProps {
  // No settings currently managed in general tab
  placeholder?: never;
}

export function GeneralSettings({}: GeneralSettingsProps) {
  const { execute: deleteAccount, isExecuting: isDeleting } = useAction(
    deleteUserAccount,
    {
      onSuccess: () => {
        toast.success("Account deleted successfully");
        // Redirect to login or home page
        window.location.href = "/api/auth/logout";
      },
      onError: ({ error }) => {
        toast.error(error.serverError || "Failed to delete account");
      },
    }
  );

  const handleDeleteAccount = () => {
    deleteAccount({});
  };

  return (
    <div className="space-y-8">
      {/* Account Information */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Account</h3>
          <p className="text-sm text-muted-foreground">
            General account settings and information.
          </p>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>
            Your account settings are managed automatically. Notification
            preferences can be found in the Notifications tab, and billing
            settings in the Billing tab.
          </p>
        </div>
      </div>

      <Separator />

      {/* Danger Zone */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-destructive">Danger Zone</h3>
          <p className="text-sm text-muted-foreground">
            Irreversible and destructive actions.
          </p>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove all of your data from our servers, including:
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>All your requests and project history</li>
                  <li>Your subscription and billing information</li>
                  <li>All comments and attachments</li>
                  <li>Your account settings and preferences</li>
                </ul>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isDeleting ? "Deleting..." : "Yes, delete my account"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
