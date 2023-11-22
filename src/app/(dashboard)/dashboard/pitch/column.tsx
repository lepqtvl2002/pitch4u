"use client";

import { type DataFacetedOptionsType } from "@/components/dashboard/table-facet";
import { type ColumnDef } from "@tanstack/react-table";
import { IPitch } from "@/types/pitch";
import DropdownMenuPitch from "./dropdown-menu-action";

export const columns: ColumnDef<IPitch>[] = [
  {
    header: "Tên sân",
    cell: (ctx) => {
      const name = ctx.row.original?.name;
      return <div className={"text-bold"}>{name}</div>;
    },
  },
  {
    header: "Địa chỉ",
    cell: (ctx) => {
      const address = ctx.row.original.address;
      return <div className={"text-bold"}>{address}</div>;
    },
  },
  {
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
