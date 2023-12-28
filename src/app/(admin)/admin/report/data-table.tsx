"use client";
import { DataTable } from "@/components/dashboard/data-table";
import { type PaginationState } from "@tanstack/react-table";
import React from "react";
import { columns, reportTypeOptions } from "./column";
import { toast } from "@/components/ui/use-toast";
import { ReportUseQuery } from "@/server/queries/report-queries";
import { stringToReportType } from "@/lib/convert";
import { ReportType } from "@/enums/reportTypes";

export default function ReportTable() {
  const [sort, setSort] = React.useState<{
    columnName: string;
    direction: "asc" | "desc";
  }>({
    columnName: "createdAt",
    direction: "desc",
  });
  const [types, setTypes] = React.useState<ReportType[]>([]);

  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    });

  const { data, isError, isFetched } =
    types.length === 1
      ? ReportUseQuery.getReports({
          limit: pageSize,
          page: pageIndex + 1,
          sort: sort.direction,
          sort_by: sort.columnName,
          type: types[0],
        })
      : ReportUseQuery.getReports({
          limit: pageSize,
          page: pageIndex + 1,
          sort: sort.direction,
          sort_by: sort.columnName,
        });

  const setTypesHandler = (values: string[]) => {
    setTypes(values.map((value) => stringToReportType(value)));
  };

  if (isError) {
    toast({
      title: "Đã có lỗi xảy ra trong lúc tải dữ liệu",
      description: "Vui lòng thử lại sau",
      variant: "destructive",
    });
  }
  return (
    <div>
      <DataTable
        columns={columns}
        data={data?.result.data}
        isLoading={!isFetched}
        pageCount={Math.floor((data?.result?.total - 1) / pageSize) + 1}
        setPagination={setPagination}
        pageIndex={pageIndex}
        pageSize={pageSize}
        facets={[
          {
            title: "Đối tượng bị tố cáo",
            columnName: "type",
            options: reportTypeOptions,
            onChange: setTypesHandler,
          },
        ]}
        sort={{
          columnName: sort.columnName,
          direction: sort.direction,
          onChange: (columnName, direction) => {
            setSort({ columnName, direction });
          },
        }}
      />
    </div>
  );
}
