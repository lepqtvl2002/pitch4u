import { ReviewDialogForm } from "@/app/(general)/[slug]/components/review-form";
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
import BookingStatuses from "@/enums/bookingStatuses";
import PaymentTypes from "@/enums/paymentTypes";
import { mutatingToast } from "@/lib/quick-toast";
import {
  bookingStateVariant,
  bookingStatusToString,
  paymentTypeToString,
} from "@/lib/utils";
import { PitchUseMutation } from "@/server/actions/pitch-actions";
import { BookingHistory } from "@/server/queries/user-queries";
import { addHours, format, set } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

type DropdownMenuProps = {
  id: string | number;
  url?: string;
  refetch?: any;
  booking: BookingHistory;
};
export default function DropdownMenuActions({
  id,
  refetch,
  booking,
}: DropdownMenuProps) {
  const [isReview, setIsReview] = useState(false);

  booking.booking_pitches.sort((a, b) => {
    if (new Date(a.start_time) > new Date(b.start_time)) return 1;
    return -1;
  });

  const firstBooking = booking.booking_pitches[0];

  const canReview =
    booking.status === BookingStatuses.Success &&
    new Date(firstBooking.start_time).getTime() < Date.now();

  const isCancelable =
    (booking.status === BookingStatuses.Success &&
      new Date(firstBooking.start_time) > addHours(new Date(), 1)) ||
    booking.status === BookingStatuses.Pending;

  const canPayment =
    booking.status === BookingStatuses.Pending &&
    booking.payment_type === PaymentTypes.PayOS;

  const { mutateAsync: cancelBookingMutate, isLoading: isCanceling } =
    PitchUseMutation.cancelBookingPitch();

  async function cancelBooking() {
    mutatingToast();
    await cancelBookingMutate({ booking_id: id });
    refetch();
  }

  return (
    <Dialog
      onOpenChange={(value) => {
        // Set isReview is false when close dialog
        if (isReview && !value) {
          setIsReview(false);
        }
      }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="space-y-1">
          <DialogTrigger className="w-full">
            <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
          </DialogTrigger>
          {canReview && (
            <DialogTrigger className="w-full">
              <DropdownMenuItem
                onClick={() => {
                  setIsReview(true);
                }}
                className="bg-blue-500 text-white hover:cursor-pointer hover:bg-blue-300"
              >
                Review sân
              </DropdownMenuItem>
            </DialogTrigger>
          )}
          {canPayment && (
            <DropdownMenuItem
              className="bg-yellow-500 text-white hover:cursor-pointer hover:bg-yellow-300"
              onClick={() => {
                window.open(booking.payment_url, "_blank");
              }}
            >
              Thanh toán
            </DropdownMenuItem>
          )}
          {isCancelable ? (
            <DropdownMenuItem
              disabled={isCanceling}
              className="bg-red-500 text-white hover:cursor-pointer hover:bg-red-300"
              onClick={cancelBooking}
            >
              Hủy đặt sân
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              disabled
              className="bg-green-500 text-white hover:cursor-pointer hover:bg-green-300"
            >
              Đặt lại
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {isReview ? (
        <ReviewDialogForm bookingId={booking.booking_id} />
      ) : (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thông tin đặt sân chi tiết</DialogTitle>
            {isCancelable && (
              <DialogDescription>
                Bạn chỉ có thể hủy sân 1 giờ trước giờ đá, việc hủy đặt sân
                thường xuyên không có lý do sẽ bị cảnh cáo và xử phạt.
              </DialogDescription>
            )}
          </DialogHeader>
          <BookingDetailDialogContent booking={booking} />
          <DialogFooter>
            {isCancelable && (
              <Button variant="destructive" onClick={cancelBooking}>
                Hủy đặt sân
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}

function BookingDetailDialogContent({ booking }: { booking: BookingHistory }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Label>Tên sân bóng</Label>
      <span>{booking.pitch?.name}</span>
      <Label>Ngày giờ đá</Label>
      {booking.booking_pitches.map((bookingPitch) => {
        return (
          <p key={bookingPitch.booking_pitch_id}>
            {format(
              new Date(booking.booking_pitches[0].start_time),
              "HH:mm - dd/MM/yyyy"
            )}
          </p>
        );
      })}

      <Label>Thời gian đặt sân</Label>
      <span>
        {format(new Date(booking.createdAt), "HH:mm:ss - dd/MM/yyyy")}
      </span>
      <Label>Giá</Label>
      <span>{booking.total.toLocaleString()}</span>
      <Label>Giảm giá</Label>
      <span>{booking.discount}</span>
      <Label>Trạng thái</Label>
      <span className={bookingStateVariant({ variant: booking.status })}>
        {bookingStatusToString(booking.status)}
      </span>
      <Label>Phương thức thanh toán</Label>
      <span>{paymentTypeToString(booking.payment_type)}</span>
    </div>
  );
}
