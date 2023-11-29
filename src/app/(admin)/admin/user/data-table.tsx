"use client";
import { DataTable } from "@/components/dashboard/data-table";
import { type PaginationState } from "@tanstack/react-table";
import React, { useCallback } from "react";
import { columns, userStatusOptions } from "./column";
import useDebounce from "@/hooks/use-debounce";
import { UserUseQuery } from "@/server/queries/user-queries";
import { toast } from "@/components/ui/use-toast";
import ActionsDropdownMenuActions from "./dropdown-menu-actions";

type UserStatus = "suspended" | "active";

function UserTable() {
  const [statuses, setStatuses] = React.useState<UserStatus[]>(["active"]);
  const [search, setSearch] = React.useState<string>(" ");
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

  const { data, isError, isFetched, refetch } =
    statuses.length === 1
      ? UserUseQuery.getManyUsers({
          q: debouncedSearch,
          page: pageIndex + 1,
          limit: pageSize,
          is_suspended: statuses.includes("suspended") ? true : false,
        })
      : UserUseQuery.getManyUsers({
          q: debouncedSearch,
          page: pageIndex + 1,
          limit: pageSize,
        });
  console.log(data);

  const setStatusesHandler = useCallback((values: string[]) => {
    setStatuses([...(values as UserStatus[])]);
  }, []);

  const setSearchHandler = useCallback((value: string) => {
    setSearch(value);
  }, []);

  if (isError) {
    toast({
      title: "Đã có lỗi xảy ra trong khi tải dữ liệu",
      description: "Vui lòng thử lại sau",
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
                <ActionsDropdownMenuActions
                  isSuspended={!!row.original.is_suspended}
                  refetchTable={refetch}
                  id={row.original.user_id}
                  link={`/admin/user/${row.original.user_id}`}
                />
              );
            },
          },
        ]}
        data={data?.result.data}
        isLoading={!isFetched}
        pageCount={
          data?.result.total
            ? Math.floor((data?.result.total - 1) / pageSize + 1)
            : 1
        }
        setPagination={setPagination}
        pageIndex={pageIndex}
        pageSize={pageSize}
        facets={[
          {
            title: "Trạng thái",
            columnName: "status",
            options: userStatusOptions,
            onChange: setStatusesHandler,
          },
        ]}
        search={{
          placeholder: "Tìm kiếm",
          value: search || "",
          onChange: setSearchHandler,
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

export default UserTable;
