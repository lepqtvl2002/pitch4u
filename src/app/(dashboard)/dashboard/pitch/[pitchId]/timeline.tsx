"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, decimalToTimeString } from "@/lib/utils";
import { PitchUseQuery } from "@/server/queries/pitch-queries";
import { ISubPitch } from "@/types/subPitch";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PitchUseMutation } from "@/server/actions/pitch-actions";
import { format, isSameDay } from "date-fns";
import { DatePickerBookingPitch } from "@/components/ui/date-picker";
import { toast } from "@/components/ui/use-toast";
import { mutatingToast } from "@/lib/quick-toast";
import Link from "next/link";
import BookingStatuses from "@/enums/bookingStatuses";

type TimeFramesProps = {
  frame: number[];
  free: ISubPitch[];
  busy: ISubPitch[];
};

function PitchTimeline() {
  const { pitchId } = useParams();
  const [date, setDate] = useState(new Date());
  const [timeFrames, setTimeFrames] = useState<TimeFramesProps[]>([]);
  const [subPitches, setSubPitches] = useState<ISubPitch[]>([]);
  const [isToday, setIsToday] = useState(true);
  const { data, error, isLoading, refetch } = PitchUseQuery.getBookingStatus({
    pitch_id: pitchId,
  });
  const { mutateAsync, isLoading: isBooking } = PitchUseMutation.bookingPitch();
  const { mutateAsync: cancelBookingMutate, isLoading: isCanceling } =
    PitchUseMutation.cancelBookingPitch();
  const { mutateAsync: approveBookingMutate, isLoading: isApproving } =
    PitchUseMutation.approveBookingPitch();

  useEffect(() => {
    const day = date.getDate();
    data?.result.forEach((item: any) => {
      if (item.day === day) {
        setTimeFrames(item.time_frames);
        return;
      }
    });
    setIsToday(isSameDay(date, new Date()));
  }, [date, data?.result]);

  useEffect(() => {
    if (timeFrames.length > 0) {
      const subPitchList = [
        ...timeFrames[0]?.free,
        ...timeFrames[0]?.busy,
      ].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      setSubPitches(subPitchList);
    }
  }, [timeFrames]);

  async function bookingPitch(data: {
    subpitch_id: string | number;
    start_time: string;
    end_time: string;
    payment_type: string;
    voucher_id?: number | string;
  }) {
    mutatingToast();
    await mutateAsync(data);
    refetch();
  }

  async function cancelBooking(data: { booking_id: number | string }) {
    mutatingToast();
    await cancelBookingMutate(data);
    refetch();
  }

  async function approveBooking(data: { booking_id: number | string }) {
    mutatingToast();
    await approveBookingMutate(data);
    refetch();
  }

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <span className="text-red-500">
        {
          "Không thể tải được Timeline đặt sân, vui lòng kiểm tra lại phần config phía trên!"
        }
      </span>
    );
  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle>
          Timeline - Ngày
          <DatePickerBookingPitch date={date} setDate={setDate} />
        </CardTitle>
        <CardDescription className="w-full flex justify-start space-x-4 items-center">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-8 h-8 border rounded-full bg-emerald-400"></div>
            <span>Đã được đặt</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-8 h-8 border rounded-full"></div>
            <span>Còn trống</span>
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent className="absolute w-full border rounded-b-lg">
        {subPitches.length > 0 ? (
          <div className="inline-flex flex-col overflow-auto">
            <div className="inline-flex items-center pl-10 space-x-2">
              {subPitches?.map((subPitch: ISubPitch) => (
                <span key={subPitch.subpitch_id} className="w-40 text-center">
                  {subPitch?.name}
                </span>
              ))}
            </div>
            {timeFrames.map((timeFrame: TimeFramesProps, index: number) => {
              const bookedPitches = timeFrame.busy.map(
                (subPitch: ISubPitch) => ({
                  subpitch_id: subPitch.subpitch_id,
                  booking: subPitch?.booking,
                })
              );
              const canBooking = isToday
                ? timeFrame.frame[0] > new Date().getHours()
                : true;
              return (
                <div
                  key={index}
                  className={cn(
                    "inline-flex pt-2 pr-2 pl-10 space-x-2",
                    !canBooking && "bg-gray-200"
                  )}
                >
                  <span className={"absolute left-6"}>
                    {decimalToTimeString(timeFrame?.frame[0])}
                  </span>
                  {subPitches?.map((subPitch, index: number) => {
                    const ordered = bookedPitches.find(
                      (bookedPitch) =>
                        bookedPitch.subpitch_id === subPitch.subpitch_id
                    );
                    return (
                      <Popover key={index}>
                        <PopoverTrigger>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-40 h-10",
                              !ordered
                                ? "bg-white"
                                : ordered.booking?.status ===
                                  BookingStatuses.Pending
                                ? "bg-yellow-300"
                                : "bg-emerald-500",
                              !canBooking && "opacity-30"
                            )}
                          ></Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          {ordered ? (
                            <div className="space-y-2">
                              <Button
                                disabled={isCanceling}
                                className="w-full"
                                onClick={() => {
                                  toast({
                                    title: "Thông tin đặt sân:",
                                    description: (
                                      <div className="w-full">
                                        <pre className="flex flex-col mt-2 rounded-md bg-slate-950 p-4">
                                          <code className="text-white">
                                            ID: {ordered.booking?.booking_id}
                                          </code>
                                          <code className="text-white">
                                            Ngày đặt sân:{" "}
                                            {format(
                                              new Date(
                                                ordered.booking?.start_time ||
                                                  ""
                                              ),
                                              "dd/MM/yyyy"
                                            )}
                                          </code>
                                          <code className="text-white break-words">
                                            Thời gian đặt sân:{" "}
                                            {
                                              ordered.booking?.start_time?.split(
                                                " "
                                              )[1]
                                            }{" "}
                                            đến{" "}
                                            {
                                              ordered.booking?.end_time?.split(
                                                " "
                                              )[1]
                                            }
                                          </code>
                                          <code className="text-white">
                                            ID sân:{" "}
                                            {ordered.booking?.subpitch_id}
                                          </code>
                                        </pre>
                                        <div className="flex mt-2 gap-2">
                                          {ordered.booking?.status ===
                                            BookingStatuses.Pending && (
                                            <Button
                                              disabled={
                                                !canBooking || isCanceling
                                              }
                                              className="bg-emerald-500 hover:bg-emerald-200 w-full flex-1"
                                              onClick={() => {
                                                approveBooking({
                                                  booking_id:
                                                    ordered.booking
                                                      ?.booking_id || "0",
                                                });
                                              }}
                                            >
                                              Chấp nhận
                                            </Button>
                                          )}
                                          <Button
                                            disabled={
                                              !canBooking || isCanceling
                                            }
                                            className="bg-red-500 hover:bg-red-200 w-full flex-1"
                                            onClick={() => {
                                              cancelBooking({
                                                booking_id:
                                                  ordered.booking?.booking_id ||
                                                  "0",
                                              });
                                            }}
                                          >
                                            Hủy đặt sân
                                          </Button>
                                        </div>
                                      </div>
                                    ),
                                    variant: "default",
                                  });
                                }}
                              >
                                Xem thông tin đặt sân
                              </Button>
                              {ordered.booking?.status ===
                                BookingStatuses.Pending && (
                                <Button
                                  disabled={!canBooking || isCanceling}
                                  className="bg-emerald-500 hover:bg-emerald-200 w-full"
                                  onClick={() => {
                                    approveBooking({
                                      booking_id:
                                        ordered.booking?.booking_id || "0",
                                    });
                                  }}
                                >
                                  Chấp nhận yêu cầu đặt sân
                                </Button>
                              )}
                              <Button
                                disabled={!canBooking || isCanceling}
                                className="bg-red-500 hover:bg-red-200 w-full"
                                onClick={() => {
                                  cancelBooking({
                                    booking_id:
                                      ordered.booking?.booking_id || "0",
                                  });
                                }}
                              >
                                Hủy đặt sân
                              </Button>
                            </div>
                          ) : (
                            <Button
                              disabled={!canBooking || isBooking}
                              onClick={async () => {
                                await bookingPitch({
                                  subpitch_id: subPitch.subpitch_id,
                                  payment_type: "pay_later",
                                  start_time: `${format(
                                    date,
                                    "yyyy-MM-dd"
                                  )} ${decimalToTimeString(
                                    timeFrame.frame[0]
                                  )}:00`,
                                  end_time: `${format(
                                    date,
                                    "yyyy-MM-dd"
                                  )} ${decimalToTimeString(
                                    timeFrame.frame[1]
                                  )}:00`,
                                });
                              }}
                              className="bg-emerald-500 hover:bg-emerald-200 w-full"
                            >
                              Đặt sân
                            </Button>
                          )}
                        </PopoverContent>
                      </Popover>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ) : (
          <span className="my-6">
            Chưa có sân con, hãy{" "}
            <Link
              className="underline"
              href={`/dashboard/pitch/${pitchId}/create`}
            >
              tạo sân con
            </Link>{" "}
            ngay nào!
          </span>
        )}
      </CardContent>
    </Card>
  );
}

export default PitchTimeline;
