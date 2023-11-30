"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { AvatarCustom } from "@/components/ui/avatar-custom";
// import { DataFacetedOptionsType } from "@/components/dashboard/table-facet";
import { userStateVariant } from "@/lib/utils";
import { BookingHistory } from "@/server/queries/user-queries";
import { format } from "date-fns";

// export const pitchStatusOptions: DataFacetedOptionsType[] = [
//   {
//     label: "Hoạt động",
//     value: "active",
//     icon: "check",
//   },
//   {
//     label: "Bị khóa",
//     value: "suspended",
//     icon: "close",
//   },
// ];
export const columns: ColumnDef<BookingHistory>[] = [
  {
    header: " ",
    cell: (ctx) => {
      const logo = ctx.row.original?.pitch?.logo;
      const name = ctx.row.original?.pitch?.name;
      return (
        <div className={"flex gap-2 items-center text-bold"}>
          <AvatarCustom avatarUrl={logo as string} name="" />
          {name || "Sân đã dừng hoạt động"}
        </div>
      );
    },
  },
  {
    header: "Trạng thái",
    accessorKey: "status",
    cell: (ctx) => {
      const status = ctx.row.original?.status;
      return (
        <div
          className={userStateVariant({
            variant: status === "success" ? "active" : "suspended",
          })}
        >
          {status === "success" ? "Thành công" : "Đã hủy"}
        </div>
      );
    },
  },
  {
    header: "Thời gian đặt sân",
    cell: (ctx) => {
      const createdAt = ctx.row.original.pitch?.createdAt;
      return (
        <div className={"text-bold"}>
          {format(createdAt ? new Date(createdAt) : new Date(), "dd/MM/yyyy")}
        </div>
      );
    },
  },
];
