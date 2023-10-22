"use client";

import { type DataFacetedOptionsType } from "@/components/dashboard/table-facet";
import { type ColumnDef } from "@tanstack/react-table";
import { IPost } from "@/types/post";
import { IPitch } from "@/types/pitch";
import DropdownMenuPitch from "./dropdown-menu-action";

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

export const columns: ColumnDef<IPitch>[] = [
    {
        header: "ID",
        cell: (ctx) => {
            const id = ctx.row.id;
            return <div className={"text-bold"}>{id}</div>
        }
    },
    {
        header: "Tên sân",
        cell: (ctx) => {
            const name = ctx.row.original.name;
            return <div className={"text-bold"}>{name}</div>
        }
    },
    {
        header: "Địa chỉ",
        cell: (ctx) => {
            const address = ctx.row.original.address;
            return <div className={"text-bold"}>{address}</div>
        }
    }
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
    , {
        id: "actions",
        cell: ({ row }) => {
            return (
                <DropdownMenuPitch
                    pitchId={row.original.pitch_id}
                    url={`/dashboard/pitch/${row.original.pitch_id}`}
                />
            );
        },
    },
];