"use client";
import { DataTable } from "@/components/dashboard/data-table";
import { type PaginationState } from "@tanstack/react-table";
import React, { useCallback } from "react";
import { columns } from "./column";
import useDebounce from "@/hooks/use-debounce";
import { toast } from "@/components/ui/use-toast";
import { UserUseQuery } from "@/server/queries/user-queries";
import DropdownMenuActions from "./dropdown-menu-action";

type PitchStatus = "success" | "pending" | string;
export default function BookingTable() {
  // const [statuses, setStatuses] = React.useState<PitchStatus[]>(["active"]);
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

  const { data, isError, isFetching, refetch } = UserUseQuery.getBookingHistory(
    {
      limit: pageSize,
      page: pageIndex + 1,
      name: debouncedSearch,
      sort_by: sort.columnName,
      sort: sort.direction,
    }
  );

  const setSearchHandler = useCallback((value: string) => {
    setSearch(value);
  }, []);

  // const setStatusesHandler = useCallback((values: string[]) => {
  //   setStatuses([...(values as PitchStatus[])]);
  // }, []);

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
                <DropdownMenuActions
                  refetch={refetch}
                  id={row.original.booking_id}
                  url={`/history/${row.original.booking_id}`}
                  isCancelable={
                    row.original.status === "success" &&
                    new Date(
                      row.original.booking_pitches.at(0)?.end_time ?? ""
                    ) > new Date()
                  }
                />
              );
            },
          },
        ]}
        data={data?.result.data}
        isLoading={isFetching}
        pageCount={Math.floor((data?.result.total! - 1) / pageSize + 1)}
        setPagination={setPagination}
        pageIndex={pageIndex}
        pageSize={pageSize}
        // facets={[
        //   {
        //     title: "Trạng thái",
        //     columnName: "status",
        //     options: pitchStatusOptions,
        //     onChange: setStatusesHandler,
        //   },
        // ]}
        // search={{
        //   placeholder: "Tìm kiếm",
        //   value: search || "",
        //   onChange: setSearchHandler,
        // }}
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
