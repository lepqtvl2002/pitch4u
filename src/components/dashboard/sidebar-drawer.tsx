import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { DashboardNav } from "./dashboard-nav";
import { SidebarNavItem } from "@/types";

type Props = {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    userRole: {
      name: string;
    };
  };
  items: SidebarNavItem[];
};

export function SidebarDrawer({ user, items }: Props) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            {user?.userRole.name === "admin" && (
              <Link className="w-full mb-4" href="/dashboard/pitch/register">
                <Button
                  variant="outline"
                  size={"lg"}
                  className="shadow-lg w-full"
                >
                  Đăng ký thêm sân +
                </Button>
              </Link>
            )}
          </DrawerHeader>
          <div
            className={cn("w-full flex-1 px-4 py-6 flex flex-col items-start")}
          >
            <DashboardNav isShrink={false} setShrink={() => {}} items={items} />
          </div>

          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
