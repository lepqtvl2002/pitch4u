"use client";
import React, { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Stars } from "@/components/ui/vote-stars";
import Link from "next/link";
import { Heart, MessageCircle, Phone } from "lucide-react";
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
import { PitchUseMutation } from "@/server/actions/pitch-actions";
import { toast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { pitchTypeToString } from "@/lib/convert";

export default function OrderSelections({ pitch }: { pitch: any }) {
  const { status } = useSession();
  const [price, setPrices] = React.useState(0);
  const [type, setType] = React.useState(pitch.types[0]);
  const [date, setDate] = React.useState<Date>(new Date());
  const [subPitches, setSubPitches] = React.useState<any>([]);
  const [subPitchId, setSubPitchId] = React.useState("");
  const [timeFrames, setTimeFrames] = React.useState<any>([]);
  const [timeFrame, setTimeFrame] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const { data, isFetching, isError } = PitchUseQuery.getBookingStatus({
    pitch_id: pitch.pitch_id,
  });
  const { mutateAsync } = PitchUseMutation.bookingPitch();

  async function bookingPitch(data: {
    subpitch_id: string | number;
    voucher_id?: string | number;
    start_time: string;
    end_time: string;
    payment_type: string;
  }) {
    try {
      setIsLoading(true);
      const result = await mutateAsync(data);
      setIsLoading(false);
      console.log(result);
      toast({
        title: "Đã đặt sân thành công",
        description: "Chúc mừng bạn, bạn đã đặt sân thành công.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Đã đặt sân thất bại",
        description: "Đã có lỗi xảy ra, vui lòng thử lại.",
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    // Get price
    if (subPitchId)
      for (const subPitch of subPitches) {
        if (subPitch?.subpitch_id === subPitchId) {
          setPrices(subPitch?.price);
          break;
        }
      }
  }, [subPitchId, subPitches]);

  useEffect(() => {
    // Get sub pitches
    for (const frame of timeFrames) {
      if (frame && frame.frame.join("-") === timeFrame) {
        const subPitchList = frame.free.filter((subPitch: any) => {
          return subPitch.type === type;
        });
        if (subPitchList.at(0)) {
          setPrices(subPitchList.at(0).price);
          setSubPitchId(subPitchList.at(0).subpitch_id);
        } else setPrices(0);
        setSubPitches(subPitchList);
        break;
      }
    }
  }, [timeFrame, timeFrames, type]);

  useEffect(() => {
    // Get time frame
    if (data?.result)
      for (const entry of data.result) {
        if (entry.day === date.getDate()) {
          setTimeFrames(entry.time_frames);
          break;
        }
      }
  }, [data?.result, date]);

  if (isFetching) return <div>Loading...</div>;
  if (isError) return <div>Error!!!</div>;
  return (
    <div className={"relative flex flex-col space-y-2"}>
      <Button variant={"ghost"} className={"absolute top-0 right-0"}>
        Tố cáo
      </Button>
      <h2 className="font-bold text-xl md:text-4xl">{pitch.name}</h2>
      <h3 className="text-sm md:text-lg">{pitch.address}</h3>
      <div className={"flex space-x-2 items-center"}>
        <Link href={"#voting"} className={"flex space-x-2 items-center"}>
          <Label className={""}>5/5</Label>
          <Stars rating={4.2} className={"text-yellow-400 text-xl"} />
        </Link>
        <Label>|</Label>
        <Link href={"#comment"}>2 Đánh Giá</Link>
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
              <SelectGroup>
                {timeFrames.map((timeFrame: any, index: number) => {
                  const value = timeFrame.frame.join("-");
                  return (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className={"space-x-2 space-y-2 items-center"}>
          <Label className={"text-gray-500 w-1/4"}>Loại Sân</Label>
          {pitch.types.map((typePitch: string) => (
            <Button
              variant={typePitch === type ? "default" : "outline"}
              key={typePitch}
              onClick={() => {
                setType(typePitch);
              }}
            >
              {pitchTypeToString(typePitch)}
            </Button>
          ))}
        </div>
        <div className={"flex space-x-2 items-center"}>
          <Label className={"text-gray-500 w-1/4"}>Chọn sân</Label>
          <Select
            onValueChange={(value) => {
              setSubPitchId(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue
                placeholder={
                  subPitchId
                    ? `${subPitches.at(0).name} - ${subPitches.at(0).price}đ/h`
                    : "Chọn sân"
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {subPitches.map((subPitch: any) => (
                  <SelectItem
                    key={subPitch.subpitch_id}
                    value={subPitch.subpitch_id}
                  >
                    {subPitch.name} - {subPitch.price}đ/h
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {price ? (
        <div
          className={
            "text-primary text-3xl space-x-2 p-4 text-end md:text-start"
          }
        >
          <Label>Giá</Label>
          <span>{price}</span>
        </div>
      ) : null}
      <div
        className={
          "fixed bottom-0 right-0 left-0 md:relative flex md:space-x-2 md:pt-20 bg-white z-10"
        }
      >
        <Button className={"hidden md:flex"} variant={"outline"}>
          <Heart className={"mr-2"} />
          <span className={"text-sm"}>Thêm vào danh sách yêu thích</span>
        </Button>
        <Button
          className={"w-1/4 md:hidden rounded-none flex-col p-0 m-0"}
          variant={"outline"}
        >
          <Heart />
          <span className={"text-xs"}>Yêu thích</span>
        </Button>
        <Button
          className={"w-1/4 md:hidden rounded-none flex-col p-0 m-0"}
          variant={"outline"}
        >
          <MessageCircle />
          <span className={"text-xs"}>Chat ngay</span>
        </Button>
        {status === "authenticated" ? (
          <Button
            className={
              "w-1/2 md:w-auto rounded-none md:rounded-md  bg-emerald-500 hover:bg-emerald-300"
            }
            disabled={!price || isLoading}
            onClick={async () => {
              const time = timeFrame.split("-");
              const data = {
                subpitch_id: subPitchId,
                payment_type: "pay_later",
                start_time: `${format(date, "yyyy-MM-dd")} ${time[0]}:00`,
                end_time: `${format(date, "yyyy-MM-dd")} ${time[1]}:00`,
                voucher_id: 1,
              };
              console.log("Book:", data);
              await bookingPitch(data);
            }}
          >
            Đặt sân ngay
          </Button>
        ) : (
          <a
            className={"w-1/2 md:w-auto rounded-none md:rounded-md "}
            href="tel:+4733378901"
          >
            <Button
              className={
                "w-full md:w-auto rounded-none md:rounded-md bg-emerald-500 hover:bg-emerald-300"
              }
            >
              <Phone className="text-white mr-2" /> Gọi điện để đặt sân
            </Button>
          </a>
        )}
        {status === "unauthenticated" && (
          <p className="absolute right-0 -top-4 md:-bottom-6 italic text-xs md:text-gray-400">
            Đăng nhập để có thể đặt sân mà không cần phải gọi điện.
          </p>
        )}
      </div>
    </div>
  );
}
