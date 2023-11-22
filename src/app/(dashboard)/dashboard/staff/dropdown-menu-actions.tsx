import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserUseMutation } from "@/server/actions/user-actions";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

type DropdownMenuPitchProps = {
  id: string | number;
  link: string;
};
export default function DropdownMenuActions({
  id,
  link,
}: DropdownMenuPitchProps) {
  const { mutateAsync } = UserUseMutation.deleteStaff();

  async function handleDeleteStaff() {
    await mutateAsync(id);
    window.location.reload();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={link}>Xem & chỉnh sửa</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleDeleteStaff}
          className="bg-red-500 text-white"
        >
          Xóa Nhân Viên
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
