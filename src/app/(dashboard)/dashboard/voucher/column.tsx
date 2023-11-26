"use client";

import { type DataFacetedOptionsType } from "@/components/dashboard/table-facet";
import {
  cn,
  stringToVoucherType,
  voucherStatusToString,
  voucherTypeToString,
  voucherVariant,
} from "@/lib/utils";
import { type ColumnDef } from "@tanstack/react-table";
import { type IVoucher } from "@/types/voucher";
import { IPost } from "@/types/post";

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

export const columns: ColumnDef<IVoucher>[] = [
  {
    header: "ID",
    cell: (ctx) => {
      const id = ctx.row.id;
      return <div className={"text-bold"}>{id}</div>;
    },
  },
  {
    header: "CODE",
    cell: (ctx) => {
      const code = ctx.row.original.code;
      return <div className={"text-bold"}>{code}</div>;
    },
  },
  {
    header: "Loại",
    cell: (ctx) => {
      const type = ctx.row.original.type;
      return <div className={"text-bold"}>{type}</div>;
    },
  },
  {
    header: "Giảm",
    cell: (ctx) => {
      const discount = ctx.row.original.discount;
      return <div className={"text-bold"}>{discount}</div>;
    },
  },
  {
    header: "Trạng thái",
    cell: (ctx) => {
      const active = ctx.row.original.active;
      return (
        <div
          className={cn(
            "text-bold text-xs text-center px-2 py-1 font-bold text-white rounded-full",
            active ? "bg-green-400" : "bg-red-500"
          )}
        >
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
        <div className={"text-bold"}>
          {expire_date
            ? expire_date.toString()
            : new Date().toLocaleDateString()}
        </div>
      );
    },
  },
  // {
  //     header: "Code",
  //     accessorKey: "code",
  //     cell: (ctx) => {
  //         const voucher = ctx.row.original;
  //         return <div className="text-sm text-foreground/60">{voucher.code}</div>;
  //     },
  // },
  // {
  //     header: "Thời gian có hiệu lực",
  //     accessorKey: "startDateToEndDate",
  //     accessorFn: (row) =>
  //         `${new Date(row.startDate).toLocaleDateString()} - ${new Date(
  //             row.endDate
  //         ).toLocaleDateString()}`,
  // },
  // {
  //     header: "Loại",
  //     accessorKey: "type",
  //     id: "type",
  //     cell: ({ row }) => {
  //         const typeLabel = stringToVoucherType(row.original.type);
  //         // const type = vouchersTypes.find((t) => t.label === row.getValue("type"));
  //         // if (!type) return null;
  //
  //         return (
  //             <p className={cn("capitalize", voucherVariant({ variant: typeLabel }))}>
  //         {voucherTypeToString(row.original.type)}
  //         </p>
  //     );
  //     },
  // },
  // {
  //     header: "Giảm",
  //     accessorKey: "reduce",
  //     accessorFn: (row) =>
  //         row.type === "REDUCE_AMOUNT"
  //             ? row.reduceByAmount
  //             : row.reduceByPercent
  //                 ? `${row.reduceByPercent}%`
  //                 : 0,
  // },
  // {
  //     header: "Trạng thái",
  //     id: "status",
  //     accessorKey: "endDate",
  //     cell: (ctx) => {
  //         const status =
  //             new Date(ctx.row.original.endDate) < new Date() ? "EXPIRED" : "RUNNING";
  //         return (
  //             <p className={cn("capitalize")}>{voucherStatusToString(status)}</p>
  //     );
  //     },
  // },
  // {
  //     id: "actions",
  //     cell: ({ row }) => {
  //         return (
  //             <DropdownMenuVoucher
  //                 voucherId={row.original._id}
  //         url={`/dashboard/voucher/${row.original._id}`}
  //         />
  //     );
  //     },
  // },
];
