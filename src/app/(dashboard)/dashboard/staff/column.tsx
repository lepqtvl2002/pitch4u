"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { User } from "@/server/queries/user-queries";
import { AvatarCustom } from "@/components/ui/avatar-custom";
import DropdownMenuActions from "./dropdown-menu-actions";

export const columns: ColumnDef<User>[] = [
  {
    header: " ",
    cell: (ctx) => {
      const avatarUrl = ctx.row.original.avatar;
      const name = ctx.row.original.fullname;

      return (
        <div className={"flex items-center gap-2 text-bold"}>
          <AvatarCustom avatarUrl={avatarUrl as string} name={name} />
          {name}
        </div>
      );
    },
  },
  {
    header: "Email",
    cell: (ctx) => {
      const email = ctx.row.original.email;
      return <div className={"text-bold"}>{email}</div>;
    },
  },
  {
    header: "Số điện thoại",
    cell: (ctx) => {
      const phone = ctx.row.original.phone;
      return <div className={"text-bold"}>{phone}</div>;
    },
  },
];
