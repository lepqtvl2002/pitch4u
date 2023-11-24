import { toast } from "@/components/ui/use-toast";
import { $fetch, $globalFetch } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export class AuthenticationUseMutation {
  static register = () => {
    return useMutation({
      mutationFn: ({ email }: { email: string }) =>
        $globalFetch(`/v1/auth/register`, {
          method: "POST",
          data: { email },
        }).then((res) => res.data),
      onSuccess: () => {
        toast({
          title: "Đã gửi OTP đến địa chỉ email đăng ký",
          description: "Vui lòng nhập mã OPT để xác thực tài khoản",
        });
      },
      onError: () => {
        toast({
          title: "Đã xảy ra lỗi trong khi thực hiện đăng ký",
          description: "Vui kiểm tra và thử lại",
          variant: "destructive",
        });
      },
    });
  };

  static verifyEmail = () => {
    return useMutation({
      mutationFn: ({ code }: { code: string }) =>
        $fetch(`/v1/auth/verify-email`, {
          method: "PATCH",
          data: { code },
        }).then((res) => res.data),
      onSuccess: () => {
        toast({
          title: "Đã xác thực email thành công",
          description:
            "Chúc mừng bạn đã tạo tài khoản thành công, hãy đặt sân ngay nào",
          variant: "success",
        });
      },
      onError: () => {
        toast({
          title: "Mã OTP không đúng",
          description: "Vui kiểm tra và thử lại",
          variant: "destructive",
        });
      },
    });
  };

  static resendVerifyEmail = () => {
    return useMutation({
      mutationFn: () =>
        $fetch(`/v1/auth/resend-verify-email`, {
          method: "POST",
        }).then((res) => res.data),
      onSuccess: () => {
        toast({
          title: "Đã gửi OTP đến địa chỉ email đăng ký",
          description: "Vui lòng nhập mã OPT để xác thực tài khoản",
        });
      },
      onError: () => {
        toast({
          title: "Hành động thất bại",
          description: "Vui kiểm tra và thử lại",
          variant: "destructive",
        });
      },
    });
  };

  static setupPassword = () => {
    return useMutation({
      mutationFn: ({
        password,
        accessToken,
      }: {
        password: string;
        accessToken: string;
      }) =>
        $globalFetch(`/v1/auth/setup-password`, {
          method: "PATCH",
          data: { password },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }).then((res) => res.data),
      onSuccess: () => {
        toast({
          title: "Đã đặt mật khẩu thành công",
          description: "Mật khẩu của bạn đã được ghi nhận",
          variant: "success",
        });
      },
      onError: () => {
        toast({
          title: "Hành động thất bại",
          description: "Vui kiểm tra và thử lại",
          variant: "destructive",
        });
      },
    });
  };
}
