import './globals.css'
import {Inter} from 'next/font/google'
import AuthProvider from "@/providers/auth-provider";
import {Toaster} from "@/components/ui/toaster";
import ClientProvider from "@/providers/client-provider";
import {siteConfig} from "@/config/site";
import {cn} from "@/lib/utils";

const inter = Inter({subsets: ['latin']})

export const metadata = {
    authors: siteConfig.authors,
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: ["picth4u", "pitch", "football", "soccer", "booking"],
    creator: "? Team",
    openGraph: {
        type: "website",
        locale: "vi_VN",
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
    },
    manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (<html lang="en">
        <body className={cn(inter.className, "scroll-smooth")}>
        <ClientProvider>
            <AuthProvider>
                {children}
                <Toaster/>
            </AuthProvider>
        </ClientProvider>
        </body>
        </html>
    )
}
