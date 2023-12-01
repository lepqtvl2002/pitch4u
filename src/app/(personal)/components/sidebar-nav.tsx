"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { SidebarNavItem } from "@/types";
import { Icons } from "@/components/icons";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: SidebarNavItem[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "inline-flex overflow-x-auto max-w-full space-x-2 lg:flex lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => {
        const Icon = Icons[item?.icon || "arrowRight"];
        return (
          <Link
            key={item.href}
            href={item?.href as string}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === item.href
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline",
              "justify-start"
            )}
          >
            <Icon className="mr-2" />
            <span className="hidden md:inline-block">{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
