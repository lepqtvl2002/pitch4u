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
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";

const voucherFormSchema = z.object({
  code: z
    .string()
    .min(2, {
      message: "Code phải chứa tối thiểu 3 ký tự.",
    })
    .optional(),
  type: z.string().optional(),
  pitch_id: z.string().optional(),
  usage_count: z.string().optional(),
  discount: z.string().optional(),
  expire_date: z.date().optional(),
});

type VoucherFormValues = z.infer<typeof voucherFormSchema>;

type FormProps = {
  voucher?: IVoucher;
};

export function VoucherInputForm({ voucher }: FormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<VoucherFormValues>({
    resolver: zodResolver(voucherFormSchema),
    defaultValues: {
      code: voucher?.code,
      type: voucher?.type,
      pitch_id: voucher?.pitch_id?.toString(),
      expire_date: voucher?.expire_date || new Date(),
      usage_count: voucher?.usage_count?.toString(),
      discount: voucher?.discount.toString(),
    },
    // mode: "onChange",
  });
  const { mutateAsync: createVoucher } = VoucherUseMutation.create();
  const { mutateAsync: updateVoucher } = VoucherUseMutation.update(
    voucher?.voucher_id!
  );
  const router = useRouter();

  async function onSubmit(data: VoucherFormValues) {
    if (voucher) {
      setIsLoading(true);
      mutatingToast();
      await updateVoucher({
        ...data,
        usage_count: Number(data.usage_count),
        discount: Number(data.discount),
      });
      setIsLoading(false);
      router.push("/dashboard/voucher");
    } else {
      const missingInfo: string[] = [];
      if (!data.code) missingInfo.push("Code");
      if (!data.type) missingInfo.push("Loại giảm giá");
      if (!data.expire_date) missingInfo.push("Ngày hết hạn");
      if (!data.pitch_id) missingInfo.push("ID sân áp dụng voucher");
      if (!data.usage_count) missingInfo.push("Giảm");

      if (missingInfo.length === 0) {
        setIsLoading(true);
        mutatingToast();
        await createVoucher({
          ...data,
          code: data?.code || "CODE",
          expire_date: new Date(),
          type: data.type || "fixed",
          usage_count: Number(data?.usage_count),
          discount: Number(data?.discount),
        });
        setIsLoading(false);
        router.push("/dashboard/voucher");
      } else {
        toast({
          title: `Vui lòng điền đầy đủ thông tin: `,
          description: `${missingInfo.join(", ")}`,
        });
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
                  <SelectItem value={"fixed"}>Giảm luôn</SelectItem>
                  <SelectItem value={"percent"}>Giảm theo phần trăm</SelectItem>
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
                        format(field.value, "dd/MM/yyyy")
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
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pitch_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID sân bóng</FormLabel>
              <FormControl>
                <Input
                  placeholder="ID sân bóng, nơi áp dụng mã giảm này."
                  defaultValue={field.value}
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">
          {voucher ? "Cập nhật thông tin" : "Thêm mới voucher"}
        </Button>
      </form>
    </Form>
  );
}
