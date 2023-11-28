import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

type DropdownMenuSubPitchProps = {
  subPitchId: string | number;
  url: string;
  refetch ?: any;
};
export default function DropdownMenuSubPitch({
  subPitchId,
  url,
  refetch
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
