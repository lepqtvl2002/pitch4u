"use client";

import { type DataFacetedOptionsType } from "@/components/dashboard/table-facet";
import { type ColumnDef } from "@tanstack/react-table";
import RegistrationStatuses, {
  RegistrationStatus,
} from "@/enums/registrationStatuses";
import {
  registrationStatusToString,
} from "@/lib/convert";
import IRegistration from "@/types/registration";
import { registrationStatusVariant } from "@/lib/variant";

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
    header: "Người đăng ký",
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
          className={registrationStatusVariant({
            variant: status as RegistrationStatus,
          })}
        >
          {registrationStatusToString(status)}
        </p>
      );
    },
  },
];
