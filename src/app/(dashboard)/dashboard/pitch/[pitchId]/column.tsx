"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { ISubPitch } from "@/types/subPitch";
import { format } from "date-fns";
import { subPitchTypeToString } from "@/lib/convert";
import { activeVariant, cn, soccerPitchTypeVariant } from "@/lib/utils";
import PitchTypes from "@/enums/pitchTypes";

export const columns: ColumnDef<ISubPitch>[] = [
  {
    header: "ID",
    cell: (ctx) => {
      const id = ctx.row.id;
      return <div className={"text-bold"}>{id}</div>;
    },
  },
  {
    header: "Tên sân",
    cell: (ctx) => {
      const name = ctx.row.original.name;
      return <div className={"text-bold"}>{name}</div>;
    },
  },
  {
    header: "Loại sân",
    cell: (ctx) => {
      const type = ctx.row.original.type;
      return (
        <div className={cn(type ? "text-green" : "italic text-gray-700")}>
          {type
            ? subPitchTypeToString({
                subPitchType: type,
                pitchType: PitchTypes.Soccer,
              })
            : "Chưa cập nhật"}
        </div>
      );
    },
  },
  {
    header: "Trạng thái",
    cell: (ctx) => {
      const active = ctx.row.original.active;
      return (
        <div className={activeVariant({ variant: active })}>
          {active ? "Hoạt động" : "Không hoạt động"}
        </div>
      );
    },
  },
  {
    header: "Giá trung bình",
    cell: (ctx) => {
      const price = ctx.row.original.price;
      return <div className={"text-bold"}>{price}</div>;
    },
  },
  {
    header: "Ngày thêm",
    cell: (ctx) => {
      const createdAt = ctx.row.original.createdAt;
      return (
        <div className="text-sm text-foreground/60">
          {format(new Date(createdAt), "dd/MM/yyyy")}
        </div>
      );
    },
  },
];
