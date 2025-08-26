import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getRequest } from "@/data/requests";
import { RequestDetail } from "@/components/dashboard/requests/request-detail";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface RequestDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

function RequestDetailLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-32" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="border rounded-lg p-6">
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-8 w-80 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          <div className="border rounded-lg p-6">
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-4">
              <Skeleton className="h-5 w-24 mb-3" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

async function RequestDetailContent({ id }: { id: string }) {
  const result = await getRequest(id);

  if (!result.success) {
    if (result.error === "Resource not found") {
      notFound();
    }

    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Failed to load request</p>
        <p className="text-sm text-muted-foreground mt-2">{result.error}</p>
        <div className="mt-4">
          <Link href="/dashboard/requests">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Requests
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!result.data) {
    notFound();
  }

  return <RequestDetail request={result.data as any} />;
}

export default async function RequestDetailPage({
  params,
}: RequestDetailPageProps) {
  const { id } = await params;

  return (
    <div className="w-full px-4 md:px-8 py-4">
      <Suspense fallback={<RequestDetailLoading />}>
        <RequestDetailContent id={id} />
      </Suspense>
    </div>
  );
}

export async function generateMetadata({ params }: RequestDetailPageProps) {
  const { id } = await params;
  const result = await getRequest(id);

  if (!result.success || !result.data) {
    return {
      title: "Request Not Found - Dashboard",
      description: "The requested item could not be found.",
    };
  }

  const request = result.data as any; // Type assertion for metadata generation
  return {
    title: `${request.title} - Dashboard`,
    description: request.description.slice(0, 155) + "...",
  };
}
