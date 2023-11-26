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
import { toast } from "../ui/use-toast";
import Image from "next/image";
import { Label } from "../ui/label";
import { ImageUseMutation } from "@/server/actions/image-actions";
import { AvatarCustom } from "../ui/avatar-custom";

const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const createFormSchema = z.object({
  name: z.string().min(2, {
    message: "Tên phải chứa tối thiểu 3 ký tự.",
  }),
  address: z.string(),
  long: z.number(),
  lat: z.number(),
  thumbnail: z
    .any()
    .refine((files) => files?.length == 1, "Chỉ được chọn một file")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Kích thước file không được vượt quá ${MAX_FILE_SIZE / 1000}KB`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Chỉ nhận file .jpg, .jpeg, .png and .webp "
    ),
});

const updateFormSchema = z.object({
  name: z.string().min(2, {
    message: "Tên phải chứa tối thiểu 3 ký tự.",
  }),
  address: z.string(),
  long: z.number(),
  lat: z.number(),
  thumbnail: z
    .any()
    .nullable()
    .refine((files) => files?.length == 1, "Chỉ được chọn một file")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Kích thước file không được vượt quá ${MAX_FILE_SIZE / 1000}KB`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Chỉ nhận file .jpg, .jpeg, .png and .webp "
    ),
});

type FormProps = {
  pitch?: any;
};

export function EditPitchForm({ pitch }: FormProps) {
  const schema = pitch ? updateFormSchema : createFormSchema;
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: pitch?.name,
      address: pitch?.address,
      lat: pitch?.lat || 0,
      long: pitch?.long || 0,
    },
    // mode: "onChange",
  });
  const { mutateAsync, isLoading } = PitchUseMutation.updatePitch(
    pitch?.pitch_id
  );
  const { mutateAsync: uploadImage } = ImageUseMutation.upload();
  const route = useRouter();

  async function onSubmit(data: z.infer<typeof schema>) {
    toast({
      title: "Đang xử lý yêu cầu",
      description: "Vui lòng chờ trong giây lát",
    });
    const result = await uploadImage({ image: data.thumbnail[0] });
    let { long, lat, thumbnail, ...sendValues } = data;
    await mutateAsync({ ...sendValues, logo: result?.result || null });
    route.push(`/dashboard/pitch/${pitch?.pitch_id}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="thumbnail">Logo sân bóng</Label>
            <p className="text-sm text-muted-foreground">
              Hình ảnh tượng trưng cho sân
            </p>
            {form.formState.errors.thumbnail && (
              <p className="text-sm text-red-500">
                {form.formState.errors.thumbnail?.message?.toString()}
              </p>
            )}
          </div>
          <div className="flex flex-col items-center space-y-2">
            {form.watch("thumbnail")?.length > 0 && (
              <pre className={"my-2 border-muted px-2 py-1"}>
                <AvatarCustom
                  avatarUrl={URL.createObjectURL(
                    form.getValues("thumbnail")[0]
                  )}
                  name={form.getValues("name")}
                  className="w-60 h-60 border"
                />
              </pre>
            )}
            {pitch?.logo && !(form.watch("thumbnail")?.length > 0) && (
              <pre className="my-2 border-muted px-2 py-1">
                <AvatarCustom
                  avatarUrl={pitch?.logo}
                  name={form.getValues("name")}
                  className="w-60 h-60 border"
                />
              </pre>
            )}
            <Input
              id="thumbnail"
              placeholder="Thay đổi logo"
              type="file"
              {...form.register("thumbnail")}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên sân</FormLabel>
              <FormControl>
                <Input
                  placeholder="Tên sân bóng của bạn"
                  defaultValue={field.value}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Đây là tên hiển thị công khai của bạn.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa chỉ</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Nhập địa chỉ sân"
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
      </form>
    </Form>
  );
}
