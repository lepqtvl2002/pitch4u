import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "@/components/auth/user-auth-form"

export const metadata: Metadata = {
    title: "Đăng nhập",
    description: "Authentication forms built using the components.",
}

export default function LoginPage() {
    return (
        <>
            <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <Link
                    href="/"
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute right-4 top-4 md:right-8 md:top-8"
                    )}
                >
                    Back
                </Link>
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <div className="absolute inset-0 bg-main" />
                    <Link href="/" className="relative z-20 flex items-center text-lg font-medium">
                        <Image src={"/pitch4u-logo.png"} alt={'Logo'} width={30} height={30} />
                        PITCH4U
                    </Link>
                    <div className={"flex justify-center items-center z-10"}>
                        <Image src={"/pitch4u-photo01.webp"} alt={"Photo1"} width={400} height={400}/>
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                &ldquo;This library has saved me countless hours of work and
                                helped me deliver stunning designs to my clients faster than
                                ever before.&rdquo;
                            </p>
                            <footer className="text-sm">Sofia Davis</footer>
                        </blockquote>
                    </div>
                </div>
                <div className="pt-8 lg:p-8">
                    <UserAuthForm type={"login"} />
                </div>
            </div>
        </>
    )
}