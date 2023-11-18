"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PitchUseMutation } from "@/server/actions/pitch-actions";
import { User, UserUseQuery } from "@/server/queries/user-queries";

const formSchema = z.object({
  card_id: z.string(),
  fullname: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  address: z.string().min(2).max(50),
  phone: z.string().min(2).max(50),
  pitch_name: z.string().min(3),
  pitch_address: z.string().min(8),
  lat: z.number(),
  long: z.number(),
});

export function PitchRegisterForm({
  className,
  user,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { user?: User }) {
  const [loading, setLoading] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const { mutateAsync } = PitchUseMutation.pitchRegister();
  function goNextStep() {
    setStep((pre) => pre + 1);
  }

  function goPrevStep() {
    setStep((pre) => pre - 1);
  }

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      card_id: "999999",
      fullname: user?.fullname,
      email: user?.email,
      phone: user?.phone,
      lat: 0,
      long: 0,
    },
    mode: "onChange",
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setLoading(true);
    console.log(values);
    await mutateAsync(values);
    setLoading(false);
  }
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Đăng ký {step === 3 && "sân"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {step === 3
            ? "Bạn có thể bỏ qua bước này và thực hiện đăng ký sân sau khi tài khoản được duyệt"
            : "Điền thông tin cần thiết vào bên dưới để đăng ký làm chủ sân"}
        </p>
      </div>
      <div className={cn("grid gap-6", className)} {...props}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-8">
              <div className="grid gap-2">
                {step === 1 && (
                  <>
                    <FormField
                      control={form.control}
                      name="fullname"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              id="fullname"
                              type="text"
                              placeholder="Tên chủ sân"
                              autoComplete="name"
                              disabled={loading}
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
                          <FormControl>
                            <Input
                              id="email"
                              placeholder="Địa chỉ email"
                              type="email"
                              autoCapitalize="none"
                              autoComplete="email"
                              autoCorrect="off"
                              disabled={loading}
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
                          <FormControl>
                            <Input
                              id="address"
                              placeholder="Địa chỉ của chủ sân"
                              type="address"
                              autoCapitalize="none"
                              autoComplete="address"
                              autoCorrect="off"
                              disabled={loading}
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
                          <FormControl>
                            <Input
                              id="phone"
                              type="text"
                              placeholder="Số điện thoại chủ sân"
                              autoComplete="phone"
                              disabled={loading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                {step === 2 && (
                  <>
                    <FormField
                      control={form.control}
                      name="pitch_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              id="pitch-name"
                              placeholder="Tên sân"
                              type="text"
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
                    <FormField
                      control={form.control}
                      name="pitch_address"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              id="pitch-address"
                              type="text"
                              placeholder="Địa chỉ sân"
                              autoComplete="address"
                              disabled={loading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>

              <div className="grid gap-2">
                {step === 1 ? (
                  <Button
                    disabled={
                      loading ||
                      form.getValues().email === "" ||
                      form.getValues().fullname === "" ||
                      form.getValues().address === "" ||
                      form.getValues().phone === ""
                    }
                    type="button"
                    onClick={goNextStep}
                  >
                    Tiếp tục
                  </Button>
                ) : (
                  <Button
                    disabled={
                      loading ||
                      !form.getValues().address ||
                      !form.getValues().phone
                    }
                    type="submit"
                  >
                    {loading && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Đăng ký ngay
                  </Button>
                )}
                {step !== 1 && (
                  <Button
                    variant="outline"
                    disabled={loading}
                    type="button"
                    onClick={goPrevStep}
                  >
                    {loading && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Quay lại
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </div>
      <p
        className={cn(
          "px-8 text-center text-sm text-muted-foreground hidden",
          step === 1 && "block"
        )}
      >
        Bằng cách nhấp vào tiếp tục, bạn đồng ý với{" "}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          Điều khoản dịch vụ
        </Link>{" "}
        và{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-4 hover:text-primary"
        >
          Chính sách quyền riêng tư
        </Link>{" "}
        của chúng tôi.
      </p>
    </div>
  );
}

export default function CreatePitchPage() {
  const { data, isLoading } = UserUseQuery.getProfile();
  if (isLoading) return <>Loading...</>;
  return (
    <div className="p-10">
      <PitchRegisterForm user={data?.result} />
    </div>
  );
}
