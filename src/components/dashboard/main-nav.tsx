"use client";
import Link from "next/link"

import {cn} from "@/lib/utils"
import {usePathname} from "next/navigation";


const items = [
    {
        title: "Overview",
        href: "/dashboard",
    },
    {
        title: "Customers",
        href: "/dashboard/customer"
    },
    {
        title: "Stadiums",
        href: "/dashboard/stadium"
    },
    {
        title: "Staffs",
        href: "/dashboard/staff"
    },
]

export function MainNav({
                            className,
                            ...props
                        }: React.HTMLAttributes<HTMLElement>) {
    const pathName = usePathname();

    return (
        <nav
            className={cn("flex items-center space-x-4 lg:space-x-6", className)}
            {...props}
        >
            {items.map(item => <Link
                className={cn("text-sm font-medium transition-colors hover:text-primary", item.href === pathName ? "" : "text-muted-foreground")}
                key={item.href} href={item.href}>{item.title}</Link>)}
        </nav>
    )
}