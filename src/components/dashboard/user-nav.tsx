"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { LogOutIcon } from "lucide-react";
import UserRoles from "@/enums/roles";

export function UserNav() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  if (status === "unauthenticated") {
    toast({
      title: "Phiên đăng nhập hết hạn",
      description: "Vui lòng đăng nhập lại",
      variant: "destructive",
      action: (
        <ToastAction
          onClick={() => {
            signOut()
              .then(() => {
                router.push("/login");
              })
              .catch(console.error);
          }}
          altText={"relogin"}
        >
          Đăng nhập
        </ToastAction>
      ),
    });
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full"
          disabled={status === "loading"}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={session?.user?.image as string}
              alt="user avatar"
            />
            <AvatarFallback>
              {session?.user.email.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session?.user?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              className="w-full"
              href={
                session?.user?.userRole === UserRoles.Admin
                  ? "/admin/profile"
                  : "/dashboard/profile"
              }
            >
              Tài khoản của bạn
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex justify-between"
          onClick={() => signOut()}
        >
          Đăng xuất <LogOutIcon />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
