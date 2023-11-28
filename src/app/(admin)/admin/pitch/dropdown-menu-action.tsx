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

type DropdownMenuPitchProps = {
  pitchId: string | number;
  url: string;
};
export default function DropdownMenuPitch({
  pitchId,
  url,
}: DropdownMenuPitchProps) {
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
          Khóa sân này
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
