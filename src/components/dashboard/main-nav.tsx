"use client";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Search } from "@/components/dashboard/search";
import { UserNav } from "@/components/dashboard/user-nav";
import { ModeToggle } from "@/components/theme-button";
import { Bell, MessageCircle } from "lucide-react";
import { NotificationBadge } from "@/components/notification-badge";
import { NotificationUseQuery } from "@/server/queries/notification-queries";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import NotificationList from "./notification-list";

export function MainNav({
  className,
  area = "dashboard",
  ...props
}: React.HTMLAttributes<HTMLElement> & { area?: "admin" | "dashboard" }) {
  const { data } = NotificationUseQuery.getNumberOfUnread();

  return (
    <nav
      className={cn(
        "w-full flex items-center justify-between space-x-4 lg:space-x-6",
        className
      )}
      {...props}
    >
      <Search />
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
            <button className={"relative hover:bg-gray-200 rounded-full p-2"}>
              {data?.result ? <NotificationBadge number={data?.result} /> : null}
              <Bell />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[360px]">
            <NotificationList/>
          </PopoverContent>
        </Popover>

        <UserNav />
        <ModeToggle />
      </div>
    </nav>
  );
}
