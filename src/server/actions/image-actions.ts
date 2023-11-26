import { toast } from "@/components/ui/use-toast";
import { $globalFetch } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export class ImageUseMutation {
  static upload = () => {
    return useMutation({
      mutationFn: async ({ image }: { image: any }) => {
        const formData = new FormData();
        formData.append("image", image);
        const headers = {
          "Content-Type": "multipart/form-data", // Important for server to recognize the request as a file upload
        };
        const res = await $globalFetch(`/images`, {
          method: "POST",
          data: formData,
          headers,
        });
        console.log(res);
        return res.data;
      },
      onSuccess: () => {
        toast({
          title: "Tải ảnh lên thành công",
        });
      },
      onError: (error : any) => {
        toast({
          title: "Đã xảy ra lỗi trong khi tải ảnh lên",
          description: `${error?.message}` || `"Vui kiểm tra và thử lại"`,
          variant: "destructive",
        });
      },
    });
  };
}
