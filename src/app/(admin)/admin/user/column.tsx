"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { User } from "@/server/queries/user-queries";
import { AvatarCustom } from "@/components/ui/avatar-custom";
import {
  isEmptyObject,
  roleSlugToString,
  userRoleVariant,
  userStateVariant,
} from "@/lib/utils";
import { DataFacetedOptionsType } from "@/components/dashboard/table-facet";
import UserRoles from "@/enums/roles";
import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";

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

export const userRoleOptions: DataFacetedOptionsType[] = [
  {
    label: roleSlugToString(UserRoles.Admin),
    value: UserRoles.Admin,
    icon: "userSquare",
  },
  {
    label: roleSlugToString(UserRoles.Staff),
    value: UserRoles.Staff,
    icon: "staff",
  },
  {
    label: roleSlugToString(UserRoles.User),
    value: UserRoles.User,
    icon: "user",
  },
  {
    label: roleSlugToString(UserRoles.SuperAdmin),
    value: UserRoles.SuperAdmin,
    icon: "admin",
  },
];

export const columns: ColumnDef<User>[] = [
  {
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
    accessorKey: "fullname",
    cell: (ctx) => {
      const fullname = ctx.row.getValue("fullname") as string;
      const avatarUrl = ctx.row.original.avatar;

      return (
        <div className={"flex items-center gap-2 text-bold"}>
          <AvatarCustom avatarUrl={avatarUrl} name={fullname} />
          {fullname}
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "role",
    header: "Vai trò",
    cell: (ctx) => {
      const role = ctx.row.original.role?.name;
      return (
        <div className={userRoleVariant({ variant: role })}>
          {role ? roleSlugToString(role) : "Không xác định"}
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className={"text-bold"}>{row.getValue("email")}</div>;
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
