import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mutatingToast } from "@/lib/quick-toast";
import { PitchUseMutation } from "@/server/actions/pitch-actions";
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
  const { mutateAsync, isLoading } =
    PitchUseMutation.removeSubPitch(subPitchId);
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
        <DropdownMenuItem
          disabled={isLoading}
          className="bg-red-500 text-white"
          onClick={async () => {
            mutatingToast();
            await mutateAsync();
            refetch();
          }}
        >
          Xóa sân này
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
