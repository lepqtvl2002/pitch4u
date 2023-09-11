"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronsLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { dashboardConfigOperator, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { type IUser } from "@/types/user";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {UserNav} from "@/components/dashboard/user-nav";

type Props = {
    user: {
        id: string,
        name: string,
    };
};

function DashboardSidebar({ user }: Props) {
    const [isShrink, setShrink] = useState(false);

    return (
        <motion.aside
            className={cn(
                "sticky top-0 z-10 hidden h-screen flex-col transition-all duration-500 ease-in-out md:flex"
            )}
            layout
            animate={{
                width: isShrink ? "80px" : "250px",
                // animationDelay: "0.2s",
                transitionDelay: isShrink ? "0.2s" : "0s",
            }}
        >
            <div className="absolute -right-2 left-auto top-0 z-10 my-5">
                <Button
                    variant={"default"}
                    size={"sm"}
                    onClick={() => {
                        setShrink(!isShrink);
                    }}
                    className={cn(
                        "mx-auto mb-4 aspect-square h-fit w-fit rounded-full bg-foreground p-0.5 opacity-80 transition-transform duration-500 ease-in-out",
                        isShrink ? "rotate-180" : ""
                    )}
                >
                    <ChevronsLeft className="h-4 w-4" />
                </Button>
            </div>
            <div
                className={cn(
                    "w-full flex-1 px-4 py-6",
                    isShrink ? "flex flex-col items-center" : "flex flex-col items-start"
                )}
            >
                <Link
                    href="/"
                    className="mx-auto mb-4 hidden items-center space-x-2 md:flex"
                >
                    <Icons.logo />
                    <AnimatePresence key={"title"} initial={false}>
                        {isShrink || (
                            <motion.span
                                key={"title"}
                                className="hidden font-bold text-xl sm:text-2xl md:text-3xl sm:inline-block"
                                initial={{
                                    opacity: 0,
                                    x: -20,
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                    transition: { delay: isShrink ? 0 : 0.2 },
                                }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                {siteConfig.name}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </Link>
                <DashboardNav
                    isShrink={isShrink}
                    setShrink={setShrink}
                    items={dashboardConfigOperator.sidebarNav}
                />
            </div>
            <AnimatePresence key={"user-nav"}>
                {isShrink || (
                    <motion.div
                        key={"user-nav"}
                        initial={{
                            opacity: 0,
                            y: -20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            transition: { delay: 0.3 },
                        }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <div className={"flex w-full bg-blue-200 justify-between py-2 px-4"}>
                            <UserNav/>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.aside>
    );
}

export default DashboardSidebar;
