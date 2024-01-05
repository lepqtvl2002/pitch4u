import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
    refetch();
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={url}>Xem chi tiết</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/dashboard/pitch/${pitchId}/edit`}>Cài đặt sân</Link>
        </DropdownMenuItem>
        {/* <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={isLoading}
          onClick={handelSuspendPitch}
          className="bg-red-500 text-white"
        >
          Tạm dừng hoạt động
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
