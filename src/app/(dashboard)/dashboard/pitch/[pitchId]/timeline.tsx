"use client";
import { DatePickerCustom } from "@/components/dashboard/date-booking";
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
import { format } from "date-fns";

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
  const { data, error, isLoading, refetch } = PitchUseQuery.getBookingStatus({
    pitch_id: pitchId,
  });
  const { mutateAsync } = PitchUseMutation.bookingPitch();

  useEffect(() => {
    const day = date.getDate();
    data?.result.forEach((item: any) => {
      if (item.day === day) {
        setTimeFrames(item.time_frames);
        return;
      }
    });
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
    await mutateAsync(data);
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
          <DatePickerCustom date={date} setDate={setDate} />
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
        <div className="inline-flex flex-col overflow-auto">
          <div className="inline-flex items-center pl-10 space-x-2">
            {subPitches?.map((subPitch: ISubPitch) => (
              <span key={subPitch.subpitch_id} className="w-40 text-center">
                {subPitch?.name}
              </span>
            ))}
          </div>
          {timeFrames.map((timeFrame: TimeFramesProps, index: number) => {
            const pitchBookedIds = timeFrame.busy.map(
              (subPitch: ISubPitch) => subPitch.subpitch_id
            );
            return (
              <div key={index} className="inline-flex pl-10 space-x-2">
                <span className="absolute left-4">
                  {decimalToTimeString(timeFrame?.frame[0])}
                </span>
                {subPitches?.map((subPitch, index: number) => {
                  const isOrdered = pitchBookedIds.includes(
                    subPitch.subpitch_id
                  );
                  return (
                    <Popover key={index}>
                      <PopoverTrigger>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-40 h-10",
                            isOrdered ? "bg-emerald-400" : "bg-white"
                          )}
                        ></Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        {isOrdered ? (
                          <Button className="bg-red-500 hover:bg-red-200 w-full">
                            Hủy đặt sân
                          </Button>
                        ) : (
                          <Button
                            onClick={async () => {
                              await bookingPitch({
                                subpitch_id: subPitch.subpitch_id,
                                payment_type: "pay_later",
                                voucher_id: 1,
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
      </CardContent>
    </Card>
  );
}

export default PitchTimeline;
