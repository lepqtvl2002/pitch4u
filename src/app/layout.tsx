import './globals.css'
import {Inter} from 'next/font/google'
import AuthProvider from "@/providers/auth-provider";
import {Toaster} from "@/components/ui/toaster";
import ClientProvider from "@/providers/client-provider";
import {siteConfig} from "@/config/site";
import {cn} from "@/lib/utils";
import AuthProviderHelper from "@/providers/auth-provider-helper";
import PapeProgress from "@/components/progress-bar";

const inter = Inter({subsets: ['latin']})

export const metadata = {
    metadataBase: {},
    authors: siteConfig.authors,
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: ["pitch4u", "pitch", "football", "soccer", "booking"],
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
    // manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (<html lang="en" className={cn("scroll-smooth mdl-js")}>
        <body className={cn(inter.className)}>
        <ClientProvider>
            <AuthProvider>
                <AuthProviderHelper>
                    {children}
                    <PapeProgress />
                    <Toaster/>
                </AuthProviderHelper>
            </AuthProvider>
        </ClientProvider>
        </body>
        </html>
    )
}
