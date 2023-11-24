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
import ActionsDropdownMenu from "./actions-dropdown-menu";

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
              : status === "rejected"
              ? "bg-red-500"
              : "bg-emerald-500"
          )}
        >
          {registrationStatusToString(status)}
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.registration_id;
      const fullname = row.original.fullname;
      const phone = row.original.phone;
      const email = row.original.email;
      const address = row.original.address;
      const status = row.original.status;
      const createdAt = row.original.createdAt;
      const url = `/admin/registration/${id}?fullname=${fullname}&phone=${phone}&email=${email}&address=${address}&status=${status}&createdAt=${createdAt}`;
      return (
        <ActionsDropdownMenu id={row.original.registration_id} link={url} />
      );
    },
  },
  // {
  //     header: "Code",
  //     accessorKey: "code",
  //     cell: (ctx) => {
  //         const voucher = ctx.row.original;
  //         return <div className="text-sm text-foreground/60">{voucher.code}</div>;
  //     },
  // },
  // {
  //     header: "Thời gian có hiệu lực",
  //     accessorKey: "startDateToEndDate",
  //     accessorFn: (row) =>
  //         `${new Date(row.startDate).toLocaleDateString()} - ${new Date(
  //             row.endDate
  //         ).toLocaleDateString()}`,
  // },
  // {
  //     header: "Loại",
  //     accessorKey: "type",
  //     id: "type",
  //     cell: ({ row }) => {
  //         const typeLabel = stringToVoucherType(row.original.type);
  //         // const type = vouchersTypes.find((t) => t.label === row.getValue("type"));
  //         // if (!type) return null;
  //
  //         return (
  //             <p className={cn("capitalize", voucherVariant({ variant: typeLabel }))}>
  //         {voucherTypeToString(row.original.type)}
  //         </p>
  //     );
  //     },
  // },
  // {
  //     header: "Giảm",
  //     accessorKey: "reduce",
  //     accessorFn: (row) =>
  //         row.type === "REDUCE_AMOUNT"
  //             ? row.reduceByAmount
  //             : row.reduceByPercent
  //                 ? `${row.reduceByPercent}%`
  //                 : 0,
  // },
  // {
];
