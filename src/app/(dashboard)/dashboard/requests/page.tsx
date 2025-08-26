import { Suspense } from "react";
import { getUserRequests } from "@/data/requests";
import { RequestList } from "@/components/dashboard/requests/request-list";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";
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

async function RequestsContent() {
  const result = await getUserRequests();

  if (!result.success) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Failed to load requests</p>
        <p className="text-sm text-muted-foreground mt-2">{result.error}</p>
      </div>
    );
  }

  const requests = Array.isArray(result.data) ? result.data : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Requests</h1>
          <p className="text-muted-foreground">
            Manage your project requests and track progress.
          </p>
        </div>
        <Link href="/dashboard/requests/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Button>
        </Link>
      </div>

      <RequestList requests={requests} />
    </div>
  );
}

export default function RequestsPage() {
  return (
    <div className="w-full px-4 md:px-8 py-4">
      <Suspense fallback={<RequestsLoading />}>
        <RequestsContent />
      </Suspense>
    </div>
  );
}

export const metadata = {
  title: "Requests - Dashboard",
  description: "Manage your project requests and track progress.",
};
