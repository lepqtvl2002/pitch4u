import type {Metadata} from 'next'
import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";

export const metadata: Metadata = {
    title: 'Pitch detail',
    description: 'Pitch detail information',
}

export default function DetailLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <main className="container flex min-h-screen flex-col items-center justify-between bg-blue-200">
            <Navbar/>
            {children}
            <Footer/>
        </main>
    )
}
