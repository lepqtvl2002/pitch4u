"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { IPitch } from "@/types/pitch";
import { AvatarCustom } from "@/components/ui/avatar-custom";
import { userStateVariant } from "@/lib/utils";

export const columns: ColumnDef<IPitch>[] = [
  {
    header: " ",
    cell: (ctx) => {
      const logo = ctx.row.original?.logo;
      const name = ctx.row.original?.name;
      return (
        <div className={"flex gap-2 items-center text-bold"}>
          <AvatarCustom avatarUrl={logo as string} name="" />
          {name}
        </div>
      );
    },
  },
  {
    header: " ",
    accessorKey: "rate",
    cell: (ctx) => {
      const rate = ctx.row.original?.rate;
      return (
        <div
          className="font-bold text-yellow-400"
        >
          {Number(rate).toFixed(1)}
        </div>
      );
    },
  },
  {
    header: "Trạng thái",
    accessorKey: "status",
    cell: (ctx) => {
      const isSuspended = ctx.row.original?.suspended;
      return (
        <div
          className={userStateVariant({
            variant: isSuspended ? "suspended" : "active",
          })}
        >
          {isSuspended ? "Bị khóa" : "Hoạt động"}
        </div>
      );
    },
  },
  {
    header: "Địa chỉ",
    cell: (ctx) => {
      const address = ctx.row.original.address;
      return <div className={"text-bold"}>{address}</div>;
    },
  },
];
