"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { ISubPitch } from "@/types/subPitch";
import { format } from "date-fns";
import DropdownMenuSubPitch from "./dropdown-menu-action";

export const columns: ColumnDef<ISubPitch>[] = [
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
        header: "Trạng thái",
        cell: (ctx) => {
            const status = ctx.row.original.active;
            return <div className={"text-bold"}>{status ? "Hoạt động" : "Không hoạt động"}</div>
        }
    },
    {
        header: "Giá trung bình",
        cell: (ctx) => {
            const price = ctx.row.original.price;
            return <div className={"text-bold"}>{price}</div>
        }
    },
    {
        header: "Ngày thêm",
        cell: (ctx) => {
            const createdAt = ctx.row.original.createdAt;
            return <div className="text-sm text-foreground/60">{format(new Date(createdAt), "dd/MM/yyyy")}</div>;
        },
    },
    {
        header: "Ngày chỉnh sửa gần nhất",
        cell: (ctx) => {
            const updatedAt = new Date(ctx.row.original.updatedAt || "");
            const createdAt = new Date(ctx.row.original.createdAt);
            return <div className="text-sm text-foreground/60">{format(updatedAt ? updatedAt : createdAt, "dd/MM/yyyy")}</div>;
        }
    }, 
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <DropdownMenuSubPitch
                    subPitchId={row.original.subpitch_id}
                    url={`/dashboard/pitch/${row.original.pitch_id}/${row.original.subpitch_id}`}
                />
            );
        },
    },
];