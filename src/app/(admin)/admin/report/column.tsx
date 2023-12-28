"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { reportTypeVariant } from "@/lib/utils";
import ActionsDropdownMenu from "./actions-dropdown-menu";
import { IReport } from "@/types/report";
import { reportTypeToString } from "@/lib/convert";
import { DataFacetedOptionsType } from "@/components/dashboard/table-facet";
import ReportTypes from "@/enums/reportTypes";

export const reportTypeOptions: DataFacetedOptionsType[] = [
  {
    label: reportTypeToString(ReportTypes.Pitch),
    value: ReportTypes.Pitch,
    icon: "post",
  },
  {
    label: reportTypeToString(ReportTypes.User),
    value: ReportTypes.User,
    icon: "userSquare",
  },
];

export const columns: ColumnDef<IReport>[] = [
  {
    header: "Đối tượng bị tố cáo",
    id: "type",
    accessorKey: "type",
    cell: (ctx) => {
      const type = ctx.row.original.type;
      return (
        <p className={reportTypeVariant({ variant: type })}>
          {reportTypeToString(type)}
        </p>
      );
    },
  },
  {
    header: "Nguyên nhân",
    cell: (ctx) => {
      const reason = ctx.row.original.reason;
      return <div className={"text-bold"}>{reason}</div>;
    },
  },
  {
    header: "Mô tả",
    cell: (ctx) => {
      const description = ctx.row.original.description;
      return <div className={"text-bold"}>{description || "Không có"}</div>;
    },
  },
  {
    header: "Tệp đính kèm",
    cell: (ctx) => {
      const attaches = ctx.row.original.attaches;
      return (
        <div className={"text-bold"}>{attaches?.length || "Không có"}</div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.report_id;
      const params = new URLSearchParams(row.original as unknown as string[][]);
      const attaches = row.original.attaches.join(",");
      params.set("attaches", attaches);
      const url = `/admin/report/${id}?${params}`;
      return <ActionsDropdownMenu id={id} link={url} />;
    },
  },
];
