"use client";

import { type DataFacetedOptionsType } from "@/components/dashboard/table-facet";
import {
  activeVariant,
  cn,
  voucherActivityToString,
  voucherStatusToString,
  voucherTypeToString,
  voucherVariant,
} from "@/lib/utils";
import { type ColumnDef } from "@tanstack/react-table";
import { type IVoucher } from "@/types/voucher";
import VoucherStatuses from "@/enums/voucherStatues";
import VoucherTypes from "@/enums/voucherTypes";
import { format } from "date-fns";

export const vouchersTypeOptions: DataFacetedOptionsType[] = [
  {
    label: voucherTypeToString(VoucherTypes.Fixed),
    value: VoucherTypes.Fixed,
  },
  {
    label: voucherTypeToString(VoucherTypes.Percent),
    value: VoucherTypes.Percent,
  },
];

export const voucherStatusOptions: DataFacetedOptionsType[] = [
  {
    label: voucherStatusToString(VoucherStatuses.Running),
    value: VoucherStatuses.Running,
    icon: "clock",
  },
  {
    label: voucherStatusToString(VoucherStatuses.Stopped),
    value: VoucherStatuses.Stopped,
    icon: "close",
  },
];

export const voucherActivity: DataFacetedOptionsType[] = [
  {
    label: voucherActivityToString(true),
    value: "true",
    icon: "clock",
  },
  {
    label: voucherActivityToString(false),
    value: "false",
    icon: "close",
  },
];

export const columns: ColumnDef<IVoucher>[] = [
  {
    header: "CODE",
    cell: (ctx) => {
      const code = ctx.row.original.code;
      return <div className="text-bold max-w-[100px] break-words">{code}</div>;
    },
  },
  {
    id: "type",
    accessorKey: "type",
    header: "Loại voucher",
    cell: (ctx) => {
      const type = ctx.row.original.type;
      const discount = ctx.row.original.discount;
      return (
        <div className="flex flex-col md:flex-row justify-between">
          <div className={voucherVariant({ variant: type })}>
            {type == VoucherTypes.Fixed
              ? discount.toLocaleString()
              : `${discount * 100}%`}
          </div>
        </div>
      );
    },
  },
  {
    header: "Còn lại",
    cell: (ctx) => {
      const usageCount = ctx.row.original.usage_count;
      return <span>{usageCount?.toLocaleString()}</span>;
    },
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Trạng thái",
    cell: (ctx) => {
      const active = ctx.row.original.active;
      return (
        <div className={activeVariant({ variant: active })}>
          {active ? "Đang hoạt động" : "Đã dừng"}
        </div>
      );
    },
  },
  {
    header: "Ngày hết hạn",
    cell: (ctx) => {
      const expire_date = ctx.row.original?.expire_date;
      return (
        <div
          className={cn(
            "text-bold",
            new Date(expire_date) >= new Date() || !expire_date
              ? "text-green-500"
              : "text-red-500 line-through"
          )}
        >
          {expire_date ? format(new Date(expire_date), "dd/MM/yyyy") : "--"}
        </div>
      );
    },
  },
];
