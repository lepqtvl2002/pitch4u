"use client";
import { DataTable } from "@/components/dashboard/data-table";
import { type PaginationState } from "@tanstack/react-table";
import React, { useCallback } from "react";
import { columns } from "./column";
import useDebounce from "@/hooks/use-debounce";
import { PitchUseQuery } from "@/server/queries/pitch-queries";
import { toast } from "@/components/ui/use-toast";
import DropdownMenuPitch from "./dropdown-menu-action";
import { pitchStatusOptions } from "@/app/(admin)/admin/pitch/column";

type PitchStatus = "suspended" | "active";
function PitchTable() {
  const [statuses, setStatuses] = React.useState<PitchStatus[]>(["active"]);
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

  const { data, isError, isFetching, refetch } =
    statuses.length === 1
      ? PitchUseQuery.getMyPitches({
          limit: pageSize,
          page: pageIndex + 1,
          name: debouncedSearch,
          sort_by: sort.columnName,
          sort: sort.direction,
          suspended: statuses.includes("suspended") ? true : false,
        })
      : PitchUseQuery.getMyPitches({
          limit: pageSize,
          page: pageIndex + 1,
          name: debouncedSearch,
          sort_by: sort.columnName,
          sort: sort.direction,
        });

  const setStatusesHandler = useCallback((values: string[]) => {
    setStatuses([...(values as PitchStatus[])]);
  }, []);

  const setSearchHandler = useCallback((value: string) => {
    setSearch(value);
  }, []);

  if (isError) {
    toast({
      title: "Đã có lỗi xảy ra khi tải dữ liệu",
      description: "Vui lòng thử lại",
      variant: "destructive",
    });
  }

  return (
    <div>
      <DataTable
        columns={[
          ...columns,
          {
            id: "actions",
            cell: ({ row }) => {
              return (
                <DropdownMenuPitch
                  refetch={refetch}
                  pitchId={row.original.pitch_id}
                  url={`/admin/pitch/${row.original.pitch_id}`}
                />
              );
            },
          },
        ]}
        data={data?.result.data}
        isLoading={isFetching}
        pageCount={Math.floor((data?.result.total - 1) / pageSize + 1)}
        setPagination={setPagination}
        pageIndex={pageIndex}
        pageSize={pageSize}
        facets={[
          {
            title: "Trạng thái",
            columnName: "status",
            options: pitchStatusOptions,
            onChange: setStatusesHandler,
          },
        ]}
        search={{
          placeholder: "Tìm kiếm",
          value: search || "",
          onChange: setSearchHandler,
        }}
        otherButton={{
          url: "/dashboard/pitch/register",
          title: "Đăng ký thêm sân +",
        }}
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

export default PitchTable;
