"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { AvatarCustom } from "@/components/ui/avatar-custom";
import { bookingStateVariant, bookingStatusToString } from "@/lib/utils";
import { BookingHistory } from "@/server/queries/user-queries";
import { format } from "date-fns";

export const columns: ColumnDef<BookingHistory>[] = [
  {
    header: " ",
    cell: (ctx) => {
      const logo = ctx.row.original?.pitch?.logo;
      const name = ctx.row.original?.pitch?.name;
      return (
        <div className="flex gap-2 items-center text-bold">
          <AvatarCustom
            className="hidden md:block"
            avatarUrl={logo as string}
            name={name}
          />
          <span className="truncate">
            {name || "Sân đã dừng hoạt động"}
          </span>
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
          className={bookingStateVariant({
            variant: status,
          })}
        >
          {bookingStatusToString(status)}
        </div>
      );
    },
  },
  {
    header: "Giờ đá",
    cell: (ctx) => {
      const startTime = ctx.row.original.booking_pitches.at(0)?.start_time;
      return (
        <div className={"text-bold"}>
          {format(
            startTime ? new Date(startTime) : new Date(),
            "HH:mm - dd/MM/yyyy"
          )}
        </div>
      );
    },
  },
];
