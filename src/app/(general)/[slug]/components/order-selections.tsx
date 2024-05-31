"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Stars } from "@/components/ui/vote-stars";
import Link from "next/link";
import {
  Heart,
  MessageCircle,
  Phone,
  TicketIcon,
  XCircleIcon,
} from "lucide-react";
import { PitchUseQuery } from "@/server/queries/pitch-queries";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerBookingPitch } from "@/components/ui/date-picker";
import {
  BookingPitchProps,
  PitchUseMutation,
} from "@/server/actions/pitch-actions";
import { format, isSameDay } from "date-fns";
import { useSession } from "next-auth/react";
import { subPitchTypeToString } from "@/lib/convert";
import { activeVariant, cn, formatMoney } from "@/lib/utils";
import { ReportForm } from "./report-form";
import { IPitch, ITimeFrame } from "@/types/pitch";
import { mutatingToast } from "@/lib/quick-toast";
import { ISubPitch } from "@/types/subPitch";
import { stringToTimeFrame, timeFrameToString } from "@/lib/format-datetime";
import PaymentTypes from "@/enums/paymentTypes";
import { VoucherDialog } from "./voucher-dialog";
import { IVoucher } from "@/types/voucher";
import VoucherTypes from "@/enums/voucherTypes";

interface GroupedType {
  [key: string]: any[];
}

