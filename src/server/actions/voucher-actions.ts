import { toast } from "@/components/ui/use-toast";
import { $fetch } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export class VoucherUseMutation {
  static create = () => {
    return useMutation({
      mutationFn: (data: {
        pitch_id?: number | string;
        code: string;
        type: string;
        usage_count?: number;
        discount: number;
        expire_date?: Date;
      }) =>
        $fetch("/v1/vouchers", {
          method: "POST",
          data,
        }).then(res => res.data),
      onSuccess: () => {
        toast({
          title: "Tạo voucher thành công",
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

  static update = (voucher_id: number | string) => {
    return useMutation({
      mutationFn: (data: {
        pitch_id?: number | string;
        code?: string;
        type?: string;
        usage_count?: number;
        discount?: number;
        expire_date?: Date;
      }) =>
        $fetch(`/v1/vouchers/${voucher_id}`, {
          method: "PATCH",
          data,
        }).then(res => res.data),
      onSuccess: () => {
        toast({
          title: "Update voucher thành công",
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

  static delete = (voucher_id: number | string) => {
    return useMutation({
      mutationFn: () =>
        $fetch(`/v1/vouchers/${voucher_id}`, {
          method: "DELETE",
        }).then(res => res.data),
      onSuccess: () => {
        toast({
          title: "Xóa voucher thành công",
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
