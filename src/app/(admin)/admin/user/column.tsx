"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { User } from "@/server/queries/user-queries";
import { AvatarCustom } from "@/components/ui/avatar-custom";
import ActionsDropdownMenuActions from "./dropdown-menu-actions";
import { roleSlugToString, userRoleVariant } from "@/lib/utils";

export const columns: ColumnDef<User>[] = [
  {
    header: " ",
    cell: (ctx) => {
      const fullname = ctx.row.original.fullname;
      const avatarUrl = ctx.row.original.avatar;
      return (
        <div className={"flex items-center gap-2 text-bold"}>
          <AvatarCustom avatarUrl={avatarUrl as string} name={fullname} />
          {fullname}
        </div>
      );
    },
  },
  {
    header: "Vai trò",
    cell: (ctx) => {
      const role = ctx.row.original.role?.name;
      return (
        <div className={userRoleVariant({ variant: role })}>
          {roleSlugToString(role || "user")}
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
    header: "Trạng thái",
    cell: (ctx) => {
      const isSuspended = ctx.row.original.is_suspended;
      return (
        <div className={"text-bold"}>
          {isSuspended ? "Bị chặn" : "Hoạt động"}
        </div>
      );
    },
  },
  {
    header: "Số điện thoại",
    cell: (ctx) => {
      const phone = ctx.row.original.phone;
      return <div className={"text-bold"}>{phone}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <ActionsDropdownMenuActions
          id={row.original.user_id}
          link={`/admin/user/${row.original.user_id}`}
        />
      );
    },
  },
];
