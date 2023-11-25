"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { User } from "@/server/queries/user-queries";
import { AvatarCustom } from "@/components/ui/avatar-custom";
import {
  roleSlugToString,
  userRoleVariant,
  userStateVariant,
} from "@/lib/utils";
import { DataFacetedOptionsType } from "@/components/dashboard/table-facet";

export const userStatusOptions: DataFacetedOptionsType[] = [
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
    accessorKey: "status",
    cell: (ctx) => {
      const isSuspended = ctx.row.original.is_suspended;
      return (
        <div
          className={userStateVariant({
            variant: isSuspended ? "suspended" : "active",
          })}
        >
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
];
