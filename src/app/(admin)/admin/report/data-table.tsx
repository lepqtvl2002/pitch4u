"use client";
import { DataTable } from "@/components/dashboard/data-table";
import { type PaginationState } from "@tanstack/react-table";
import React, { useCallback } from "react";
import { columns } from "./column";
import useDebounce from "@/hooks/use-debounce";
import { toast } from "@/components/ui/use-toast";
import { ReportUseQuery } from "@/server/queries/report-queries";

export default function ReportTable() {
  const [search, setSearch] = React.useState<string>();
  const debouncedSearch = useDebounce(search);
  const [sort, setSort] = React.useState<{
    columnName: string;
    direction: "asc" | "desc";
  }>({
    columnName: "createdAt",
    direction: "desc",
  });

  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    });

  const { data, isError, isFetched } = ReportUseQuery.getReports({
    q: debouncedSearch,
    limit: pageSize,
    page: pageIndex + 1,
    sort: sort.direction,
    sort_by: sort.columnName,
  });

  const setSearchHandler = useCallback((value: string) => {
    setSearch(value);
  }, []);

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
        // search={{
        //   placeholder: "Tìm kiếm",
        //   value: search || "",
        //   onChange: setSearchHandler,
        // }}
        // sort={{
        //   columnName: sort.columnName,
        //   direction: sort.direction,
        //   onChange: (columnName, direction) => {
        //     setSort({ columnName, direction });
        //   },
        // }}
      />
    </div>
  );
}
