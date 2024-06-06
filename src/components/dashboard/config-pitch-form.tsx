"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PitchUseMutation } from "@/server/actions/pitch-actions";
import {
  cn,
  convertDayOfWeek,
  convertTimeStringToDecimal,
  decimalToTimeString,
} from "@/lib/utils";
import { Icons } from "../icons";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, PlusIcon, XIcon } from "lucide-react";
import { toast } from "../ui/use-toast";
import { IPitch } from "@/types/pitch";

const timeStringSchema = z
  .string()
  .regex(/^(?:[0-9]|[0-2][0-9]):[0-5][0-9]$/, {
    message: "Vui lòng nhập theo định dạng: HH:MM (ví dụ 7:10)",
  })
  .transform((timeString) =>
    timeString
      .split(":")
      .map((num) => parseInt(num))
      .join(":")
  );

const profileFormSchema = z.object({
  time_frames: z.array(z.array(timeStringSchema)),
  open_at: timeStringSchema,
  close_at: timeStringSchema,
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

type FormProps = {
  pitch?: IPitch;
};

export function ConfigPitchForm({ pitch }: FormProps) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      open_at: decimalToTimeString(pitch?.config?.open_at ?? 6),
      close_at: decimalToTimeString(pitch?.config?.close_at ?? 22),
      time_frames: pitch?.config?.time_frames?.map((timeFrame: number[]) =>
        timeFrame.map((time) => decimalToTimeString(time))
      ),
    },
    mode: "onChange",
  });

  const timeFramesArray = useFieldArray({
    control: form.control,
    name: "time_frames",
  });

  const [isShowOpenDays, setIsShowOpenDays] = useState(true);
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

  const { mutateAsync, isLoading } = pitch
    ? PitchUseMutation.configPitch(pitch?.pitch_id)
    : { mutateAsync: () => {}, isLoading: true };

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

  async function onSubmit(values: ProfileFormValues) {
    const data = {
      open_days: openDays.filter((day) => day.active).map((day) => day.day),
      open_at: convertTimeStringToDecimal(values.open_at),
      close_at: convertTimeStringToDecimal(values.close_at),
      time_frames: values.time_frames.map((timeFrame) => [
        convertTimeStringToDecimal(timeFrame[0]),
        convertTimeStringToDecimal(timeFrame[1]),
      ]),
    };
    toast({
      title: "Đang xử lý yêu cầu",
      description: "Vui lòng chờ trong giây lát",
    });
    await mutateAsync(data);
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
        <div className="grid gap-4">
          <FormLabel>Các khung giờ</FormLabel>
          {timeFramesArray.fields.map((timeFrame, index) => {
            return (
              <div key={timeFrame.id}>
                <div className="flex gap-2">
                  <FormField
                    key={`${timeFrame.id}-0`}
                    control={form.control}
                    name={`time_frames.${index}.0`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    key={`${timeFrame.id}-1`}
                    control={form.control}
                    name={`time_frames.${index}.1`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => timeFramesArray.remove(index)}
                  >
                    <XIcon />
                  </Button>
                </div>
              </div>
            );
          })}
          <Button
            size="icon"
            variant="outline"
            onClick={() => timeFramesArray.append([""])}
          >
            <PlusIcon />
          </Button>
        </div>

        <Button type="submit" disabled={isLoading}>
          Cập nhật cài đặt
        </Button>
      </form>
    </Form>
  );
}
