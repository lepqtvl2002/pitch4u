"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { IPitch } from "@/types/pitch";
import { AvatarCustom } from "@/components/ui/avatar-custom";
import { activeVariant } from "@/lib/utils";
import { DataFacetedOptionsType } from "@/components/dashboard/table-facet";
import { pitchActiveVariant, pitchTypeVariant } from "@/lib/variants";
import { Icons } from "@/components/icons";
import { pitchTypeToIcon } from "@/lib/convert";
import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import { Stars } from "@/components/ui/vote-stars";

export const pitchStatusOptions: DataFacetedOptionsType[] = [
  {
    label: "Hoạt động",
    value: "active",
    icon: "check",
  },
  {
    label: "Bị khóa",
    value: "suspended",
    icon: "close",
  },
];
export const columns: ColumnDef<IPitch>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (ctx) => {
      const logo = ctx.row.original?.logo;
      const name = ctx.row.original?.name;
      return (
        <div className={"flex gap-2 items-center text-bold line-clamp-3"}>
          <AvatarCustom avatarUrl={logo as string} name={name} />
          {name}
        </div>
      );
    },
  },
  {
    header: "Loại",
    accessorKey: "type",
    cell: (ctx) => {
      const type = ctx.row.original?.type;
      const Icon = Icons[pitchTypeToIcon(type)];
      return (
        <div className={pitchTypeVariant({ variant: type })}>
          <Icon className="w-4 h-4" />
        </div>
      );
    },
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rating
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "rate",
    cell: (ctx) => {
      const rate = ctx.row.original?.rate;
      return (
        <div>
          {Number(rate) && Number(rate) > 0 ? (
            <Stars
              rating={Number(rate)}
              className={"text-yellow-400"}
              size={20}
            />
          ) : (
            <span className="italic">Chưa có đánh giá</span>
          )}
        </div>
      );
    },
  },
  {
    id: "status",
    header: "Trạng thái",
    accessorKey: "status",
    cell: (ctx) => {
      const isSuspended = ctx.row.original.suspended;
      return (
        <div
          className={activeVariant({
            variant: !isSuspended,
          })}
        >
          {isSuspended ? "Bị khóa" : "Hoạt động"}
        </div>
      );
    },
  },
  {
    id: "active",
    header: "Hoạt động",
    accessorKey: "active",
    cell: (ctx) => {
      const active = ctx.row.original.active;
      return (
        <div
          className={pitchActiveVariant({
            variant: active,
          })}
        >
          {active ? "Bình thường" : "Tạm dừng"}
        </div>
      );
    },
  },
  {
    header: "Địa chỉ",
    cell: (ctx) => {
      const address = ctx.row.original.address;
      return <div className="text-bold line-clamp-3">{address}</div>;
    },
  },
];
