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
import { UserUseMutation } from "@/server/actions/user-actions";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { useState } from "react";
import { mutatingToast } from "@/lib/quick-toast";
import { SelectPitch } from "./pitch-picker";
import { BirthdayPicker } from "../ui/date-picker";
import { format } from "date-fns";

const createProfileFormSchema = z.object({
  fullname: z.string().min(2, {
    message: "Tên phải chứa tối thiểu 3 ký tự.",
  }),
  gender: z.string(),
  phone: z.string().max(12).min(9),
  email: z.string().email(),
  password: z.string().min(8),
});

const updateProfileFormSchema = z.object({
  fullname: z
    .string()
    .min(2, {
      message: "Tên phải chứa tối thiểu 3 ký tự.",
    })
    .optional(),
  gender: z.string().optional(),
  phone: z.string().max(12).min(9).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
});

type FormProps = {
  userProfile?: {
    fullname: string;
    phone: string;
    gender: string;
    birthday: string;
    email: string;
    pitch_ids: string;
  };
  staffId?: string | number;
};

export function StaffProfileForm({ userProfile, staffId }: FormProps) {
  const profileFormSchema = staffId
    ? updateProfileFormSchema
    : createProfileFormSchema;
  type ProfileFormValues = z.infer<typeof profileFormSchema>;
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      gender: userProfile?.gender || "male",
      fullname: userProfile?.fullname,
      phone: userProfile?.phone,
    },
    // mode: "onChange",
  });
  const { mutateAsync: updateStaff, isLoading: isUpdating } =
    UserUseMutation.updateStaffProfile();
  const { mutateAsync: createStaff, isLoading } =
    UserUseMutation.createNewStaff();
  const router = useRouter();
  const [pitchId, setPitchId] = useState<number>();
  const [date, setDate] = useState<Date>(new Date());

  async function onSubmit(data: ProfileFormValues) {
    mutatingToast();
    if (staffId) {
      await updateStaff({
        data: { ...data, birthday: format(date, "yyyy-MM-dd") },
        userId: staffId,
      });
      router.push("/dashboard/staff");
    } else {
      if (pitchId) {
        await createStaff({
          birthday: format(date, "yyyy-MM-dd"),
          email: data?.email || "",
          fullname: data?.fullname || "",
          password: data?.password || "",
          phone: data?.phone || "",
          gender: data?.gender || "male",
          pitch_ids: [pitchId],
        });
        router.push("/dashboard/staff");
      } else {
        toast({
          title: `Vui lòng điền đầy đủ thông tin: `,
          description: `Vui lòng chọn nơi làm việc.`,
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên đầy đủ</FormLabel>
              <FormControl>
                <Input
                  placeholder="Tên của bạn"
                  defaultValue={field.value}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Đây là tên hiển thị công khai của bạn. Nó có thể là tên thật của
                bạn hoặc một bút danh. Bạn chỉ có thể thay đổi tên này một lần
                mỗi 30 ngày.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {!staffId && (
          <>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email nhân viên"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Mật khẩu tối thiểu 8 ký tự"
                      defaultValue={field.value}
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giới tính</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Giới tính của bạn" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={"male"}>Nam</SelectItem>
                  <SelectItem value={"female"}>Nữ</SelectItem>
                  <SelectItem value={"other"}>Khác</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Nhập số điện vủa bạn"
                  defaultValue={field.value}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2">
          <FormLabel>Ngày sinh</FormLabel>
          <BirthdayPicker date={date} setDate={setDate} />
        </div>
        {!staffId && (
          <div className="space-y-2">
            <FormLabel>Nơi làm việc</FormLabel>
            <SelectPitch pitchId={pitchId} setPitchId={setPitchId} />
          </div>
        )}
        <Button disabled={isLoading || isUpdating} type="submit">
          {staffId ? "Cập nhật thông tin" : "Thêm mới nhân viên"}
        </Button>
      </form>
    </Form>
  );
}
