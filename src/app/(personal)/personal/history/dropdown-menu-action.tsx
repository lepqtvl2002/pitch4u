import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { mutatingToast } from "@/lib/quick-toast";
import {
  bookingStateVariant,
  bookingStatusToString,
  paymentTypeToString,
} from "@/lib/utils";
import { PitchUseMutation } from "@/server/actions/pitch-actions";
import { BookingHistory } from "@/server/queries/user-queries";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";

type DropdownMenuProps = {
  id: string | number;
  url?: string;
  refetch?: any;
  booking: BookingHistory;
  isCancelable?: boolean;
};
export default function DropdownMenuActions({
  id,
  refetch,
  booking,
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
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DialogTrigger className="w-full">
            <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
          </DialogTrigger>
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thông tin đặt sân chi tiết</DialogTitle>
          {isCancelable && (
            <DialogDescription>
              Bạn chỉ có thể hủy sân 1 giờ trước giờ đá, việc hủy đặt sân thường
              xuyên không có lý do sẽ bị cảnh cáo và xử phạt.
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="grid grid-cols-2 gap-2">
          <Label>Tên sân bóng</Label>
          <span>{booking.pitch?.name}</span>
          <Label>Ngày giờ đá</Label>
          <span>
            {format(
              new Date(booking.booking_pitches[0].start_time),
              "HH:mm - dd/MM/yyyy"
            )}
          </span>
          <Label>Thời gian đặt sân</Label>
          <span>
            {format(new Date(booking.createdAt), "HH:mm:ss - dd/MM/yyyy")}
          </span>
          <Label>Giá</Label>
          <span>{booking.booking_pitches[0].price.toLocaleString()}</span>
          <Label>Giảm giá</Label>
          <span>{booking.discount}</span>
          <Label>Trạng thái</Label>
          <span className={bookingStateVariant({ variant: booking.status })}>
            {bookingStatusToString(booking.status)}
          </span>
          <Label>Phương thức thanh toán</Label>
          <span>{paymentTypeToString(booking.payment_type)}</span>
        </div>
        <DialogFooter>
          {isCancelable && (
            <Button variant="destructive" onClick={cancelBooking}>
              Hủy đặt sân
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
