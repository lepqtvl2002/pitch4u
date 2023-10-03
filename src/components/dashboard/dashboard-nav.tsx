"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { type SidebarNavItem } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import {doesNotMatch} from "assert";

interface DashboardNavProps {
    items: SidebarNavItem[];
    isShrink?: boolean;
    setShrink?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DashboardNav({ items, isShrink }: DashboardNavProps) {
    const path = usePathname();

    if (!items?.length) {
        return null;
    }

    return (
        <nav className="grid w-full items-start gap-2">
            {items.map((item) => {
                const Icon = Icons[item.icon || "arrowRight"];
                return (
                    item.href && (
                        <Link key={item.href} href={item.disabled ? "/" : item.href}>
                            <motion.span
                                key={item.title + "container"}
                                layout={"size"}
                                className={cn(
                                    "group flex h-10 w-full items-center justify-start gap-2 rounded-md px-3 text-sm font-medium transition-all duration-200 ease-in-out",
                                    path.includes(item.href) && item.href !== '/dashboard' && item.href !== '/admin'
                                        ? "bg-primary/80 text-primary-foreground"
                                        : "transparent hover:bg-accent hover:text-accent-foreground",
                                    (item.href === '/dashboard' || item.href === '/admin') && path === item.href
                                        ? "bg-primary/80 text-primary-foreground"
                                        : "transparent hover:bg-accent hover:text-accent-foreground",
                                    item.disabled && "cursor-not-allowed opacity-80"
                                )}
                            >
                                <Icon className="aspect-square h-5 w-6" />
                                <AnimatePresence
                                    key={item.title}
                                    initial={false}
                                    mode="popLayout"
                                >
                                    {isShrink ? null : (
                                        <motion.span
                                            key={item.href}
                                            initial={{
                                                opacity: 0,
                                                x: -10,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                x: 0,
                                                transitionDelay: isShrink ? "0.2s" : "0s",
                                                animationDelay: isShrink ? "0.2s" : "0s",
                                            }}
                                            exit={{ opacity: 0, x: -10 }}
                                        >
                                            {item.title}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.span>
                        </Link>
                    )
                );
            })}
        </nav>
    );
}
