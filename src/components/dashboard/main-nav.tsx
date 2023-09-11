"use client";
import Link from "next/link"

import {cn} from "@/lib/utils"
import {usePathname} from "next/navigation";
import {Search} from "@/components/dashboard/search";
import {UserNav} from "@/components/dashboard/user-nav";
import {ModeToggle} from "@/components/theme-button";


const items = [
    {
        title: "Tổng quan",
        href: "/dashboard",
    },
    {
        title: "Quản lý sân",
        href: "/dashboard/stadium"
    },
    {
        title: "Nhân viên",
        href: "/dashboard/staff"
    },
    {
        title: "Phiếu giảm giá",
        href: "/dashboard/voucher"
    },
    {
        title: "Doanh thu",
        href: "/dashboard/revenue"
    },
]

export function MainNav({
                            className,
                            ...props
                        }: React.HTMLAttributes<HTMLElement>) {
    const pathName = usePathname();

    return (
        <nav
            className={cn("w-full flex items-center justify-between space-x-4 lg:space-x-6", className)}
            {...props}
        >
            <Search/>
            <div className="ml-auto flex items-center space-x-4">
                <UserNav/>
                <ModeToggle/>
            </div>
        </nav>
    )
}