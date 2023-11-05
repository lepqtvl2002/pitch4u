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
import PitchTypes from "@/enums/pitchTypes";
import { PitchUseMutation } from "@/server/actions/pitch-actions";
import { Textarea } from "../ui/textarea";

const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Tên phải chứa tối thiểu 3 ký tự.",
  }),
  phone: z.string(),
  email: z.string().email(),
  address: z.string(),
  content: z.string(),
});

type ProfileFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(contactFormSchema),
    // mode: "onChange",
  });
  const { mutateAsync } = PitchUseMutation.addSubPitch();

  async function onSubmit(data: ProfileFormValues) {
    try {
      console.log(data);
      if (true) {
        toast({
          title: "Tạo thành công",
          description: `Đã thêm thành công sân ${data.name}.`,
          variant: "success",
        });
      }
    } catch (error) {
      toast({
        title: "Hành động thất bại",
        variant: "destructive",
        description: "Đã có lỗi xảy ra, vui lòng thử lại.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ và tên</FormLabel>
              <FormControl>
                <Input
                  placeholder="Tên của bạn"
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Input
                  placeholder="Số điện thoại của bạn"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email của bạn"
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
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa chỉ</FormLabel>
              <FormControl>
                <Input
                  placeholder="Điền địa chỉ của bạn"
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
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nội dung liên hệ</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Nội dung"
                  defaultValue={field.value}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Gửi liên hệ</Button>
      </form>
    </Form>
  );
}
