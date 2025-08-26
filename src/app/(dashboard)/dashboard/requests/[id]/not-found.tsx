import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function RequestNotFound() {
  return (
    <div className="w-full px-4 md:px-8 py-4">
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
              <h2 className="mt-4 text-lg font-semibold">Request Not Found</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                The request you&apos;re looking for doesn&apos;t exist or you
                don&apos;t have permission to view it.
              </p>
              <div className="mt-6">
                <Link href="/dashboard/requests">
                  <Button>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Requests
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
