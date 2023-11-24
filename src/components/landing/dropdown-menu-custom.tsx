"use client";
import { ChevronDown, LogOut, Menu, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { personalNavConfig, publicNavbarConfig } from "@/config/site";
import Link from "next/link";
import { Icons } from "../icons";

export function DropdownMenuProfile({
  user,
  className,
  ...props
}: {
  user: {
    name: string;
    email: string;
  };
  className?: string;
}) {
  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger className={className}>
        Hi, {user.name || user.email} <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {personalNavConfig.mainNav.map((item) => {
            const Icon = Icons[item?.icon || "arrowRight"];
            return (
              <DropdownMenuItem key={item.href}>
                <Icon className="mr-2 h-4 w-4" />
                <Link href={item.href}>{item.title}</Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Đăng xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DropdownMenuNav({
  user,
  className,
  ...props
}: {
  user: any;
  className?: string;
}) {
  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger className={className}>
        <Menu />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {publicNavbarConfig.sidebarNav.map((item) => (
          <DropdownMenuItem key={item.title} className="flex-1">
            <Link href={item.href || "/#"}>{item.title}</Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        {user ? (
          <DropdownMenuProfile user={user} className={"flex px-2 w-full"} />
        ) : (
          <>
            <Link href={"/login"} className="mb-2">
              <Button className={"flex px-2 w-full"}>Đăng nhập</Button>
            </Link>
            <Link href={"/register"}>
              <Button variant="outline" className={"flex px-2 w-full"}>
                Đăng ký
              </Button>
            </Link>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
