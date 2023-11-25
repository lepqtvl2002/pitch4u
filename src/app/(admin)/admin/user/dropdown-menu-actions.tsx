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
  isSuspended,
  refetchTable,
}: {
  id: string | number;
  link: string;
  isSuspended: boolean;
  refetchTable?: any;
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
        {isSuspended ? (
          <DropdownMenuItem
            disabled={isUnSuspending}
            onClick={() => {
              unsuspendUser(id);
              refetchTable();
            }}
            className="bg-emerald-500 text-white"
          >
            Bỏ chặn người dùng
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            disabled={isSuspending}
            onClick={() => {
              suspendUser(id);
              refetchTable();
            }}
            className="bg-red-500 text-white"
          >
            Chặn người dùng
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
