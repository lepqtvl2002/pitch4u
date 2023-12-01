"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthenticationUseMutation } from "@/server/actions/auth-actions";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  otp: z.string().length(6),
});

export function OTPForm({ className, ...props }: { className?: string }) {
  const [loading, setLoading] = React.useState(false);
  const token = JSON.parse(localStorage.getItem("REGISTER_TOKEN") ?? "");
  const { mutateAsync: verify } = AuthenticationUseMutation.verifyEmail();
  const { mutateAsync: resendVerify } =
    AuthenticationUseMutation.resendVerifyEmail();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    await verify({ code: values.otp, token });
    setLoading(true);
    router.push("/");
  }

  async function resendVerifyEmail() {
    setLoading(true);
    await resendVerify({ token });
    setLoading(true);
  }

  return (
    <div className={cn("p-10 border rounded m-auto", className)} {...props}>
      <h3 className="text-xl my-10 font-medium">
        Chỉ còn một bước để hoàn tất đăng ký
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-8">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nhập mã OTP để hoàn tất đăng ký</FormLabel>
                  <FormControl>
                    <Input
                      id="otp"
                      autoCapitalize="none"
                      autoCorrect="off"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-2">
              <Button disabled={loading}>
                {loading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Xác nhận
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={resendVerifyEmail}
                disabled={loading}
              >
                {loading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Gửi lại mã OTP
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
