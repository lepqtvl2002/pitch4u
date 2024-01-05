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
  isSuspended?: boolean | null;
};
export default function DropdownMenuPitch({
  pitchId,
  url,
  refetch,
  isSuspended,
}: DropdownMenuPitchProps) {
  const { mutateAsync: suspendPitch, isLoading } =
    PitchUseMutation.suspendPitch();
  const { mutateAsync: unsuspendPitch, isLoading: isUnsuspecting } =
    PitchUseMutation.unsuspendPitch();
  async function handelSuspendPitch() {
    mutatingToast();
    await suspendPitch(pitchId);
    if (refetch) refetch();
  }
  async function handelUnsuspendPitch() {
    mutatingToast();
    await unsuspendPitch(pitchId);
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

        {isSuspended ? (
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
