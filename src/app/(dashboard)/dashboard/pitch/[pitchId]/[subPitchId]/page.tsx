"use client";
import { DatePickerCustom } from "@/components/dashboard/date-booking";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { formatDateToddMMyyyy } from "@/lib/format-datetime";
import { mutatingToast } from "@/lib/quick-toast";
import { cn, createRangeArray, decimalToTimeString } from "@/lib/utils";
import { PitchUseMutation } from "@/server/actions/pitch-actions";
import { format } from "date-fns";
import { FileEdit } from "lucide-react";
import { useSearchParams } from "next/navigation";

import React, { useState } from "react";

function SubPitchDetailPage() {
  const [date, setDate] = React.useState<Date>(new Date());
  const searchParams = useSearchParams();
  const timeFrames = createRangeArray(
    Number(searchParams.get("open_at")),
    Number(searchParams.get("close_at"))
  );
  const [specialPriceList, setSpecialPriceList] = useState(
    searchParams.get("special_prices")?.split(",") ?? []
  );
  const [timeFramesSpecial, setTimeFramesSpecial] = useState(
    searchParams.get("time_frames_special")?.split(",") ?? []
  );
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
              <CardTitle>{searchParams.get("name")}</CardTitle>
              <CardDescription>
                Thuộc cụm sân {searchParams.get("name")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Label>Giá trung bình</Label>
              <p>{Number(searchParams.get("price")).toLocaleString()}</p>
              <Label>Giá các khung giờ đặc biệt</Label>
              <p className="flex flex-col gap-2">
                {timeFramesSpecial.map((frame, i) => (
                  <span key={i}>
                    {decimalToTimeString(Number(frame))} -{" "}
                    {decimalToTimeString(Number(frame) + 1)} :{" "}
                    {Number(specialPriceList[i]).toLocaleString()}{" "}
                  </span>
                ))}
              </p>
            </CardContent>
            <CardFooter>
              <Label className="mr-2">Ngày tạo</Label>
              <p>
                {format(
                  new Date(searchParams.get("createdAt") as string),
                  "dd/MM/yyyy"
                )}
              </p>
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
          </Card>
        </div>
        <div className="lg:col-span-2 flex flex-col-reverse md:flex-col h-full">
          <Card className="h-full relative">
            <CardHeader>
              <CardTitle>
                {/* Timeline - Ngày
                <DatePickerCustom date={date} setDate={setDate} /> */}
                Khung giờ hoạt động
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="absolute top-24 bottom-20 w-full overflow-auto">
              <div>
                <div className="grid gap-4 mt-2">
                  {timeFrames?.map((item, index) => {
                    const indexSpecialHour = timeFramesSpecial?.findIndex(
                      (e) => e == item.toString()
                    );
                    if (indexSpecialHour !== undefined)
                      return (
                        <div
                          key={index}
                          className={cn(
                            "grid gap-2 border rounded-lg",
                            indexSpecialHour > -1 && "bg-emerald-300"
                          )}
                        >
                          <div className="flex justify-between items-center">
                            <span className="pl-10 text-lg">
                              {decimalToTimeString(item)} -{" "}
                              {decimalToTimeString(item + 1)}
                            </span>
                            <span>
                              {indexSpecialHour > -1
                                ? specialPriceList?.[indexSpecialHour]
                                : searchParams.get("price")}
                            </span>
                            <div>
                              <PopoverPrice
                                onOk={(price: string) => {
                                  const indexFrame =
                                    timeFramesSpecial?.findIndex(
                                      (e) => e == item.toString()
                                    );
                                  if (indexFrame !== undefined) {
                                    if (indexFrame === -1) {
                                      setTimeFramesSpecial([
                                        ...timeFramesSpecial,
                                        item.toString(),
                                      ]);
                                      specialPriceList?.push(price);
                                    } else {
                                      if (
                                        timeFramesSpecial &&
                                        specialPriceList
                                      ) {
                                        setTimeFramesSpecial(
                                          timeFramesSpecial.map((e, index) =>
                                            index === indexFrame
                                              ? item.toString()
                                              : e
                                          )
                                        );
                                        setSpecialPriceList(
                                          specialPriceList.map((e, index) =>
                                            index === indexFrame ? price : e
                                          )
                                        );
                                      }
                                    }
                                  }
                                }}
                                initialPrice={Number(searchParams.get("price"))}
                                timeFrame={[item, item + 1]}
                                subPitchId={Number(
                                  searchParams.get("subpitch_id")
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      );
                  })}
                </div>
              </div>
            </CardContent>
            <CardFooter className="absolute bottom-0 w-full flex justify-around items-center pt-4 border-t">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-8 h-8 border rounded-full bg-emerald-400"></div>
                <span>Giờ đặc biệt</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-8 h-8 border rounded-full"></div>
                <span>Giờ bình thường</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SubPitchDetailPage;

export function PopoverPrice({
  subPitchId,
  initialPrice,
  timeFrame,
  onOk,
}: {
  subPitchId: number;
  initialPrice: number;
  timeFrame: number[];
  onOk: (price: string) => void;
}) {
  const [price, setPrice] = useState(initialPrice.toString());
  const { mutateAsync: setPriceMutate, isLoading } =
    PitchUseMutation.setSpecialPrice();

  async function handleSetPrice() {
    if (Number(price) !== initialPrice) {
      mutatingToast();
      await setPriceMutate({
        price: Number(price) || 0,
        time_frames: [timeFrame],
        subpitch_id: subPitchId,
      });
      onOk(price);
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          <Icons.edit className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Giá</h4>
            <p className="text-sm text-muted-foreground">
              Thay đổi giá sân khung giờ này.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="price">Giá</Label>
              <Input
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="col-span-2 h-8"
              />
            </div>
            <Button disabled={isLoading} onClick={handleSetPrice}>
              Lưu thay đổi
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
