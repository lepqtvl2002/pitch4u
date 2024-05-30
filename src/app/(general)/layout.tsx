import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";

export default function GeneralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-emerald-300 md:bg-gray-100">
      <Navbar />
      <div className="md:container flex min-h-screen flex-col items-center justify-between ">
        {children}
        <div className="px-2 w-full">
          <Footer />
        </div>
      </div>
    </main>
  );
}
