"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { formatDateToddMMyyyy } from "@/lib/format-datetime";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, FileEdit } from "lucide-react";
import React from "react";

function SubPitchDetailPage() {
  const [date, setDate] = React.useState<Date>(new Date());
  return (
    <div className="md:p-2 h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-2 h-full">
        <div className="col-span-1 flex flex-col space-y-2 w-full">
          {/* Information */}
          <Card className="relative h-fit">
            <Button variant="ghost" className="absolute top-2 right-2">
              <FileEdit />
            </Button>
            <CardHeader>
              <CardTitle>SÂN A1</CardTitle>
              <CardDescription>Thuộc cụm sân Nam Cao</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
          {/* Quick report */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Báo cáo nhanh trong ngày</CardTitle>
              <CardDescription>
                Ngày {formatDateToddMMyyyy(date.toString())}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Số giờ đã được đặt: 2</p>
              <p>Tổng số giờ đã sử dụng: 2</p>
              <p>Số tiền đã thu về: 200.000</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>
        <div className="lg:col-span-2 flex flex-col-reverse md:flex-col h-full">
          <Card className="h-full relative">
            <CardHeader>
              <CardTitle>
                Timeline - Ngày<DatePickerCustom date={date} setDate={setDate} />
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="absolute top-24 bottom-20 w-full overflow-auto">
              <Timeline timeFrames={timeFrames} />
            </CardContent>
            <CardFooter className="absolute bottom-0 w-full flex justify-around items-center pt-4 border-t">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-8 h-8 border rounded-full bg-emerald-400"></div>
                <span>Đã được đặt</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-8 h-8 border rounded-full"></div>
                <span>Còn trống</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SubPitchDetailPage;

const timeFrames = [
  {
    frame: [6, 7],
    free: true,
  },
  {
    frame: [7, 8],
    free: true,
  },
  {
    frame: [8, 9],
    free: false,
  },
  {
    frame: [9, 10],
    free: true,
  },
  {
    frame: [10, 11],
    free: false,
  },
  {
    frame: [11, 12],
    free: false,
  },
  {
    frame: [12, 13],
    free: false,
  },
  {
    frame: [13, 14],
    free: false,
  },
  {
    frame: [14, 15],
    free: false,
  },
];

function Timeline({ timeFrames }: { timeFrames: any[] }) {
  return (
    <div className="flex flex-col space-y-2 w-full">
      {timeFrames.map((timeFrame, index) => (
        <TimeFrame key={index} timeFrame={timeFrame} />
      ))}
    </div>
  );
}

function TimeFrame({ timeFrame }: { timeFrame: any }) {
  return (
    <div className="flex justify-between w-full">
      <span>{timeFrame?.frame[0]}:00</span>
      <div
        className={cn(
          "rounded border w-5/6 h-10",
          timeFrame?.free && "bg-emerald-400"
        )}
      ></div>
    </div>
  );
}

function DatePickerCustom({
  date,
  setDate,
}: {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"} className={cn("justify-center text-xl font-bold text-left bg-white")}>
          {!date ? "Chọn ngày" : format(date, "dd/MM/yyyy")}
          <CalendarIcon className="ml-2 h-6 w-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(day: Date | undefined) =>
            day ? setDate(day) : setDate(new Date())
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
