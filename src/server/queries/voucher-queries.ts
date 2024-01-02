import { useQuery } from "@tanstack/react-query";
import { $fetch } from "@/lib/axios";
import { IVoucher } from "@/types/voucher";
import IPaginated from "@/types/paginated";

export class VoucherUseQuery {
  // Get voucher list
  static getVoucherList = (params?: Record<string, any>) => {
    return useQuery({
      queryKey: ["vouchers", params],
      queryFn: () =>
        $fetch(`/v1/vouchers`, {
          method: "GET",
          params,
        }).then(
          (res) =>
            res.data as {
              result: {
                data: IVoucher[];
              } & IPaginated;
            }
        ),
      cacheTime: 100,
      keepPreviousData: true,
    });
  };

  //Get vouchers for user
  static getVoucherListForUser = (query?: { pitch_id: number | string }) => {
    return useQuery({
      queryKey: ["user-vouchers", query],
      queryFn: () =>
        $fetch(`/v1/vouchers/user`, {
          method: "GET",
          params: query,
        }).then(
          (res) =>
            res.data as {
              result: IVoucher[];
            }
        ),
      cacheTime: 100,
      keepPreviousData: true,
    });
  };
}
