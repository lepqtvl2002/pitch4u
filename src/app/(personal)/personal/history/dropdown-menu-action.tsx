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

type DropdownMenuProps = {
  id: string | number;
  url: string;
  refetch?: any;
  isCancelable?: boolean;
};
export default function DropdownMenuActions({
  id,
  url,
  refetch,
  isCancelable,
}: DropdownMenuProps) {
  const { mutateAsync: cancelBookingMutate, isLoading: isCanceling } =
    PitchUseMutation.cancelBookingPitch();

  async function cancelBooking() {
    mutatingToast();
    await cancelBookingMutate({ booking_id: id });
    refetch();
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
        {isCancelable && (
          <DropdownMenuItem
            disabled={isCanceling}
            className="bg-red-500 text-white hover:cursor-pointer hover:bg-red-300"
            onClick={cancelBooking}
          >
            Hủy đặt sân
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