export default function OrderSelections({ pitch }: { pitch: IPitch }) {
  const { data: session } = useSession();
  const [price, setPrice] = React.useState(0);
  const [subPitchTypes, setSubPitchTypes] = React.useState<string[]>([]);
  const [type, setType] = React.useState<string>("");
  const [date, setDate] = React.useState<Date>(new Date());
  const [subPitches, setSubPitches] = React.useState<ISubPitch[]>([]);
  const [currentSubPitch, setCurrentSubPitch] = React.useState<ISubPitch>();
  const [timeFrames, setTimeFrames] = React.useState<ITimeFrame[]>([]);
  const [timeFrame, setTimeFrame] = React.useState("");
  const [isToday, setIsToday] = React.useState(true);
  const isLikedPitch = pitch?.likes?.some(
    (e: { user_id: number }) => e.user_id === session?.user.userId
  );
  const [isLiked, setIsLiked] = React.useState(isLikedPitch);
  const [voucher, setVoucher] = React.useState<IVoucher | undefined>();
  const [bookingTimes, setBookingTimes] = React.useState<
    {
      date: Date;
      timeFrameString: string;
      subPitchName: string;
      subPitchId: number | string;
      price: number;
    }[]
  >([]);

  const { data: dataSubPitchType } = PitchUseQuery.getSubPitchTypes({
    pitchType: pitch.type,
  });

  const { data, isFetching, isError, refetch } = PitchUseQuery.getBookingStatus(
    {
      pitch_id: pitch.pitch_id,
    }
  );
  const { mutateAsync, isLoading } = PitchUseMutation.bookingPitch();
  const { mutateAsync: likePitchMutate } = PitchUseMutation.likePitch();

  async function handleBookingPitch() {
    const grouped = bookingTimes.reduce((result: GroupedType, currentItem) => {
      (result[currentItem.subPitchId] =
        result[currentItem.subPitchId] || []).push(currentItem);
      return result;
    }, {});

    if (Object.keys(grouped).length > 1) {
      alert(
        "Bạn đang đặt nhiều sân cùng lúc, đơn hàng của bạn sẽ được chia nhỏ, vui lòng thanh thanh toán theo từng sân."
      );
    }
    for (const groupKey in grouped) {
      mutatingToast();
      const data: BookingPitchProps = {
        subpitch_id: grouped[groupKey][0].subPitchId,
        payment_type: PaymentTypes.PayOS,
        frame_times: grouped[groupKey].map((time) => {
          const frame = time.timeFrameString.split(" - ");
          return {
            start_time: `${format(time.date, "yyyy-MM-dd")} ${frame[0]}`,
            end_time: `${format(time.date, "yyyy-MM-dd")} ${frame[1]}`,
          };
        }),
        returnUrl: `${window.location.origin}/personal/history`,
        cancelUrl: `${window.location.origin}/personal/history`,
      };
      if (voucher) {
        data.voucher_id = voucher.voucher_id;
      }
      const bookingInfo = await mutateAsync(data, {
        onSuccess(data, variables, context) {
          console.log(data, variables, context);
          refetch();
        },
      });

      window.open(bookingInfo.result.paymentUrl, "_blank");
    }
  }

  async function handleLikePitch() {
    setIsLiked((prev) => !prev);
    await likePitchMutate(pitch.pitch_id);
  }

  useEffect(() => {
    if (dataSubPitchType?.result) {
      setSubPitchTypes(Object.values(dataSubPitchType.result));
    }
  }, [dataSubPitchType]);

  useEffect(() => {
    // Get price
    if (currentSubPitch) {
      const currentTimeFrame = stringToTimeFrame(timeFrame);
      for (const subPitch of subPitches) {
        if (subPitch.subpitch_id == currentSubPitch.subpitch_id) {
          const currentPrice = subPitch.price_by_hour?.find(
            (price) => price.time_frame[0] == currentTimeFrame[0]
          );
          setPrice(currentPrice?.price ?? subPitch.price);
          // Add booking time
          if (
            bookingTimes.every(
              (time) =>
                time.date !== date ||
                time.timeFrameString !== timeFrame ||
                time.subPitchId !== subPitch.subpitch_id
            ) &&
            subPitches.findIndex(
              (e) => e.subpitch_id === currentSubPitch.subpitch_id
            ) !== -1
          ) {
            setBookingTimes([
              ...bookingTimes,
              {
                date,
                timeFrameString: timeFrame,
                subPitchId: subPitch.subpitch_id,
                subPitchName: subPitch.name,
                price: currentPrice?.price ?? subPitch.price,
              },
            ]);
          }
          break;
        }
      }
    }
  }, [currentSubPitch, subPitches, timeFrame]);

  useEffect(() => {
    // Get sub pitches
    for (const frame of timeFrames) {
      if (frame && timeFrameToString(frame.frame) === timeFrame) {
        const subPitchList = type
          ? frame.free.filter((subPitch) => {
              return subPitch.type === type;
            })
          : frame.free;
        setSubPitches(subPitchList);
        break;
      }
    }
  }, [timeFrame, timeFrames, type]);

  useEffect(() => {
    // Get time frame
    if (data?.result)
      for (const entry of data.result) {
        if (isSameDay(date, new Date(entry.date))) {
          setTimeFrames(entry.time_frames);
          break;
        }
      }

    setIsToday(isSameDay(date, new Date()));
  }, [data?.result, date]);

  if (isFetching) return <div>Loading...</div>;
  if (isError) return <div></div>;
  return (
    <div className={"relative flex flex-col space-y-2"}>
      <div className={cn("absolute top-0 right-0", !session && "hidden")}>
        <ReportForm pitchId={pitch.pitch_id} />
      </div>
      <h2 className="font-bold text-xl md:text-4xl">{pitch.name}</h2>
      <h3 className="text-sm md:text-lg">{pitch.address}</h3>
      <div className={"flex space-x-2 items-center"}>
        {Number(pitch?.rate) > 0 ? (
          <>
            <Link href={"#voting"} className={"flex gap-2 items-center"}>
              <Label className={"text-lg"}>
                {Number(pitch?.rate).toFixed(1)}/
                <span className="text-sm">5</span>
              </Label>
              <Stars rating={Number(pitch?.rate) || 5} />
            </Link>
            <Label>|</Label>
          </>
        ) : null}
        <Link href={"#comment"}>
          {pitch?.reviews?.length || "Chưa có"} đánh giá
        </Link>
      </div>
      <div className="flex flex-col space-y-2">
        <div className={"flex items-center space-x-2"}>
          <Label className={"text-gray-500 w-1/4"}>Chọn ngày</Label>
          <DatePickerBookingPitch date={date} setDate={setDate} />
        </div>
        <div className={"flex space-x-2 items-center"}>
          <Label className={"text-gray-500 w-1/4"}>Chọn thời gian</Label>
          <Select
            onValueChange={(value) => {
              setTimeFrame(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={"Chọn thời gian"} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="max-h-60 overflow-auto">
                {timeFrames.map((timeFrame) => {
                  const value = timeFrameToString(timeFrame.frame);
                  const canBookThisTime = isToday
                    ? timeFrame.frame[0] > new Date().getHours()
                    : true;
                  return (
                    <SelectItem
                      disabled={
                        !canBookThisTime ||
                        timeFrame.free.length === 0 ||
                        timeFrame.busy.findIndex(
                          (e) => e.subpitch_id === currentSubPitch?.subpitch_id
                        ) !== -1
                      }
                      key={value}
                      value={value}
                    >
                      {value}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {subPitchTypes.length > 0 && (
          <div className={"space-x-2 space-y-2 items-center"}>
            <Label className={"text-gray-500 w-1/4"}>Loại Sân</Label>
            {subPitchTypes.map((subPitchType, index) => (
              <Button
                variant={subPitchType === type ? "default" : "outline"}
                key={index}
                onClick={() => {
                  if (subPitchType === type) {
                    setType("");
                    return;
                  }
                  setType(subPitchType);
                }}
              >
                {subPitchTypeToString({
                  pitchType: pitch.type,
                  subPitchType: subPitchType,
                })}
              </Button>
            ))}
          </div>
        )}
        <div className={"flex space-x-2 items-center"}>
          <Label className={"text-gray-500 w-1/4"}>Chọn sân</Label>
          <Select
            onValueChange={(value) => {
              setCurrentSubPitch(JSON.parse(value));
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue
                placeholder={
                  currentSubPitch ? (
                    currentSubPitch.name
                  ) : subPitches.length > 0 ? (
                    "Chọn sân"
                  ) : (
                    <span className="text-red-500 italic">
                      Hết sân, vui lòng chọn khung giờ khác
                    </span>
                  )
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="max-h-52 overflow-auto">
                {subPitches.map((subPitch) => {
                  return (
                    <SelectItem
                      key={subPitch.subpitch_id}
                      value={JSON.stringify(subPitch)}
                    >
                      {subPitch.name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {bookingTimes.map((time, index) => {
        return (
          <Button
            key={index}
            variant="secondary"
            className="justify-between gap-2"
          >
            <b>{time.subPitchName}</b>
            <span>{format(time.date, "dd/MM/yyyy")}</span>
            <span className="italic">{time.timeFrameString}</span>
            <span className="text-lg">{formatMoney(time.price)}</span>
            <XCircleIcon
              color="gray"
              size={20}
              className="ml-2"
              onClick={() => {
                setBookingTimes(bookingTimes.filter((_, i) => i !== index));
              }}
            />
          </Button>
        );
      })}
      <div
        className={"text-primary text-3xl space-x-2 p-4 text-end md:text-start"}
      >
        <Label>Tổng Giá</Label>
        <span>
          {bookingTimes.reduce((prev, cur) => prev + Number(cur.price), 0)}
        </span>
      </div>
      {voucher && (
        <div onClick={() => setVoucher(undefined)}>
          <VoucherSelectedItem voucher={voucher} />
        </div>
      )}
      <VoucherDialog
        pitchId={pitch.pitch_id}
        voucher={voucher}
        setVoucher={(voucher) =>
          setVoucher((prev) => (prev ? undefined : voucher))
        }
      />
      <div
        className={
          "fixed bottom-0 right-0 left-0 md:relative flex md:flex-col lg:flex-row md:gap-2 md:pt-20 bg-white z-10"
        }
      >
        <Button
          onClick={handleLikePitch}
          className={"hidden md:flex"}
          variant={"outline"}
        >
          <Heart className={"mr-2"} fill={isLiked ? "black" : "white"} />
          <span className={"text-sm"}>Thêm vào danh sách yêu thích</span>
        </Button>
        <Button
          onClick={handleLikePitch}
          className={"w-1/4 md:hidden rounded-none flex-col p-0 m-0"}
          variant={"outline"}
        >
          <Heart fill={isLiked ? "black" : "white"} />
          <span className={"text-xs"}>Yêu thích</span>
        </Button>
        <Button
          className={"w-1/4 md:hidden rounded-none flex-col p-0 m-0"}
          variant={"outline"}
        >
          <MessageCircle />
          <span className={"text-xs"}>Chat ngay</span>
        </Button>
        <Link
          className={"w-1/2 md:w-auto rounded-none md:rounded-md "}
          href="tel:+4733378901"
        >
          <Button
            className={
              "relative w-full md:w-full rounded-none md:rounded-md border border-emerald-500 text-emerald-500 bg-white hover:bg-emerald-300"
            }
          >
            {!session && (
              <p className="absolute -top-4 text-end w-screen right-0 md:top-10 md:w-full italic text-xs md:text-gray-400">
                Đăng nhập để có thể đặt sân mà không cần phải gọi điện.
              </p>
            )}
            <Phone className="mr-2" /> Gọi điện đặt sân
          </Button>
        </Link>
        <Button
          className={cn(
            "w-1/2 md:w-auto rounded-none md:rounded-md  bg-emerald-500 hover:bg-emerald-300",
            !session && "hidden"
          )}
          disabled={!price || isLoading}
          onClick={handleBookingPitch}
        >
          Đặt sân ngay
        </Button>
      </div>
    </div>
  );
}

function VoucherSelectedItem({ voucher }: { voucher: IVoucher }) {
  return (
    <div className="flex border-2 border-emerald-400 rounded overflow-hidden cursor-pointer">
      <div className=" bg-emerald-500 text-center p-4">
        <TicketIcon className="w-6 h-6 text-white font-semibold" />
      </div>
      <div className="flex-1 flex flex-wrap justify-between gap-x-2 p-2">
        <p className="truncate">{voucher.code}</p>
        {voucher.type === VoucherTypes.Percent ? (
          <p>{Number(voucher.discount) * 100}%</p>
        ) : (
          <p>{voucher.discount.toLocaleString()}đ</p>
        )}
        {voucher.active ? (
          <div className={activeVariant({ variant: true })}>Đang hoạt động</div>
        ) : (
          <div className={activeVariant({ variant: false })}>Đã hết hạn</div>
        )}
        <p>
          Ngày hết hạn: {format(new Date(voucher.expire_date), "dd/MM/yyyy")}
        </p>
      </div>
    </div>
  );
}
