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

const profileFormSchema = z.object({
  fullname: z
    .string()
    .min(2, {
      message: "Tên phải chứa tối thiểu 3 ký tự.",
    })
    .optional(),
  gender: z.string().optional(),
  phone: z.string().max(12).min(9).optional(),
  birthday: z
    .string()
    .refine((value) => /\d{4}-\d{2}-\d{2}/.test(value), {
      message: "Ngày sinh phải có định dạng 'yyyy-mm-dd'. Ví dụ: 2000-01-30",
    })
    .optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
  pitch_ids: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

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
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      gender: userProfile?.gender || "male",
      fullname: userProfile?.fullname,
      phone: userProfile?.phone,
      birthday: userProfile?.birthday,
    },
    // mode: "onChange",
  });
  const { mutateAsync: updateStaff, isLoading: isUpdating } =
    UserUseMutation.updateStaffProfile();
  const { mutateAsync: createStaff, isLoading } =
    UserUseMutation.createNewStaff();
  const router = useRouter();

  async function onSubmit(data: ProfileFormValues) {
    mutatingToast();
    if (staffId) {
      await updateStaff({
        data,
        userId: staffId,
      });
      router.push("/dashboard/staff");
    } else {
      if (staffId) {
        await updateStaff({
          data,
          userId: staffId,
        });
        router.push("/dashboard/staff");
      } else {
        const missingInfo: string[] = [];
        if (!data.fullname) missingInfo.push("Tên đầy đủ");
        if (!data.phone) missingInfo.push("Số điện thoại");
        if (!data.gender) missingInfo.push("Giới tính");
        if (!data.birthday) missingInfo.push("Ngày sinh");
        if (!data.email) missingInfo.push("Email");
        if (!data.password) missingInfo.push("Mật khẩu");
        if (!data.pitch_ids) missingInfo.push("Nơi làm việc");

        if (missingInfo.length === 0) {
          await createStaff({
            birthday: data?.birthday || "",
            email: data?.email || "",
            fullname: data?.fullname || "",
            password: data?.password || "",
            phone: data?.phone || "",
            gender: data?.gender || "male",
            pitch_ids: [Number(data?.pitch_ids)],
          });
          router.push("/dashboard/staff");
        } else {
          toast({
            title: `Vui lòng điền đầy đủ thông tin: `,
            description: `${missingInfo.join(", ")}`,
          });
        }
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
        <FormField
          control={form.control}
          name="birthday"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ngày sinh</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Vui lòng nhập theo định dạng yyyy-mm-dd"
                  defaultValue={field.value}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!staffId && (
          <FormField
            control={form.control}
            name="pitch_ids"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nơi làm việc</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ID sân bóng nơi làm việc."
                    defaultValue={field.value}
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button disabled={isLoading || isUpdating} type="submit">
          {staffId ? "Cập nhật thông tin" : "Thêm mới nhân viên"}
        </Button>
      </form>
    </Form>
  );
}
