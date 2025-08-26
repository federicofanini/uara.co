import { NewRequestForm } from "@/components/dashboard/requests/new-request-form";

export default function NewRequestPage() {
  return (
    <div className="w-full px-4 md:px-8 py-4">
      <NewRequestForm />
    </div>
  );
}

export const metadata = {
  title: "New Request - Dashboard",
  description: "Create a new project request.",
};
