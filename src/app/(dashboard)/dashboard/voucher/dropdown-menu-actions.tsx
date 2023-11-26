import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VoucherUseMutation } from "@/server/actions/voucher-actions";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

type DropdownMenuPitchProps = {
  id: string | number;
  link: string;
  refetchTable: any;
};
export default function DropdownMenuActions({
  id,
  link,
  refetchTable,
}: DropdownMenuPitchProps) {
  const { mutateAsync } = VoucherUseMutation.delete(id);

  async function handleDeleteVoucher() {
    await mutateAsync();
    refetchTable();
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
          onClick={handleDeleteVoucher}
          className="bg-red-500 text-white"
        >
          Xóa Voucher
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
