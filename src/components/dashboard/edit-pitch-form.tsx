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
import { useState } from "react";
import { toast } from "../ui/use-toast";

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Tên phải chứa tối thiểu 3 ký tự.",
  }),
  logo: z.string().optional().nullable(),
  address: z.string(),
  long: z.number(),
  lat: z.number(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

type FormProps = {
  pitch?: any;
};

export function EditPitchForm({ pitch }: FormProps) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: pitch?.name,
      logo: pitch?.logo,
      address: pitch?.address,
      lat: pitch?.lat || 0,
      long: pitch?.long || 0,
    },
    // mode: "onChange",
  });
  const { mutateAsync } = PitchUseMutation.updatePitch(pitch?.pitch_id);
  const route = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);
    toast({
      title: "Đang xử lý yêu cầu",
      description: "Vui lòng chờ trong giây lát",
    });
    const { logo, long, lat, ...sendValues } = data;
    await mutateAsync(sendValues);
    setIsLoading(false);
    route.push("/dashboard/pitch");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
