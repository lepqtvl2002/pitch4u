"use client";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { UserNav } from "@/components/dashboard/user-nav";
import { ModeToggle } from "@/components/theme-button";
import { Bell, MessageCircle, PanelLeftOpenIcon } from "lucide-react";
import { NotificationBadge } from "@/components/notification-badge";
import { NotificationUseQuery } from "@/server/queries/notification-queries";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import NotificationList from "../notification-list";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DashboardNav } from "./dashboard-nav";
import { SidebarNavItem } from "@/types";
import { Button } from "../ui/button";
import { BreadcrumbDashboard } from "../breadcrumb";

export function MainNav({
  className,
  area = "dashboard",
  navItems,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  area?: "admin" | "dashboard";
  navItems?: SidebarNavItem[];
}) {
  const { data } = NotificationUseQuery.getNumberOfUnread();

  return (
    <nav
      className={cn(
        "w-full flex items-center justify-between space-x-4 lg:space-x-6",
        className
      )}
      {...props}
    >
      <Sheet>
        <SheetTrigger className="md:hidden">
          <PanelLeftOpenIcon />
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle>
              <Link href={"/"}>PITCH4U</Link>
            </SheetTitle>
            <SheetDescription>Menu</SheetDescription>
          </SheetHeader>
          <DashboardNav
            isShrink={false}
            setShrink={() => {}}
            items={navItems ?? []}
          />
        </SheetContent>
      </Sheet>

      <BreadcrumbDashboard />

      {/* <Search /> */}
      <div className="ml-auto flex items-center space-x-4">
        <Link
          href={`/${area}/message`}
          className={"relative hover:bg-gray-200 p-2 rounded-full"}
        >
          <NotificationBadge number={1} />
          <MessageCircle />
        </Link>
        <Popover>
          <PopoverTrigger>
            <Button
              variant="ghost"
              className={"relative hover:bg-gray-200 rounded-full p-2"}
            >
              {data?.result ? (
                <NotificationBadge number={data?.result} />
              ) : null}
              <Bell />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[360px]">
            <NotificationList />
          </PopoverContent>
        </Popover>

        <UserNav />
        <ModeToggle />
      </div>
    </nav>
  );
}
