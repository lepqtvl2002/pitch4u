"use client";
import { DataTable } from "@/components/dashboard/data-table";
import { type PaginationState } from "@tanstack/react-table";
import React, { useCallback } from "react";
import { columns } from "./column";
import useDebounce from "@/hooks/use-debounce";
import { UserUseQuery } from "@/server/queries/user-queries";
import { toast } from "@/components/ui/use-toast";
import DropdownMenuActions from "./dropdown-menu-actions";

function StaffTable() {
  const [search, setSearch] = React.useState<string>("");
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

  const { data, isError, isLoading, refetch } = UserUseQuery.getManyStaffs({
    q: debouncedSearch,
  });

  const setSearchHandler = useCallback((value: string) => {
    setSearch(value);
  }, []);

  if (isError) {
    toast({
      title: "Đã xảy ra lỗi trong khi tải dữ liệu",
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
              const id = row.original.user_id;
              const params = new URLSearchParams(
                row.original as unknown as string[][]
              );
              const link = `/dashboard/staff/${id}?${params}`;
              return (
                <DropdownMenuActions id={id} link={link} refetch={refetch} />
              );
            },
          },
        ]}
        data={data?.result}
        isLoading={isLoading}
        pageCount={1}
        setPagination={setPagination}
        pageIndex={pageIndex}
        pageSize={pageSize}
        search={{
          placeholder: "Tìm kiếm",
          value: search || "",
          onChange: setSearchHandler,
        }}
        otherButton={{
          url: "/dashboard/staff/create",
          title: "Thêm nhân viên +",
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

export default StaffTable;
