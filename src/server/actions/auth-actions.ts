import { toast } from "@/components/ui/use-toast";
import { $globalFetch } from "@/lib/axios";
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
      onError: (error: any) => {
        toast({
          title:
            error?.response?.status === 400
              ? "Email đã tồn tại"
              : "Đã xảy ra lỗi trong khi thực hiện đăng ký",
          description: error?.response?.data?.message
            ? error?.response?.data?.message
            : "Vui kiểm tra và thử lại",
          variant: "destructive",
        });
      },
    });
  };

  static loginGoogle = () => {
    return useMutation({
      mutationFn: ({ token_email }: { token_email: string }) =>
        $globalFetch(`/v1/auth/login-email`, {
          method: "POST",
          data: { token_email },
        }).then((res) => res.data),
      onSuccess: (a) => {
        toast({
          title: "Đăng nhập với google thành công",
          description:
            a.status === 200
              ? "Chào mừng bạn trở lại"
              : "Chào mừng bạn đến với Pitch4U",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Đã xảy ra lỗi trong khi thực hiện đăng ký",
          description: error?.response?.data?.message
            ? error?.response?.data?.message
            : "Vui kiểm tra và thử lại",
          variant: "destructive",
        });
      },
    });
  };

  static verifyEmail = () => {
    return useMutation({
      mutationFn: ({ code, token }: { code: string; token: string }) =>
        $globalFetch(`/v1/auth/verify-email`, {
          method: "PATCH",
          data: { code },
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
      mutationFn: ({ token }: { token: string }) =>
        $globalFetch(`/v1/auth/resend-verify-email`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
