import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";

export default function GeneralLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="bg-main">
            <div className="md:container flex min-h-screen flex-col items-center justify-between ">
                <Navbar />
                {children}
                <Footer />
            </div>
        </main>
    )
}
