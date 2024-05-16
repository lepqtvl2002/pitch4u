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
import { Loader2Icon } from "lucide-react";

export default function Navbar({
  className,
  ...props
}: {
  className?: string;
}) {
  const { data: session, status } = useSession();

  return (
    <nav className={cn("w-full md:px-4 md:m-0", className)} {...props}>
      <div className="mx-auto flex justify-between items-center w-full h-fit md:justify-between">
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
        {status === "loading" ? (
          <Button>
            <Loader2Icon className="animate-spin mr-2" /> Loading...
          </Button>
        ) : status === "authenticated" ? (
          <DropdownMenuProfile
            user={session?.user}
            className={"hidden md:flex"}
          />
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
    </nav>
  );
}
