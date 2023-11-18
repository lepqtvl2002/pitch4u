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
        }),
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
}
