"use client";

import { type DataFacetedOptionsType } from "@/components/dashboard/table-facet";
import { type ColumnDef } from "@tanstack/react-table";
import RegistrationStatuses from "@/enums/registrationStatuses";
import {
  registrationStatusToString,
  stringToRegistrationStatus,
} from "@/lib/convert";
import IRegistration from "@/types/registration";
import { cn } from "@/lib/utils";

export const registrationStatus: DataFacetedOptionsType[] = [
  {
    label: registrationStatusToString(RegistrationStatuses.Pending),
    value: RegistrationStatuses.Pending,
    icon: "clock",
  },
  {
    label: registrationStatusToString(RegistrationStatuses.Rejected),
    value: RegistrationStatuses.Rejected,
    icon: "close",
  },
  {
    label: registrationStatusToString(RegistrationStatuses.Approved),
    value: RegistrationStatuses.Approved,
    icon: "check",
  },
];

export const columns: ColumnDef<IRegistration>[] = [
  {
    header: "ID",
    cell: (ctx) => {
      const id = ctx.row.original.registration_id;
      return <div className={"text-bold"}>{id}</div>;
    },
  },
  {
    header: "Tên người đăng ký",
    cell: (ctx) => {
      const fullname = ctx.row.original.fullname;
      return <div className={"text-bold"}>{fullname}</div>;
    },
  },
  {
    header: "Địa chỉ người đăng ký",
    cell: (ctx) => {
      const address = ctx.row.original.address;
      return <div className={"text-bold"}>{address}</div>;
    },
  },
  {
    header: "Trạng thái",
    id: "status",
    accessorKey: "status",
    cell: (ctx) => {
      const status = ctx.row.original.status;
      return (
        <p
          className={cn(
            "capitalize text-white w-fit px-3 font-semibold rounded-full",
            status === "pending"
              ? "bg-yellow-400"
              : status === "denied"
              ? "bg-red-500"
              : "bg-emerald-500"
          )}
        >
          {registrationStatusToString(status)}
        </p>
      );
    },
  },
];
