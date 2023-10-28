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
import { cn } from "@/lib/utils";
import { PitchUseQuery } from "@/server/queries/pitch-query";
import { ISubPitch } from "@/types/subPitch";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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
  const { data, error, isLoading } = PitchUseQuery.getBookingStatus({
    pitch_id: pitchId,
  });

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error as string}</div>;
  console.log(timeFrames);
  return (
    <div className="h-screen overflow-y-auto">
      <Card className="max-h-screen relative">
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
          <div className="overflow-auto">
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
                    {timeFrame?.frame[0]}:00
                  </span>
                  {subPitches?.map((subPitch, index: number) => (
                    <Button
                      key={index}
                      onClick={() => console.log(subPitch, timeFrame)}
                      variant={"outline"}
                      className={cn(
                        "w-40 h-10",
                        pitchBookedIds.includes(subPitch.subpitch_id)
                          ? "bg-emerald-400"
                          : "bg-white"
                      )}
                    ></Button>
                  ))}
                  {subPitches?.map((subPitch, index: number) => (
                    <Button
                      key={index}
                      onClick={() => console.log(subPitch, timeFrame)}
                      variant={"outline"}
                      className={cn(
                        "w-40 h-10",
                        pitchBookedIds.includes(subPitch.subpitch_id)
                          ? "bg-emerald-400"
                          : "bg-white"
                      )}
                    ></Button>
                  ))}
                  {subPitches?.map((subPitch, index: number) => (
                    <Button
                      key={index}
                      onClick={() => console.log(subPitch, timeFrame)}
                      variant={"outline"}
                      className={cn(
                        "w-40 h-10",
                        pitchBookedIds.includes(subPitch.subpitch_id)
                          ? "bg-emerald-400"
                          : "bg-white"
                      )}
                    ></Button>
                  ))}
                  {subPitches?.map((subPitch, index: number) => (
                    <Button
                      key={index}
                      onClick={() => console.log(subPitch, timeFrame)}
                      variant={"outline"}
                      className={cn(
                        "w-40 h-10",
                        pitchBookedIds.includes(subPitch.subpitch_id)
                          ? "bg-emerald-400"
                          : "bg-white"
                      )}
                    ></Button>
                  ))}
                  {subPitches?.map((subPitch, index: number) => (
                    <Button
                      key={index}
                      onClick={() => console.log(subPitch, timeFrame)}
                      variant={"outline"}
                      className={cn(
                        "w-40 h-10",
                        pitchBookedIds.includes(subPitch.subpitch_id)
                          ? "bg-emerald-400"
                          : "bg-white"
                      )}
                    ></Button>
                  ))}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PitchTimeline;
