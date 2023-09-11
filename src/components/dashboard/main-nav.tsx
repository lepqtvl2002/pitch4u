"use client";
import Link from "next/link"

import {cn} from "@/lib/utils"
import {usePathname} from "next/navigation";
import {Search} from "@/components/dashboard/search";
import {UserNav} from "@/components/dashboard/user-nav";
import {ModeToggle} from "@/components/theme-button";
import {Bell, MessageCircle} from "lucide-react";
import {Badge} from "@/components/ui/badge";

export function MainNav({
                            className,
                            ...props
                        }: React.HTMLAttributes<HTMLElement>) {

    return (
        <nav
            className={cn("w-full flex items-center justify-between space-x-4 lg:space-x-6", className)}
            {...props}
        >
            <Search/>
            <div className="ml-auto flex items-center space-x-4">
                <Link href={"/dashboard/message"} className={"relative hover:bg-gray-200 p-2 rounded-full"}>
                    <Badge className={"absolute top-0 right-0 px-1.5 rounded-full border-none"} variant={"destructive"}>1</Badge>
                    <MessageCircle/>
                </Link>
                <button className={"relative hover:bg-gray-200 rounded-full p-2"} >
                    <Badge className={"absolute top-0 right-0 px-1.5 rounded-full border-none"} variant={"destructive"}>1</Badge>
                    <Bell/>
                </button>
                <UserNav/>
                <ModeToggle/>
            </div>
        </nav>
    )
}