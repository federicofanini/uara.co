import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-2 md:p-6">
      <Header />

      <main className="container mx-auto">{children}</main>
      <Footer />
    </div>
  );
}
