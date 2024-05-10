"use client";

import { type DataFacetedOptionsType } from "@/components/dashboard/table-facet";
import {
  bookingStateVariant,
  bookingStatusToString,
  formatMoney,
  pitchTypeVariant,
} from "@/lib/utils";
import { type ColumnDef } from "@tanstack/react-table";
import { Booking } from "@/server/queries/statistic-queries";
import { format } from "date-fns";
import { soccerPitchTypeToString } from "@/lib/convert";
import BookingStatuses from "@/enums/bookingStatuses";

export const bookingStatusOptions: DataFacetedOptionsType[] = [
  {
    label: bookingStatusToString(BookingStatuses.Pending),
    value: BookingStatuses.Pending,
    icon: "clock",
  },
  {
    label: bookingStatusToString(BookingStatuses.Canceled),
    value: BookingStatuses.Canceled,
    icon: "close",
  },
  {
    label: bookingStatusToString(BookingStatuses.Success),
    value: BookingStatuses.Success,
    icon: "check",
  },
];

export const columns: ColumnDef<Booking>[] = [
  {
    header: "Sân được đặt",
    cell: (ctx) => {
      const pitchName = ctx.row.original.pitches.name;
      return <div className={"text-bold"}>{pitchName}</div>;
    },
  },
  {
    header: "Loại sân",
    cell: (ctx) => {
      const pitchType = ctx.row.original.booking_pitches[0].sub_pitch?.type;
      return (
        <div className={pitchTypeVariant({ variant: null })}>
          {soccerPitchTypeToString(pitchType)}
        </div>
      );
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
          {format(new Date(time), "HH:mm dd/MM/yyyy")}
        </div>
      );
    },
  },
  {
    header: "Trạng thái",
    id: "status",
    accessorKey: "status",
    cell: (ctx) => {
      const status = ctx.row.original.status;
      return (
        <div className={bookingStateVariant({ variant: status })}>
          {bookingStatusToString(status)}
        </div>
      );
    },
  },
  {
    header: "Số tiền",
    cell: (ctx) => {
      const total = ctx.row.original?.total;
      return <div className={"text-bold"}>{formatMoney(total)}</div>;
    },
  },
];
