import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { type AvatarProps } from "@radix-ui/react-avatar";
import { useMemo } from "react";
import { beautifyUsername } from "@/lib/utils";
import {IUser} from "@/types/user";

interface UserAvatarProps extends AvatarProps {
    user: Pick<IUser, "avatar" | "fullname" >;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
    const avatar = useMemo<string | null | undefined>(() => {
        if (user?.avatar) {
            return user.avatar;
        }
        return null;
    }, [user.avatar]);
    return (
        <Avatar {...props}>
            {avatar ? (
                <AvatarImage alt="Picture" src={avatar} />
            ) : (
                <AvatarFallback>
                    <span className="sr-only">{beautifyUsername(user)}</span>
                    <Icons.user className="h-4 w-4" />
                </AvatarFallback>
            )}
        </Avatar>
    );
}
