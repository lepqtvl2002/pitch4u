"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
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
import { toast } from "@/components/ui/use-toast";
import { UserUseMutation } from "@/server/actions/user-actions";
import { AvatarCustom } from "../ui/avatar-custom";
import { ImageUseMutation } from "@/server/actions/image-actions";
import { useState } from "react";

const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const profileFormSchema = z.object({
  fullname: z.string().min(2, {
    message: "Tên phải chứa tối thiểu 3 ký tự.",
  }),
  gender: z.string().optional(),
  phone: z.string().max(12).min(9),
  thumbnail: z
    .any()
    .nullable()
    .optional()
    .refine((files) => files?.length <= 1, "Chỉ được chọn một file")
    .refine(
      (files) => files?.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE,
      `Kích thước file không được vượt quá ${MAX_FILE_SIZE / 1000}KB`
    )
    .refine(
      (files) =>
        files?.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Chỉ nhận file .jpg, .jpeg, .png and .webp "
    ),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

type FormProps = {
  userProfile?: any;
};

export function ProfileForm({ userProfile }: FormProps) {
  console.log(userProfile);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      gender: userProfile?.gender,
      fullname: userProfile?.fullname,
      phone: userProfile?.phone,
    },
    // mode: "onChange",
  });
  const { mutateAsync: updateProfile } = UserUseMutation.updateProfile();
  const { mutateAsync: uploadImage } = ImageUseMutation.upload();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: ProfileFormValues) {
    try {
      setIsLoading(true);
      const { thumbnail, ...sendValues } = data;
      const { result: avatar } = await uploadImage({ image: thumbnail[0] });
      const result = await updateProfile(
        avatar ? { ...sendValues, avatar } : sendValues
      );
      if (result) {
        toast({
          title: "Thông tin đã được cập nhật",
          variant: "success",
        });
      }
    } catch (error: any) {
      toast({
        title: "Lỗi trong khi thực hiện hành động",
        variant: "destructive",
        description: error?.response?.data?.message
          ? error?.response?.data?.message
          : "Vui lòng điền đầy đủ thông tin",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4">
        {/* Logo */}
        <div className="grid gap-2">
          {form.formState.errors.thumbnail && (
            <p className="text-sm text-red-500">
              {form.formState.errors.thumbnail?.message?.toString()}
            </p>
          )}
          <div className="flex flex-col items-center space-y-2">
            {form.watch("thumbnail")?.length > 0 && (
              <pre className={"my-2 border-muted px-2 py-1"}>
                <AvatarCustom
                  avatarUrl={URL.createObjectURL(
                    form.getValues("thumbnail")[0]
                  )}
                  name={form.getValues("fullname")}
                  className="w-60 h-60 border"
                />
              </pre>
            )}
            {userProfile?.avatar && !(form.watch("thumbnail")?.length > 0) && (
              <pre className="my-2 border-muted px-2 py-1">
                <AvatarCustom
                  className="w-60 h-60"
                  avatarUrl={userProfile?.avatar}
                  name={userProfile?.fullname}
                />
              </pre>
            )}
            <Input
              id="thumbnail"
              placeholder="Thay đổi ảnh đại diện"
              type="file"
              {...form.register("thumbnail")}
            />
          </div>
        </div>

        <div className="flex flex-col gap-8">
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
                  Đây là tên hiển thị công khai của bạn. Nó có thể là tên thật
                  của bạn hoặc một bút danh.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giới tính</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
          <Button disabled={isLoading} type="submit">
            Cập nhật thông tin
          </Button>
        </div>
      </form>
    </Form>
  );
}
