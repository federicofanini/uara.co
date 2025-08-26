import { getRequest } from "@/data/requests";
import RequestDetailClientPage from "./request-detail-client";

interface RequestDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RequestDetailPage({
  params,
}: RequestDetailPageProps) {
  const { id } = await params;

  return (
    <div className="w-full px-4 md:px-8 py-4">
      <RequestDetailClientPage id={id} />
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
