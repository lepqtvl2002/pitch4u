"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenuNav,
  DropdownMenuProfile,
} from "@/components/landing/dropdown-menu-custom";
import { cn } from "@/lib/utils";
import { publicNavbarConfig } from "@/config/site";
import { useSession } from "next-auth/react";
import { BellIcon, Loader2Icon, MessageCircleIcon } from "lucide-react";
import { NotificationBadge } from "../notification-badge";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import NotificationList from "../notification-list";
import { PopupChatList } from "../ui/message-components";

export default function Navbar({
  className,
  ...props
}: {
  className?: string;
}) {
  const { data: session, status } = useSession();

  return (
    <nav
      className={cn(
        "w-full sticky z-50 top-0 left-0 right-0 md:px-4 md:m-0 bg-gradient-to-b from-emerald-300 from-60%",
        className
      )}
      {...props}
    >
      <div className="md:container mx-auto flex justify-between items-center w-full h-fit md:justify-between">
        <div className="flex">
          <a
            href="/"
            className="text-xl md:text-2xl font-semibold flex items-center p-2 md:p-4"
          >
            <Image
              src="/pitch4u-logo.svg"
              alt="App Logo"
              width={50}
              height={50}
              className="dark:invert md:w-20 md:h-20"
              priority
            />
            <h1>PITCH4U</h1>
          </a>
          <ul className="md:flex items-center w-auto hidden text-center">
            {publicNavbarConfig.mainNav.map((item) => (
              <li key={item.title} className="h-full px-3">
                <Link
                  href={item.href}
                  className="flex text-center items-center h-full"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex">
          {status === "loading" ? (
            <span className="flex">
              <Loader2Icon className="animate-spin mr-2" />{" "}
              <span className="hidden md:inline-block">Loading...</span>
            </span>
          ) : status === "authenticated" ? (
            <div className="flex gap-3">
              <Popover>
                <PopoverTrigger>
                  <Button
                    variant="ghost"
                    className={"relative hover:bg-gray-200 rounded-full p-2"}
                  >
                    <NotificationBadge number={1} />
                    <MessageCircleIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[360px]">
                  <PopupChatList />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger>
                  <Button
                    variant="ghost"
                    className={"relative hover:bg-gray-200 rounded-full p-2"}
                  >
                    {true ? <NotificationBadge number={1} /> : null}
                    <BellIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[360px]">
                  <NotificationList />
                </PopoverContent>
              </Popover>
              <DropdownMenuProfile
                user={session?.user}
                className={"hidden md:flex"}
              />
            </div>
          ) : (
            <div className="hidden md:flex gap-2 w-fit">
              <Button>
                <Link className="w-max" href={"/login"}>
                  Đăng nhập
                </Link>
              </Button>
              <Button variant="outline">
                <Link className="w-max" href={"/register"}>
                  Đăng ký
                </Link>
              </Button>
            </div>
          )}
          {status !== "loading" && (
            <DropdownMenuNav user={session?.user} className="md:hidden" />
          )}
        </div>
      </div>
    </nav>
  );
}
