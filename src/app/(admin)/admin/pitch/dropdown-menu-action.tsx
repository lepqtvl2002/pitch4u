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
import { IPitch } from "@/types/pitch";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

type DropdownMenuPitchProps = {
  pitch: IPitch;
  refetch?: any;
};
export default function DropdownMenuPitch({
  pitch,
  refetch,
}: DropdownMenuPitchProps) {
  const { mutateAsync: suspendPitch, isLoading } =
    PitchUseMutation.suspendPitch();
  const { mutateAsync: unsuspendPitch, isLoading: isUnsuspecting } =
    PitchUseMutation.unsuspendPitch();
  async function handelSuspendPitch() {
    mutatingToast();
    await suspendPitch(pitch.pitch_id);
    if (refetch) refetch();
  }
  async function handelUnsuspendPitch() {
    mutatingToast();
    await unsuspendPitch(pitch.pitch_id);
    if (refetch) refetch();
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <Link href={`/admin/pitch/${pitch.pitch_id}`}>Xem chi tiết</Link>
        </DropdownMenuLabel>

        {pitch.suspended === true ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              disabled={isUnsuspecting}
              onClick={handelUnsuspendPitch}
              className="bg-emerald-500 text-white"
            >
              Mở khóa sân này
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              disabled={isLoading}
              onClick={handelSuspendPitch}
              className="bg-red-500 text-white"
            >
              Khóa sân này
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
