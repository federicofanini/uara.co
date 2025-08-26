import RequestsClientPage from "./requests-client";

export default function RequestsPage() {
  return (
    <div className="w-full px-4 md:px-8 py-4">
      <RequestsClientPage />
    </div>
  );
}

export const metadata = {
  title: "Requests - Dashboard",
  description: "Manage your project requests and track progress.",
};
