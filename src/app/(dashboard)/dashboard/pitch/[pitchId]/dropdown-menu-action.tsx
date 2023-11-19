import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

type DropdownMenuSubPitchProps = {
  subPitchId: string | number;
  url: string;
};
export default function DropdownMenuSubPitch({
  subPitchId,
  url,
}: DropdownMenuSubPitchProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <Link href={url}>Xem chi tiết</Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="bg-red-500 text-white">
          Xóa sân này
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
