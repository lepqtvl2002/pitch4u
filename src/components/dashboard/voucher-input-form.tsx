"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { CalendarIcon, XCircleIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import VoucherTypes from "@/enums/voucherTypes";
import { SelectMultipleMyPitches } from "./pitch-picker";
import { IPitch } from "@/types/pitch";

const createVoucherFormSchema = z.object({
  code: z.string().min(2, {
    message: "Code phải chứa tối thiểu 3 ký tự.",
  }),
  type: z.string(),
  usage_count: z.string().optional(),
  discount: z.string(),
  expire_date: z.date().optional(),
  public: z.boolean(),
  min_price: z.string().optional(),
  max_discount: z.string().optional(),
});

const updateVoucherFormSchema = z.object({
  type: z.string().optional(),
  usage_count: z.string().optional(),
  discount: z.string().optional(),
  expire_date: z.date().optional(),
  public: z.boolean().optional(),
  min_price: z.string().optional(),
  max_discount: z.string().optional(),
});

type FormProps = {
  voucher?: IVoucher;
};

export function VoucherCreateForm() {
  const voucherFormSchema = createVoucherFormSchema;
  type VoucherFormValues = z.infer<typeof voucherFormSchema>;
  const form = useForm<VoucherFormValues>({
    resolver: zodResolver(voucherFormSchema),
  });
  const [pitches, setPitches] = useState<IPitch[]>([]);
  const { mutateAsync: createVoucher, isLoading } = VoucherUseMutation.create();
  const router = useRouter();

  async function onSubmit(data: VoucherFormValues) {
    if (pitches.length > 0) {
      mutatingToast();
      await createVoucher({
        ...data,
        usage_count: Number(data?.usage_count),
        discount:
          data.type == "fixed"
            ? Number(data.discount)
            : Number(data.discount) / 100,
        pitch_id: pitches.at(0)?.pitch_id,
        public: data?.public || true,
        max_discount: data?.max_discount ? Number(data.max_discount) : null,
        min_price: data?.min_price ? Number(data.min_price) : null,
      });
      router.push("/dashboard/voucher");
    } else {
      toast({ title: "Vui lòng chọn sân áp dụng voucher này!" });
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
          name="public"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Sử dung cho tất cả người dùng (công khai)</FormLabel>
                <FormDescription>
                  Nếu chọn, voucher sẽ hiển thị cho tất cả người dùng. Nếu
                  không, người dùng chỉ có thể sử dụng voucher khi có được mã.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="usage_count"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số lượng voucher được tung ra</FormLabel>
              <FormControl>
                <Input type="number" defaultValue={field.value} {...field} />
              </FormControl>
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
          name="max_discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số tiền giảm tối đa</FormLabel>
              <FormControl>
                <Input type="number" defaultValue={field.value} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="min_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số tiền tối thiểu để sử dụng voucher</FormLabel>
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
        <div className="space-y-2">
          <FormLabel>Sân áp dụng</FormLabel>
          <div className="flex gap-2">
            {pitches?.map((pitch) => (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                key={pitch.pitch_id}
                onClick={() =>
                  setPitches((prev) =>
                    prev.filter(
                      (prevPitch) => prevPitch.pitch_id !== pitch.pitch_id
                    )
                  )
                }
              >
                {pitch.name}
                <XCircleIcon color="gray" size={20} className="ml-2" />
              </Button>
            ))}
          </div>
          <SelectMultipleMyPitches
            pitches={pitches}
            setPitches={setPitches}
            prevPitchIDs={undefined}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Thêm mới voucher
        </Button>
      </form>
    </Form>
  );
}

export function VoucherUpdateForm({ voucher }: FormProps) {
  const voucherFormSchema = updateVoucherFormSchema;
  type VoucherFormValues = z.infer<typeof voucherFormSchema>;
  const form = useForm<VoucherFormValues>({
    resolver: zodResolver(voucherFormSchema),
    defaultValues: {
      type: voucher?.type,
      expire_date: voucher?.expire_date
        ? new Date(voucher.expire_date)
        : addDays(new Date(), 1),
      usage_count: voucher?.usage_count?.toString(),
      discount:
        voucher?.type === "percent"
          ? (voucher?.discount * 100)?.toString()
          : voucher?.discount.toString(),
      public: voucher?.public ?? false,
      min_price: voucher?.min_price?.toString(),
      max_discount: voucher?.max_discount?.toString(),
    },
  });
  const { mutateAsync: updateVoucher, isLoading: isUpdating } =
    VoucherUseMutation.update(voucher?.voucher_id!);
  const router = useRouter();

  async function onSubmit(data: VoucherFormValues) {
    mutatingToast();
    const sendValues = {
      ...data,
      usage_count: Number(data.usage_count),
      discount:
        data.type == "fixed"
          ? Number(data.discount)
          : Number(data.discount) / 100,
      public: data?.public || false,
      max_discount: data?.max_discount ? Number(data.max_discount) : null,
      min_price: data?.min_price ? Number(data.min_price) : null,
    };

    await updateVoucher(sendValues);
    router.push("/dashboard/voucher");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="public"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Sử dung cho tất cả người dùng (công khai)</FormLabel>
                <FormDescription>
                  Nếu chọn, voucher sẽ hiển thị cho tất cả người dùng. Nếu
                  không, người dùng chỉ có thể sử dụng voucher khi có được mã.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="usage_count"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số lượng voucher được tung ra</FormLabel>
              <FormControl>
                <Input type="number" defaultValue={field.value} {...field} />
              </FormControl>
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
          name="max_discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số tiền giảm tối đa</FormLabel>
              <FormControl>
                <Input type="number" defaultValue={field.value} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="min_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số tiền tối thiểu để sử dụng voucher</FormLabel>
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
        <Button disabled={isUpdating} type="submit">
          Cập nhật thông tin
        </Button>
      </form>
    </Form>
  );
}
