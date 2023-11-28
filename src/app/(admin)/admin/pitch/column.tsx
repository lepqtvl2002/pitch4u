"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { IPitch } from "@/types/pitch";
import DropdownMenuPitch from "./dropdown-menu-action";
import { AvatarCustom } from "@/components/ui/avatar-custom";

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
          url={`/admin/pitch/${row.original.pitch_id}`}
        />
      );
    },
  },
];
