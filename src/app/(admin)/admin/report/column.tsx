"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import ActionsDropdownMenu from "./actions-dropdown-menu";
import { IReport } from "@/types/report";

export const columns: ColumnDef<IReport>[] = [
  {
    header: "Loại",
    id: "type",
    accessorKey: "type",
    cell: (ctx) => {
      const type = ctx.row.original.type;
      return (
        <p
          className={cn(
            "capitalize text-white w-fit px-3 font-semibold rounded-full",
            type === "user"
              ? "bg-yellow-400"
              : type === "pitch"
              ? "bg-red-500"
              : "bg-emerald-500"
          )}
        >
          {type}
        </p>
      );
    },
  },
  {
    header: "Nguyên nhân",
    cell: (ctx) => {
      const reason = ctx.row.original.reason;
      return <div className={"text-bold"}>{reason}</div>;
    },
  },
  {
    header: "Mô tả",
    cell: (ctx) => {
      const description = ctx.row.original.description;
      return <div className={"text-bold"}>{description || "Không có"}</div>;
    },
  },
  {
    header: "Số tệp đính kèm",
    cell: (ctx) => {
      const attaches = ctx.row.original.attaches;
      return <div className={"text-bold"}>{attaches?.length || "Không có"}</div>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.report_id;
      const reporter_id = row.original.reporter_id;
      const reported_id = row.original?.pitch_id || row.original?.user_id
      const reason = row.original.reason;
      const description = row.original.description;
      const type = row.original.type;
      const attaches = row.original.attaches;
      const createdAt = row.original.createdAt;
      const url = `/admin/report/${id}?reporter_id=${reporter_id}&reported_id=${reported_id}&reason=${reason}&description=${description}&type=${type}&attaches=${attaches?.join(
        ","
      )}&createdAt=${createdAt}`;
      return <ActionsDropdownMenu id={id} link={url} />;
    },
  },
];
