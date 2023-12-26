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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { useState } from "react";
import { IVoucher } from "@/types/voucher";
import { VoucherUseMutation } from "@/server/actions/voucher-actions";
import { mutatingToast } from "@/lib/quick-toast";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn, voucherTypeToString } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import VoucherTypes from "@/enums/voucherTypes";

const createVoucherFormSchema = z.object({
  code: z.string().min(2, {
    message: "Code phải chứa tối thiểu 3 ký tự.",
  }),
  type: z.string(),
  usage_count: z.string(),
  discount: z.string(),
  expire_date: z.date().optional(),
});

const updateVoucherFormSchema = z.object({
  code: z
    .string()
    .min(2, {
      message: "Code phải chứa tối thiểu 3 ký tự.",
    })
    .optional(),
  type: z.string().optional(),
  usage_count: z.string().optional(),
  discount: z.string().optional(),
  expire_date: z.date().optional(),
});

type FormProps = {
  voucher?: IVoucher;
};

export function VoucherInputForm({ voucher }: FormProps) {
  const voucherFormSchema = voucher
    ? updateVoucherFormSchema
    : createVoucherFormSchema;
  type VoucherFormValues = z.infer<typeof voucherFormSchema>;
  const form = useForm<VoucherFormValues>({
    resolver: zodResolver(voucherFormSchema),
    defaultValues: {
      code: voucher?.code,
      type: voucher?.type,
      expire_date: voucher?.expire_date
        ? new Date(voucher.expire_date)
        : addDays(new Date(), 1),
      usage_count: voucher?.usage_count?.toString(),
      discount:
        voucher?.type === "percent"
          ? (voucher?.discount * 100)?.toString()
          : voucher?.discount.toString(),
    },
    // mode: "onChange",
  });
  const { mutateAsync: createVoucher, isLoading } = VoucherUseMutation.create();
  const { mutateAsync: updateVoucher, isLoading: isUpdating } =
    VoucherUseMutation.update(voucher?.voucher_id!);
  const router = useRouter();
  const [pitch, setPitch] = useState<{ pitchId: number; pitchName: string }>({
    pitchId: Number(voucher?.pitch_id),
    pitchName: voucher?.pitch_id ? voucher.pitch_id.toString() : "",
  });

  async function onSubmit(data: VoucherFormValues) {
    if (voucher) {
      mutatingToast();
      const { ...sendValues } = data;
      await updateVoucher({
        ...sendValues,
        usage_count: Number(data.usage_count),
        discount:
          data.type == "fixed"
            ? Number(data.discount)
            : Number(data.discount) / 100,
      });
      router.push("/dashboard/voucher");
    } else {
      if (pitch) {
        mutatingToast();
        const { ...sendValues } = data;
        await createVoucher({
          ...sendValues,
          code: data?.code || "CODE",
          // expire_date,
          type: data.type || "fixed",
          usage_count: Number(data?.usage_count),
          discount:
            data.type == "fixed"
              ? Number(data.discount)
              : Number(data.discount) / 100,
          pitch_id: pitch?.pitchId,
        });
        router.push("/dashboard/voucher");
      } else {
        toast({ title: "" });
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CODE</FormLabel>
              <FormControl>
                <Input
                  placeholder="Mã voucher"
                  defaultValue={field.value}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Đây là tên hiển thị công khai của voucher.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loại giảm giá</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại giảm giá" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={VoucherTypes.Fixed}>
                    {voucherTypeToString(VoucherTypes.Fixed)}
                  </SelectItem>
                  <SelectItem value={VoucherTypes.Percent}>
                    {voucherTypeToString(VoucherTypes.Percent)}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="usage_count"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số tiền tối thiểu để sử mã giảm giá</FormLabel>
              <FormControl>
                <Input type="number" defaultValue={field.value} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số giảm</FormLabel>
              <FormControl>
                <Input type="number" defaultValue={field.value} {...field} />
              </FormControl>
              <FormDescription>
                {form.getValues().type == "percent"
                  ? "Nhập số phần trăm được giảm (1 - 100)."
                  : "Nhập số tiền được giảm"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expire_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Ngày hết hạn</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "dd/MM/yyyy")
                      ) : (
                        <span>Chọn 1 ngày</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date <= new Date() || date > new Date("2090-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        {!voucher ? <SelectPitch pitch={pitch} setPitch={setPitch} /> : null}
        <Button disabled={isLoading || isUpdating} type="submit">
          {voucher ? "Cập nhật thông tin" : "Thêm mới voucher"}
        </Button>
      </form>
    </Form>
  );
}

import * as React from "react";
import { PitchUseQuery } from "@/server/queries/pitch-queries";
import { Card, CardContent, CardHeader } from "../ui/card";
import useDebounce from "@/hooks/use-debounce";

export function SelectPitch({
  pitch,
  setPitch,
}: {
  pitch: { pitchId: number; pitchName: string };
  setPitch: any;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(pitch?.pitchName);
  const debouncedSearch = useDebounce(value);
  const { data, isLoading } = PitchUseQuery.getMyPitches({
    name: debouncedSearch,
  });
  React.useEffect(() => {
    if (value.length > 0) setOpen(true);
    else setOpen(false);
  }, [value]);
  return (
    <div className="grid gap-8 mt-8">
      <FormLabel>Sân bóng sử dụng voucher này</FormLabel>
      <Input
        placeholder="Nhập tên sân"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className={cn(open ? "flex" : "hidden")}>
        <Card>
          <CardHeader>Chọn sân sử dụng voucher</CardHeader>
          {isLoading ? (
            <>Loading...</>
          ) : (
            <CardContent>
              {data?.result.data.map((item) => (
                <Button
                  type="button"
                  key={item.pitch_id}
                  variant={
                    pitch?.pitchId == item.pitch_id ? "default" : "outline"
                  }
                  onClick={() => {
                    setPitch({ pitchId: item.pitch_id });
                    setValue(item.name);
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
