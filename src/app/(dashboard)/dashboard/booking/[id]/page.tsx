"use client";
import { AvatarCustom } from "@/components/ui/avatar-custom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { BookingStatus } from "@/enums/bookingStatuses";
import { mutatingToast } from "@/lib/quick-toast";
import {
  bookingStateVariant,
  bookingStatusToString,
  paymentTypeToString,
} from "@/lib/utils";
import { PitchUseMutation } from "@/server/actions/pitch-actions";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function DetailBookingPage() {
  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const bookingInfo = Object.fromEntries(searchParams.entries());
  const { mutateAsync: approveBookingMutate, isLoading } =
    PitchUseMutation.approveBookingPitch();
  const { mutateAsync: cancelBookingMutate, isLoading: isCanceling } =
    PitchUseMutation.cancelBookingPitch();

  async function handelApproveBooking() {
    mutatingToast();
    await approveBookingMutate({ booking_id: id as string });
    router.push("/dashboard/booking");
  }

  async function handelCancelBooking() {
    mutatingToast();
    await cancelBookingMutate({ booking_id: id as string });
    router.push("/dashboard/booking");
  }

  function renderInfo() {
    return Object.entries(bookingInfo).map((item, index) => {
      if (
        !stringToLabel(item[0]) ||
        item[0]?.includes("user") ||
        item[0]?.includes("subpitch")
      ) {
        return;
      } else
        return (
          <p key={index} className="flex justify-between flex-wrap">
            <Label className="mr-2">{stringToLabel(item[0])} :</Label>
            {renderValueByTitle(item)}
          </p>
        );
    });
  }

  function renderValueByTitle(item: [string, string]) {
    return item[0] === "status" ? (
      <span
        className={bookingStateVariant({
          variant: item[1] as BookingStatus,
        })}
      >
        {bookingStatusToString(item[1])}
      </span>
    ) : item[0] === "payment_type" ? (
      paymentTypeToString(item[1])
    ) : !Number.isNaN(Number(item[1])) ? (
      Number(item[1]).toLocaleString()
    ) : (
      item[1]
    );
  }

  function renderUserInfo() {
    return (
      <div className="flex gap-2 md:gap-8">
        <AvatarCustom
          className="w-20 h-20 md:w-40 md:h-40"
          avatarUrl={searchParams.get("user_avatar") as string}
          name={searchParams.get("user_name") as string}
        />
        <div className="flex flex-col gap-4">
          <p className="text-xl font-medium mb-4">Thông tin người đặt</p>
          <p>
            <Label>{stringToLabel("user_name")} :</Label>{" "}
            {searchParams.get("user_name")}
          </p>
          <p>
            <Label>{stringToLabel("user_phone")} :</Label>{" "}
            {searchParams.get("user_phone")}
          </p>
          <p>
            <Label>{stringToLabel("user_email")} :</Label>{" "}
            {searchParams.get("user_email")}
          </p>
        </div>
      </div>
    );
  }

  function renderBookingPitchesInfo() {
    const subpitchIds = searchParams.getAll("subpitch_ids");
    const subpitchNames = searchParams.getAll("subpitch_names");
    const startTimes = searchParams.getAll("subpitch_start_time");
    const endTimes = searchParams.getAll("subpitch_end_time");
    return (
      <div>
        <p className="text-lg mt-2 font-medium mb-4">
          Thông tin sân và thời gian đặt
        </p>
        <div className="flex flex-col gap-4">
          {subpitchIds.map((subpitchId, index) => (
            <div key={subpitchId} className="flex flex-col md:flex-row justify-between">
              <p>
                <Label>Sân:</Label> {subpitchNames[index]}
              </p>
              <p>
                <Label className="mr-2">Ngày:</Label>
                {startTimes[index].split(" ")[0]}
              </p>
              <p>
                <Label className="mr-2">Thời gian:</Label>
                {`${startTimes[index].split(" ")[1]} - ${
                  endTimes[index].split(" ")[1]
                }`}
              </p>
              <Separator className="md:hidden" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="flex-1 xl:w-2/3 space-y-6 p-2 md:p-10 pb-16">
      <div>
        <h3 className="text-lg font-medium">Thông tin đặt sân</h3>
        <p className="text-sm text-muted-foreground">
          Thông tin chi tiết về nội dung đặt sân sẽ được hiển thị tại đây.
        </p>
      </div>
      <Separator />
      <div className="grid gap-4 border rounded-xl p-2 md:p-4">
        {renderUserInfo()}
        <div>
          <p className="text-xl font-medium mb-4">Nội dung đặt sân</p>
          <div className="flex flex-col gap-2 md:gap-5 px-2 md:px-10">
            {renderInfo()}
          </div>
          <div className="flex flex-col gap-2 md:gap-5 px-2 md:px-10">
            {renderBookingPitchesInfo()}
          </div>
        </div>
      </div>
      {searchParams.get("status") === "pending" && (
        <div className="flex gap-2">
          <Button
            disabled={isLoading}
            onClick={handelApproveBooking}
            className="bg-emerald-500 w-full"
          >
            Chấp nhận yêu cầu đặt sân
          </Button>
          <Button
            disabled={isCanceling}
            onClick={handelCancelBooking}
            className="bg-red-500 w-full"
          >
            Từ chối yêu cầu đặt sân
          </Button>
        </div>
      )}
    </div>
  );
}

const stringToLabel = (string: string) => {
  switch (string) {
    case "payment_url": 
      return "Link thanh toán";
    case "booking_id":
      return "Mã đặt sân";
    case "user_id":
      return "ID người dùng đặt sân";
    case "payment_type":
      return "Phương thức thanh toán";
    case "status":
      return "Trạng thái";
    case "discount":
      return "Giảm giá";
    case "total":
      return "Tổng tiền";
    case "voucher_id":
      return null;
    case "tournament_id":
      return null;
    case "pitch_id":
      return "ID sân bóng";
    case "price":
      return "Giá sân";
    case "price_id":
      return null;
    case "createdAt":
      return "Thời gian đặt sân";
    case "updatedAt":
      return "Cập nhật lúc";
    case "deletedAt":
      return null;
    case "pitches":
      return null;
    case "user":
      return null;
    case "special_price":
      return null;
    case "booking_pitches":
      return null;
    case "user_avartar":
      return "Ảnh đại diện";
    case "user_name":
      return "Họ tên";
    case "user_phone":
      return "Số điện thoại";
    case "user_email":
      return "Email";
    default:
      return string;
  }
};
