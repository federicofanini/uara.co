"use client";

import { useRequests } from "@/hooks/use-requests";
import { RequestList } from "@/components/dashboard/requests/request-list";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, RefreshCw } from "lucide-react";
import Link from "next/link";

function RequestsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-64 mt-2" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="border rounded-lg p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-80" />
                </div>
                <Skeleton className="h-8 w-8" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RequestsClientPage() {
  const {
    data: result,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useRequests();

  if (isLoading) {
    return <RequestsLoading />;
  }

  if (error || !result?.success) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Failed to load requests</p>
        <p className="text-sm text-muted-foreground mt-2">
          {result?.error || "Something went wrong"}
        </p>
        <Button
          onClick={() => refetch()}
          variant="outline"
          className="mt-4"
          disabled={isRefetching}
        >
          <RefreshCw
            className={`mr-2 h-4 w-4 ${isRefetching ? "animate-spin" : ""}`}
          />
          {isRefetching ? "Retrying..." : "Retry"}
        </Button>
      </div>
    );
  }

  const requests = Array.isArray(result.data) ? result.data : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">
            requests<span className="text-teal-300">.</span>
          </h1>
          <p className="text-muted-foreground">
            Manage your project requests and track progress.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => refetch()}
            variant="outline"
            size="sm"
            disabled={isRefetching}
          >
            <RefreshCw
              className={`h-4 w-4 ${isRefetching ? "animate-spin" : ""}`}
            />
          </Button>
          <Link href="/dashboard/requests/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Request
            </Button>
          </Link>
        </div>
      </div>

      <RequestList requests={requests} />
    </div>
  );
}
