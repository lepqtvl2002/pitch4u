import { toast } from "@/components/ui/use-toast";
import { $fetch } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export class ContactUseMutation {
  static sendContact = () => {
    return useMutation({
      mutationFn: (data: Record<string, any>) =>
        $fetch("/v1/contacts", {
          method: "POST",
          data,
        }),
      onSuccess: () => {
        toast({
          title: "Gửi thông tin liên hệ thành công",
          variant: "success",
          description:
            "Cảm ơn bạn đã gửi thông tin liên hệ, chúng tôi sẽ phản hồi sớm nhất có thể.",
        });
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: "Gửi thông tin thất bại",
          variant: "destructive",
          description:
            "Đã xảy ra lỗi trong lúc gửi thông tin. Vui lòng thử lại sau.",
        });
      },
    });
  };
}
