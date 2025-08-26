import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  return (
    <div className="relative">
      <Sidebar />

      <div className="md:ml-[70px] pb-8">
        <Header />
        <div className="p-4 md:p-8">
          <NuqsAdapter>{children}</NuqsAdapter>
        </div>
      </div>
    </div>
  );
}
