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
import {IPost} from "@/types/post";

export const columns: ColumnDef<IPost>[] = [
    {
        header: "ID",
        cell : (ctx) => {
            const id = ctx.row.id;
            return <div className={"text-bold"}>{id}</div>
        }
    },
    {
        header: "UserID",
        cell : (ctx) => {
            const userId = ctx.row.original.userId;
            return <div className={"text-bold"}>{userId}</div>
        }
    },
    {
        header: "Title",
        cell : (ctx) => {
            const title = ctx.row.original.title;
            return <div className={"text-bold"}>{title}</div>
        }
    },
    {
        header: "Body",
        cell : (ctx) => {
            const body = ctx.row.original.body;
            return <div className={"text-bold"}>{body}</div>
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