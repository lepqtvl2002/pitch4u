import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type BookingStatus } from "@/enums/bookingStatuses";
import { mutatingToast } from "@/lib/quick-toast";
import { PitchUseMutation } from "@/server/actions/pitch-actions";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

type DropdownMenuPitchProps = {
  id: string | number;
  link: string;
  refetchTable: any;
  status: BookingStatus;
};
export default function DropdownMenuActions({
  id,
  link,
  refetchTable,
  status,
}: DropdownMenuPitchProps) {
  const { mutateAsync: approveBookingMutate, isLoading } =
    PitchUseMutation.approveBookingPitch();
  const { mutateAsync: cancelBookingMutate, isLoading: isCanceling } =
    PitchUseMutation.cancelBookingPitch();

  async function handelApproveBooking() {
    mutatingToast();
    await approveBookingMutate({ booking_id: id });
    refetchTable();
  }

  async function handelCancelBooking() {
    mutatingToast();
    await cancelBookingMutate({ booking_id: id });
    refetchTable();
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link className="w-full text-center font-bold" href={link}>
            Xem chi tiết
          </Link>
        </DropdownMenuItem>

        {status === "pending" && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                disabled={isLoading}
                onClick={handelApproveBooking}
                className="bg-emerald-500 w-full"
              >
                Chấp nhận yêu cầu đặt sân
              </Button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                disabled={isCanceling}
                onClick={handelCancelBooking}
                className="bg-red-500 w-full"
              >
                Từ chối yêu cầu đặt sân
              </Button>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
