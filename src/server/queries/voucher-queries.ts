import { useQuery } from "@tanstack/react-query";
import { $fetch } from "@/lib/axios";
import { IVoucher } from "@/types/voucher";
import IPaginated from "@/types/paginated";
import { config } from "./commom";
import { REQUEST_URLS_CURRENT } from "@/config/request-urls";

export class VoucherUseQuery {
  // Get voucher list
  static getVoucherList = (params?: Record<string, any>) => {
    return useQuery({
      queryKey: ["vouchers", params],
      queryFn: async () =>
        (
          await $fetch(REQUEST_URLS_CURRENT.VOUCHERS, {
            params,
          })
        ).data as {
          result: {
            data: IVoucher[];
          } & IPaginated;
        },
      ...config,
    });
  };

  //Get vouchers for user
  static getVoucherListForUser = (query?: {
    pitch_id: number | string;
    code?: string;
  }) => {
    return useQuery({
      queryKey: ["user-vouchers", query],
      queryFn: async () =>
        (
          await $fetch(REQUEST_URLS_CURRENT.VOUCHERS_USER, {
            params: query,
          })
        ).data as {
          result: IVoucher[];
        },
      ...config,
    });
  };
}
