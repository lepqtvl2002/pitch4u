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

type DropdownMenuPitchProps = {
  pitchId: string | number;
  url: string;
  refetch?: any;
};
export default function DropdownMenuPitch({
  pitchId,
  url,
  refetch,
}: DropdownMenuPitchProps) {
  const { mutateAsync: suspendPitch, isLoading } =
    PitchUseMutation.suspendPitch();
  async function handelSuspendPitch() {
    mutatingToast();
    await suspendPitch(pitchId);
    if (refetch) refetch();
  }
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
          onClick={handelSuspendPitch}
          className="bg-red-500 text-white"
        >
          Khóa sân này
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
