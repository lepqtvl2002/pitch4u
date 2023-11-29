import { toast } from "@/components/ui/use-toast";
import { $fetch } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export class RegistrationUseMutation {
  static approve = () => {
    return useMutation({
      mutationFn: ({ registration_id }: { registration_id: string | number }) =>
        $fetch("/v1/pitches/registrations/approve", {
          method: "PATCH",
          data: {
            registration_id,
          },
        }).then((res) => res.data),
      onSuccess: () => {
        toast({
          title: "Xác nhận thông tin đăng ký thành công",
          variant: "success",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Đã xảy ra lỗi trong khi thực hiện hành động",
          description: `${
            error?.message || "Đã có lỗi xảy ra, vui lòng thử lại"
          }`,
          variant: "destructive",
        });
      },
    });
  };

  static deny = () => {
    return useMutation({
      mutationFn: ({ registration_id }: { registration_id: string | number }) =>
        $fetch("/v1/pitches/registrations/deny", {
          method: "PATCH",
          data: {
            registration_id,
          },
        }).then((res) => res.status),
      onSuccess: (data) => {
        console.log(data)
        toast({
          title: "Đã từ chối thông tin đăng ký",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Đã xảy ra lỗi trong khi thực hiện hành động",
          description: `${
            error?.message || "Đã có lỗi xảy ra, vui lòng thử lại"
          }`,
          variant: "destructive",
        });
      },
    });
  };
}
