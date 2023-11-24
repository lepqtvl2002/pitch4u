import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserUseMutation } from "@/server/actions/user-actions";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";

export default function ActionsDropdownMenuActions({
  link,
  id,
}: {
  id: string | number;
  link: string;
}) {
  const { mutateAsync: suspendUser, isLoading: isSuspending } =
    UserUseMutation.suspendUser();
  const { mutateAsync: unsuspendUser, isLoading: isUnSuspending } =
    UserUseMutation.unsuspendUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={link}>Xem chi tiết</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={isSuspending}
          onClick={() => suspendUser(id)}
          className="bg-red-500 text-white"
        >
          Chặn người dùng
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={isUnSuspending}
          onClick={() => unsuspendUser(id)}
          className="bg-emerald-500 text-white"
        >
          Bỏ chặn người dùng
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
