"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn, useSession } from "next-auth/react";
import { Facebook } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "../ui/use-toast";
import { AuthenticationUseMutation } from "@/server/actions/auth-actions";
import { useRouter, useSearchParams } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "login" | "register";
}

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

export function UserAuthForm({ className, type, ...props }: UserAuthFormProps) {
  const { update } = useSession();
  const [loading, setLoading] = React.useState(false);
  const { mutateAsync: register } = AuthenticationUseMutation.register();
  const { mutateAsync: setupPassword } =
    AuthenticationUseMutation.setupPassword();
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (type === "login") {
      try {
        setLoading(true);
        await signIn("credentials", {
          email: values.email,
          password: values.password,
        })
          .then((res) => {
            console.log(res);
            if (res?.error) {
              toast({
                title: "Đăng nhập thất bại",
                description: "Email hoặc mật khẩu không đúng",
                variant: "destructive",
              });
            } else {
              const callbackUrl = searchParams.get("callbackUrl") || "/";
              toast({
                title: "Đăng nhập thành công",
                description: "Chào mừng bạn trở lại",
                variant: "success",
              });
              router.push(callbackUrl);
            }
          })
          .catch((error) => {
            console.log("Error while login >>>", error);
            toast({
              title: "Đăng nhập thất bại",
              description: "Đã có lỗi xảy ra, vui lòng thử lại sau",
              variant: "destructive",
            });
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (error: any) {
        toast({
          title: "Đăng nhập thất bại",
          description: "Đã có lỗi xảy ra, vui lòng thử lại sau",
          variant: "destructive",
        });
      }
    } else {
      // register
      try {
        setLoading(true);
        const result = await register({ email: values.email });
        await setupPassword({
          password: values.password,
          accessToken: result?.tokens?.access?.token,
        });
        localStorage.setItem(
          "REGISTER_TOKEN",
          JSON.stringify(result?.tokens?.access?.token)
        );
        router.push("/register/otp");
      } catch (error) {
        console.log("Error while register:", error);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {type === "login" ? "Đăng nhập" : "Đăng ký"}
        </h1>
        <p className="text-sm text-muted-foreground">
          Điền thông tin cần thiết vào bên dưới để{" "}
          {type === "login" ? "đăng nhập" : "đăng ký"}
        </p>
      </div>
      <div className={cn("grid gap-6", className)} {...props}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="name@example.com"
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
              </div>
              <div className="grid gap-1">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          autoComplete="password"
                          disabled={loading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {type === "login" ? (
                <div className="flex justify-between py-2">
                  <span className="text-sm text-muted-foreground">
                    Chưa có tài khoản?
                  </span>
                  <Link href="/register" className="text-sm">
                    Đăng ký ngay
                  </Link>
                </div>
              ) : (
                <div className="flex justify-between py-2">
                  <span className="text-sm text-muted-foreground">
                    Đã có tài khoản?
                  </span>
                  <Link href="/login" className="text-sm">
                    Đăng nhập ngay
                  </Link>
                </div>
              )}

              <Button disabled={loading}>
                {loading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                {type === "login" ? "Đăng nhập" : "Đăng ký"}
              </Button>
            </div>
          </form>
        </Form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className={"flex justify-between flex-col space-y-2"}>
          <Button
            onClick={() => signIn("google")}
            variant="outline"
            type="button"
            disabled={loading}
          >
            <Icons.google className="mr-2 h-4 w-4" /> Google
          </Button>
          <Button
            onClick={() => signIn("facebook")}
            variant="outline"
            type="button"
            disabled={loading}
          >
            <Facebook className="mr-2 h-4 w-4" /> Facebook
          </Button>
        </div>
      </div>
      <p className="px-8 text-center text-sm text-muted-foreground">
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
