"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PitchUseMutation } from "@/server/actions/pitch-actions";
import { useRouter } from "next/navigation";
import {
  cn,
  convertDayOfWeek,
  convertTimeStringToDecimal,
  createRangeArray,
  decimalToTimeString,
  numberToWords,
} from "@/lib/utils";
import { Icons } from "../icons";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "../ui/use-toast";

const profileFormSchema = z.object({
  open_at: z
    .string()
    .regex(/^(?:[0-9]|[0-2][0-9]):[0-5][0-9]$/, {
      message: "Vui lòng nhập theo định dạng: HH:MM (ví dụ 7:10)",
    })
    .transform((timeString) =>
      timeString
        .split(":")
        .map((num) => parseInt(num))
        .join(":")
    ),
  close_at: z
    .string()
    .regex(/^(?:[0-9]|[0-2][0-9]):[0-5][0-9]$/, {
      message: "Vui lòng nhập theo định dạng: HH:MM (ví dụ 7:10)",
    })
    .transform((timeString) =>
      timeString
        .split(":")
        .map((num) => parseInt(num))
        .join(":")
    ),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

type FormProps = {
  pitch?: any;
};

export function ConfigPitchForm({ pitch }: FormProps) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      open_at: decimalToTimeString(pitch?.config.open_at) || "6:00",
      close_at: decimalToTimeString(pitch?.config.close_at) || "22:00",
    },
    // mode: "onChange",
  });

  const [isShowOpenDays, setIsShowOpenDays] = useState(true);
  const [isShowTimeFrames, setIsShowTimeFrames] = useState(true);
  const [timeFrames, setTimeFrames] = useState<
    { number: number; active: boolean }[]
  >([]);
  const [openDays, setOpenDays] = useState<
    { day: "2" | "3" | "4" | "5" | "6" | "7" | "CN"; active: boolean }[]
  >([
    { day: "2", active: true },
    { day: "3", active: true },
    { day: "4", active: true },
    { day: "5", active: true },
    { day: "6", active: true },
    { day: "7", active: true },
    { day: "CN", active: true },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [prices, setPrices] = useState({
    pitch5: pitch?.min_price,
    pitch7: pitch?.min_price,
    pitch11: pitch?.min_price,
  });

  const { mutateAsync } = PitchUseMutation.configPitch(pitch?.pitch_id);
  const route = useRouter();

  useEffect(() => {
    const numbers = createRangeArray(
      convertTimeStringToDecimal(form.getValues().open_at),
      convertTimeStringToDecimal(form.getValues().close_at)
    );

    setTimeFrames(numbers.map((number) => ({ number, active: true })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.getValues().open_at, form.getValues().close_at]);

  useEffect(() => {
    if (pitch?.config?.open_days)
      for (let i = 0; i < 7; i++) {
        if (!pitch?.config?.open_days?.includes(openDays[i].day)) {
          setOpenDays(
            openDays.map((day, index) =>
              index === i ? { day: day.day, active: false } : day
            )
          );
        }
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pitch?.config?.open_days]);

  function onSubmit(values: ProfileFormValues) {
    const numbers = createRangeArray(
      convertTimeStringToDecimal(values.open_at),
      convertTimeStringToDecimal(values.close_at)
    );

    setTimeFrames(numbers.map((number) => ({ number, active: true })));
  }

  async function handelUpdatePitchConfig(values: ProfileFormValues) {
    const data = {
      open_at: convertTimeStringToDecimal(values.open_at),
      close_at: convertTimeStringToDecimal(values.close_at),
      time_frames: timeFrames
        .filter((timeFrame) => timeFrame.active)
        .map((timeFrame) => [timeFrame.number, timeFrame.number + 1]),
      open_days: openDays.filter((day) => day.active).map((day) => day.day),
    };
    setIsLoading(true);
    toast({
      title: "Đang xử lý yêu cầu",
      description: "Vui lòng chờ trong giây lát",
    });
    await mutateAsync(data);
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsShowOpenDays((pre) => !pre)}
          >
            <Label className={cn("text-md")}>Các ngày mở cửa trong tuần</Label>
            {isShowOpenDays ? <ChevronUp /> : <ChevronDown />}
          </Button>
          {isShowOpenDays && (
            <div className="grid gap-4 mt-2">
              {openDays.map((day, index) => (
                <div
                  key={day.day}
                  className={cn(
                    "grid gap-2 rounded-lg border",
                    day.active && "bg-emerald-300"
                  )}
                >
                  <div className="flex justify-between items-center">
                    <span className="pl-10 text-lg">
                      {convertDayOfWeek(Number(day.day))}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        setOpenDays(
                          openDays.map((day, i) =>
                            index === i
                              ? { day: day.day, active: !day.active }
                              : day
                          )
                        );
                      }}
                    >
                      {day.active ? (
                        <Icons.trash className="h-4 w-4" />
                      ) : (
                        <Icons.add className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <FormField
          control={form.control}
          name="open_at"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giờ mở cửa</FormLabel>
              <FormControl>
                <Input
                  placeholder="Giờ mở cửa"
                  defaultValue={field.value}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="close_at"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giờ đóng cửa</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Giờ đóng cửa"
                  defaultValue={field.value}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Cập nhật khung giờ hoạt động</Button>
        <h3 className="text-lg font-medium">Cài đặt giá sân</h3>
        <p className="text-sm text-muted-foreground">
          Bạn có thể thay đổi giá của những khung giờ đặc biệt bằng việc nhấn
          vào nút chỉnh sửa ở khung thời gian hoạt động bên dưới.
        </p>
        <div className="flex flex-col gap-2">
          <Label htmlFor="price-pitch5">Giá sân 5</Label>
          <Input
            id="price-pitch5"
            type="number"
            placeholder="Giá sân 5"
            defaultValue={prices.pitch5}
            onChange={(e) => {
              setPrices({ ...prices, pitch5: e.target.value });
            }}
          />
          <span className="mb-4">
            {numberToWords(prices.pitch5) || "Vui lòng nhập giá trị hợp lệ"}
          </span>
          <Label htmlFor="price-pitch7">Giá sân 7</Label>
          <Input
            id="price-pitch7"
            type="number"
            placeholder="Giá sân 7"
            defaultValue={prices.pitch7}
            onChange={(e) => {
              setPrices({ ...prices, pitch7: e.target.value });
            }}
          />
          <span className="mb-4">
            {numberToWords(prices.pitch7) || "Vui lòng nhập giá trị hợp lệ"}
          </span>
          <Label htmlFor="price-pitch11">Giá sân 11</Label>
          <Input
            id="price-pitch11"
            type="number"
            placeholder="Giá sân 11"
            defaultValue={prices.pitch11}
            onChange={(e) => {
              setPrices({ ...prices, pitch11: e.target.value });
            }}
          />
          <span className="mb-4">
            {numberToWords(prices.pitch11) || "Vui lòng nhập giá trị hợp lệ"}
          </span>
        </div>
        <div>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsShowTimeFrames((pre) => !pre)}
          >
            <Label className={cn("text-md")}>Các khung giờ hoạt động</Label>
            {isShowTimeFrames ? <ChevronUp /> : <ChevronDown />}
          </Button>
          {isShowTimeFrames && (
            <div className="grid gap-4 mt-2">
              {timeFrames.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "grid gap-2 border rounded-lg",
                    item.active && "bg-emerald-300"
                  )}
                >
                  <div className="flex justify-between items-center">
                    <span className="pl-10 text-lg">
                      {decimalToTimeString(item.number)} -{" "}
                      {decimalToTimeString(item.number + 1)}
                    </span>
                    <div>
                      <PopoverPrice
                        initialPrices={{
                          pitch5: 100000,
                          pitch7: 100000,
                          pitch11: 100000,
                        }}
                        pitchId={pitch?.pitch_id}
                        timeFrame={[item.number, item.number + 1]}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          setTimeFrames(
                            timeFrames.map((frame, i) =>
                              index !== i
                                ? frame
                                : {
                                    number: frame.number,
                                    active: !frame.active,
                                  }
                            )
                          );
                        }}
                      >
                        {item.active ? (
                          <Icons.trash className="h-4 w-4" />
                        ) : (
                          <Icons.add className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button type="button" disabled={isLoading}>
          Cập nhật cài đặt
        </Button>
      </form>
    </Form>
  );
}

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { mutatingToast } from "@/lib/quick-toast";

export function PopoverPrice({
  pitchId,
  initialPrices,
  timeFrame,
}: {
  pitchId: number;
  initialPrices: any;
  timeFrame: number[];
}) {
  const [prices, setPrices] = useState({
    pitch5: initialPrices?.pitch5,
    pitch7: initialPrices?.pitch7,
    pitch11: initialPrices?.pitch11,
  });
  const { mutateAsync: setPriceMutate, isLoading } =
    PitchUseMutation.setSpecialPrice(pitchId);

  async function handleSetPrice() {
    mutatingToast();
    await setPriceMutate({
      pitch_type: "PITCH5",
      price: prices.pitch5,
      time_frames: [timeFrame],
    });
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
              <Label htmlFor="price-pitch5">Sân 5</Label>
              <Input
                id="price-pitch5"
                value={prices.pitch5}
                onChange={(e) =>
                  setPrices({ ...prices, pitch5: e.target.value })
                }
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="price-pitch7">Sân 7</Label>
              <Input
                id="price-pitch7"
                value={prices.pitch7}
                onChange={(e) =>
                  setPrices({ ...prices, pitch7: e.target.value })
                }
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="price-pitch11">Sân 11</Label>
              <Input
                id="price-pitch11"
                value={prices.pitch11}
                onChange={(e) =>
                  setPrices({ ...prices, pitch11: e.target.value })
                }
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
