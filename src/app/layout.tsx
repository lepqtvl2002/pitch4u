import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import AuthProvider from "@/providers/auth-provider";
import {Toaster} from "@/components/ui/toaster";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Pitch4u',
    description: 'Pitch for you',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <AuthProvider>
            {children}
            <Toaster/>
        </AuthProvider>
        </body>
        </html>
    )
}
