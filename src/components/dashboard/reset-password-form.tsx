"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { UserUseMutation } from "@/server/actions/user-actions";
import { toast } from "../ui/use-toast";

const formSchema = z.object({
  password: z.string().min(8).max(50),
  newPassword: z.string().min(8).max(50),
});

export function ResetPasswordForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutateAsync } = UserUseMutation.resetPassword();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await mutateAsync({
        password: values.password,
        new_password: values.newPassword,
      });
      toast({
        title: "Thành công",
        description: "Đổi mật khẩu thành công",
        variant: "success",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Thất bại",
        description: "Đổi mật khẩu thất bại",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu cũ</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>
                Mật khẩu bạn đang dùng để đăng nhập
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu mới</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>Mật khẩu mới của bạn</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Đặt lại mật khẩu</Button>
      </form>
    </Form>
  );
}
