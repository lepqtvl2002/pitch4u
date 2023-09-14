"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/user-avatar";
import { type IUser } from "@/types/user";
import { useMemo } from "react";
import { beautifyUsername, cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";

type UserAccountNavProps = React.HTMLAttributes<HTMLDivElement>;

export function UserAccountNav({ className, ...props }: UserAccountNavProps) {
    const { data, status } = useSession();
    // @ts-ignore
    const user = useMemo(() => data?.user as IUser, [data]);
    if (status === "loading")
        return <Skeleton className="h-8 w-8 rounded-full" />;
    return (
        <div
            className={cn(
                className,
                "flex items-center justify-between gap-2 border-t border-card px-2 py-1.5 text-card-foreground"
            )}
            {...props}
        >
            <div>
                <UserAvatar user={user} className="h-10 w-10" />
            </div>
            <div className="w-full">
                <p className="font-medium">{beautifyUsername(user)}</p>
                <Link
                    href={`/account`}
                    className={"text-background-foreground text-sm hover:underline"}
                >
                    Xem tài khoản
                </Link>
            </div>
        </div>
    );
}

function DropDownUser({
                          user,
                          ...props
                      }: UserAccountNavProps & { user: IUser }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar user={user} className="h-8 w-8" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" {...props}>
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        {user.email && (
                            <div className="flex items-center space-x-1">
                                <p className="font-medium">
                                    {`👋 Chào ${beautifyUsername(user)}`}
                                </p>
                            </div>
                        )}
                        {user.email && (
                            <p className="w-[200px] truncate text-sm text-muted-foreground">
                                {user.email}
                            </p>
                        )}
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/dashboard">Điều khiển</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/account">Cài đặt tài khoản</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="cursor-pointer font-medium text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    onSelect={async (event) => {
                        event.preventDefault();
                        toast({
                            title: "Đăng xuất",
                            description: "Đang đăng xuất khỏi hệ thống...",
                            variant: "destructive",
                        });
                        await signOut({
                            callbackUrl: `${window.location.origin}/login`,
                        });
                    }}
                >
                    <Icons.logOut className="mr-1.5 h-3 w-3" />
                    Đăng xuất
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
