"use client";

import { type DataFacetedOptionsType } from "@/components/dashboard/table-facet";
import {
  cn,
  formatMoney,
  stringToVoucherType,
  voucherStatusToString,
  voucherTypeToString,
  voucherVariant,
} from "@/lib/utils";
import { type ColumnDef } from "@tanstack/react-table";
import { type IVoucher } from "@/types/voucher";
import { IPost } from "@/types/post";
import { Booking } from "@/server/queries/statistic-queries";
import { format } from "date-fns";

export const vouchersTypes: DataFacetedOptionsType[] = [
  {
    label: "Giảm giá",
    value: "REDUCE_AMOUNT",
  },
  {
    label: "Giảm theo %",
    value: "REDUCE_PERCENT",
  },
];

export const voucherStatus: DataFacetedOptionsType[] = [
  {
    label: "Đang chạy",
    value: "RUNNING",
    icon: "clock",
  },
  {
    label: "Hết hạn",
    value: "EXPIRED",
    icon: "close",
  },
];

export const columns: ColumnDef<Booking>[] = [
  {
    header: "ID",
    cell: (ctx) => {
      const booking_id = ctx.row.original.booking_id;
      return <div className={"text-bold"}>{booking_id}</div>;
    },
  },
  {
    header: "Sân bóng",
    cell: (ctx) => {
      const pitchName = ctx.row.original.pitches.name;
      return <div className={"text-bold"}>{pitchName}</div>;
    },
  },
  {
    header: "Người đặt",
    cell: (ctx) => {
      const userName = ctx.row.original.user.fullname;
      return <div className={"text-bold"}>{userName}</div>;
    },
  },
  {
    header: "Thời gian đặt",
    cell: (ctx) => {
      const time = ctx.row.original.createdAt;
      return (
        <div className={"text-bold"}>
          {format(new Date(time), "hh:mm dd/MM/yyyy")}
        </div>
      );
    },
  },
  {
    header: "Trạng thái",
    cell: (ctx) => {
      const status = ctx.row.original.status;
      return (
        <div
          className={cn(
            "text-bold text-xs text-center px-2 py-1 font-bold text-white rounded-full",
            status === "success" ? "bg-green-400" : "bg-red-500"
          )}
        >
          {status === "success" ? "Thành công" : "Đã hủy"}
        </div>
      );
    },
  },
  {
    header: "Giá",
    cell: (ctx) => {
      const total = ctx.row.original?.total;
      return <div className={"text-bold"}>{formatMoney(total)}</div>;
    },
  },
];
