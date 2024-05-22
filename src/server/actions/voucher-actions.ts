import { REQUEST_URLS_CURRENT } from "@/config/request-urls";
import { $fetch } from "@/lib/axios";
import { errorToastWithCode, successToast } from "@/lib/quick-toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

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
        $fetch(REQUEST_URLS_CURRENT.VOUCHERS, {
          method: "POST",
          data,
        }).then((res) => res.data),
      onSuccess: () => {
        successToast({ actionName: "Tạo voucher" });
      },
      onError: (error: AxiosError) => {
        errorToastWithCode({
          actionName: "Tạo voucher",
          code: error.response?.status,
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
        $fetch(`${REQUEST_URLS_CURRENT.VOUCHERS}/${voucher_id}`, {
          method: "PATCH",
          data,
        }).then((res) => res.data),
      onSuccess: () => {
        successToast({ actionName: "Cập nhật voucher" });
      },
      onError: (error: AxiosError) => {
        errorToastWithCode({
          actionName: "Cập nhật voucher",
          code: error.response?.status,
        });
      },
    });
  };

  static delete = (voucher_id: number | string) => {
    return useMutation({
      mutationFn: () =>
        $fetch(`${REQUEST_URLS_CURRENT.VOUCHERS}/${voucher_id}`, {
          method: "DELETE",
        }).then((res) => res.data),
      onSuccess: () => {
        successToast({ actionName: "Xóa voucher" });
      },
      onError: (error: AxiosError) => {
        errorToastWithCode({
          actionName: "Xóa voucher",
          code: error.response?.status,
        });
      },
    });
  };
}
