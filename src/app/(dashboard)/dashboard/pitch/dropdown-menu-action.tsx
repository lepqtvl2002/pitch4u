import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mutatingToast } from "@/lib/quick-toast";
import { cn } from "@/lib/utils";
import { PitchUseMutation } from "@/server/actions/pitch-actions";
import { IPitch } from "@/types/pitch";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

type DropdownMenuPitchProps = {
  pitch: IPitch;
  url: string;
  refetch?: any;
};
export default function DropdownMenuPitch({
  pitch,
  url,
  refetch,
}: DropdownMenuPitchProps) {
  const { mutateAsync: suspendPitch, isLoading } =
    PitchUseMutation.suspendPitch();
  const { mutateAsync: activePitch, isLoading: isActiveMutating } =
    PitchUseMutation.activePitch(pitch.pitch_id);
  async function handelSuspendPitch() {
    mutatingToast();
    await suspendPitch(pitch.pitch_id);
    refetch();
  }
  async function handleActivePitch(value: boolean) {
    mutatingToast();
    await activePitch(value);
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
          <Link href={`/dashboard/pitch/${pitch.pitch_id}/edit`}>
            Cài đặt sân
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={isActiveMutating}
          onClick={() => handleActivePitch(!pitch.active)}
          className={cn(
            "text-white",
            pitch.active ? "bg-red-500" : "bg-green-500"
          )}
        >
          {pitch.active ? "Khóa sân" : "Mở khóa"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
