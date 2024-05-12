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
import { timeFrameToString } from "@/lib/format-datetime";
import { mutatingToast } from "@/lib/quick-toast";
import { cn, decimalToTimeString, formatMoney } from "@/lib/utils";
import { PitchUseMutation } from "@/server/actions/pitch-actions";
import { PitchUseQuery } from "@/server/queries/pitch-queries";
import { format } from "date-fns";
import { FileEdit } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";

import React, { useEffect, useRef, useState } from "react";

function SubPitchDetailPage() {
  const [date, setDate] = React.useState<Date>(new Date());
  const { subPitchId } = useParams();
  const searchParams = useSearchParams();
  const [name, setName] = useState(searchParams.get("name") as string);
  const [price, setPrice] = useState(searchParams.get("price") as string);

  const { data, refetch, isLoading, isError } =
    PitchUseQuery.getSubPitchPriceConfig({
      subpitchId: subPitchId as string,
    });

  const { result: priceConfig } = data || {};

  const timeFrames = searchParams.getAll("time_frames").map((e) => Number(e));

  useEffect(() => {
    if (priceConfig) {
      priceConfig.sort((a, b) => a.time_frame[0] - b.time_frame[0]);
    }
  }, [priceConfig]);

  return (
    <div className="p-2 h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-2 h-full">
        <div className="col-span-1 flex flex-col space-y-2 w-full">
          {/* Information */}
          <Card className="relative h-fit">
            <PopoverEditSubPitch
              className="absolute top-2 right-2"
              subPitchId={subPitchId as string}
              currentPrice={Number(searchParams.get("price"))}
              currentName={searchParams.get("name") as string}
              onOK={({ name, price }) => {
                setName(name);
                setPrice(price);
              }}
            />
            <CardHeader>
              <CardTitle>{name}</CardTitle>
              <CardDescription>
                Thuộc cụm sân {searchParams.get("parent_name")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <Label>Giá trung bình</Label>
                <p className="text-lg">{formatMoney(Number(price))}</p>
              </div>
              <div className="flex flex-col items-stretch">
                <Label>Giá các khung giờ đặc biệt</Label>
                <p className="flex flex-col">
                  {priceConfig?.map((frame, i) => (
                    <span className="text-sm" key={i}>
                      {timeFrameToString(frame.time_frame)}
                      <span className="text-lg ml-2">
                        {Number(frame.price).toLocaleString()}
                      </span>
                    </span>
                  ))}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Label className="mr-2">Ngày tạo sân</Label>
              <p>
                {format(
                  new Date(searchParams.get("createdAt") as string),
                  "dd/MM/yyyy"
                )}
              </p>
            </CardFooter>
          </Card>
          {/* Quick report */}
          {/* <Card className="h-fit">
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
          </Card> */}
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
            <CardContent className="relative md:absolute md:top-24 md:bottom-20 w-full overflow-auto">
              <div>
                <div className="grid gap-4 mt-2">
                  {timeFrames?.map((item, index) => {
                    const indexSpecialHour = priceConfig?.findIndex(
                      (e) => e.time_frame[0] == item
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
                                ? priceConfig?.[indexSpecialHour].price
                                : price}
                            </span>
                            <div>
                              <PopoverPrice
                                onDelete={() => {
                                  refetch();
                                }}
                                onOk={() => {
                                  refetch();
                                }}
                                initialPrice={Number(price)}
                                currentPrice={
                                  indexSpecialHour > -1
                                    ? Number(
                                        priceConfig?.[indexSpecialHour].price
                                      )
                                    : Number(price)
                                }
                                timeFrame={[item, item + 1]}
                                subPitchId={subPitchId as string}
                              />
                            </div>
                          </div>
                        </div>
                      );
                  })}
                </div>
              </div>
            </CardContent>
            <CardFooter className="relative md:absolute bottom-0 w-full flex justify-around items-center pt-4 border-t">
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

function PopoverPrice({
  subPitchId,
  initialPrice,
  currentPrice,
  timeFrame,
  onOk,
  onDelete,
  priceId,
}: {
  priceId?: number;
  subPitchId: number | string;
  initialPrice: number;
  currentPrice: number;
  timeFrame: number[];
  onDelete: any;
  onOk: ({ price }: { price: string }) => void;
}) {
  const [price, setPrice] = useState(currentPrice.toString());
  const { mutateAsync: setPriceMutate, isLoading } =
    PitchUseMutation.setSpecialPrice();
  const { mutateAsync: updatePriceMutate } =
    PitchUseMutation.updateSpecialPrice(Number(priceId));
  const { mutateAsync: deletePriceMutate } =
    PitchUseMutation.deleteSpecialPrice(Number(priceId));

  async function handleSetPrice() {
    if (Number(price) !== currentPrice) {
      mutatingToast();
      if (priceId) {
        await updatePriceMutate({ price: Number(price) || initialPrice });
        onOk({ price });
      } else {
        const data = await setPriceMutate({
          subpitch_id: subPitchId,
          time_frames: [
            { time_frame: timeFrame, price: Number(price) || initialPrice },
          ],
        });
        console.log(data);
        onOk({ price });
      }
    }
  }

  async function deleteSpecialPrice() {
    if (priceId) {
      mutatingToast();
      await deletePriceMutate();
      onDelete();
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
            <Button
              disabled={isLoading || Number(price) == currentPrice}
              onClick={handleSetPrice}
            >
              Lưu thay đổi
            </Button>
            {priceId ? (
              <Button
                variant="outline"
                disabled={isLoading}
                onClick={deleteSpecialPrice}
              >
                Khôi phục giá gốc
              </Button>
            ) : null}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function PopoverEditSubPitch({
  subPitchId,
  currentPrice,
  currentName,
  className,
  onOK,
}: {
  subPitchId: number | string;
  currentPrice: number;
  currentName: string;
  className?: string;
  onOK: ({ name, price }: { name: string; price: string }) => void;
}) {
  const [price, setPrice] = useState(currentPrice.toString());
  const [name, setName] = useState(currentName);

  const { mutateAsync: updateSubPitchMutate, isLoading } =
    PitchUseMutation.updateSubPitch();

  async function handleUpdate() {
    mutatingToast();
    await updateSubPitchMutate({
      subPitchId: subPitchId,
      data: {
        name,
        price: Number(price),
      },
    });
    onOK({
      name,
      price,
    });
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className={className} variant="ghost">
          <FileEdit />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="price">Tên</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-2 h-8"
            />
            <Label htmlFor="price">Giá</Label>
            <Input
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="col-span-2 h-8"
            />
          </div>
          <Button
            disabled={
              isLoading ||
              (Number(price) == currentPrice && name == currentName)
            }
            onClick={handleUpdate}
          >
            Lưu thay đổi
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
