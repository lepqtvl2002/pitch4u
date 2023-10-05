"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "../ui/use-toast";
import { Label } from "../ui/label";
import { PitchUseMutation } from "@/server/actions/pitch-actions";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  fullname: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  address: z.string().min(2).max(50),
  phone: z.string().min(2).max(50),
  pitchList: z
    .array(
      z.object({
        pitch_name: z.string().min(2).max(50),
        pitch_address: z.string().min(2).max(50),
      })
    )
    .optional(),
  lat: z.number(),
  long: z.number(),
});

export function PitchRegisterForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [loading, setLoading] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const { mutateAsync } = PitchUseMutation.pitchRegister();
  const router = useRouter();

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
      email: "",
      lat: 16.0842863,
      long: 108.1483191,
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    name: "pitchList",
    control: form.control,
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      setLoading(true);

      const res = await mutateAsync({
        card_id: "99999999",
        fullname: "Ho Duc Hoang",
        email: "duchoang206h@gmail.com",
        phone: "93939393",
        address:
          "86 Nguyễn Chánh, Hoà Khánh Bắc, Liên Chiểu, Đà Nẵng 550000, Việt Nam",
        pitch_name: "Sân Bóng Đá Nguyễn Chánh",
        pitch_address:
          "86 Nguyễn Chánh, Hoà Khánh Bắc, Liên Chiểu, Đà Nẵng 550000, Việt Nam",
        lat: 16.0842863,
        long: 108.1483191,
      });

      setLoading(false);

      console.log(res);
      if (res?.error) {
        toast({
          title: "Đăng ký thất bại",
          description: "Vui lòng điền chính xác",
          variant: "destructive",
        });
      } else {
        router.push("/pitch/register-success");
      }
    } catch (error: any) {
      setLoading(false);
      alert("Đăng ký thất bại, đã có lỗi xảy ra, vui lòng thử lại sau.");
    }
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
                  </>
                )}
                {step === 2 && (
                  <>
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
              </div>
              {step === 3 && (
                <div className="grid gap-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="grid gap-2">
                      <div className="flex justify-between items-center">
                        <FormLabel className={cn("text-lg")}>
                          Sân {index + 1}
                        </FormLabel>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            remove(index);
                          }}
                        >
                          <Icons.trash className="h-4 w-4" />
                        </Button>
                      </div>
                      <FormField
                        control={form.control}
                        name={`pitchList.${index}.pitch_name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder={`Tên sân ${index + 1}`}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`pitchList.${index}.pitch_address`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder={`Địa chỉ sân ${index + 1}`}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() =>
                      append({ pitch_name: "", pitch_address: "" })
                    }
                  >
                    Thêm sân
                  </Button>
                </div>
              )}

              <div className="grid gap-2">
                <Button
                  disabled={loading}
                  type={step === 1 ? "button" : "submit"}
                  onClick={() => {
                    const currentValues = form.getValues();
                    if (step === 1) {
                      if (currentValues.fullname && currentValues.email) {
                        goNextStep();
                      } else {
                        toast({
                          title: "Vui lòng điền đầy đủ thông tin",
                          description: "Điền đầy đủ thông tin để tiếp tục",
                        });
                      }
                    } else {
                      console.log(currentValues);
                    }
                  }}
                >
                  {loading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {step === 1 ? "Tiếp tục" : "Đăng ký ngay"}
                </Button>
                {step === 2 && (
                  <Button
                    variant="outline"
                    disabled={loading}
                    type="button"
                    onClick={goNextStep}
                  >
                    {loading && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Đăng ký thêm danh sách sân
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
