"use client";
import { DataTable } from "@/components/dashboard/data-table";
import { type PaginationState } from "@tanstack/react-table";
import React, { useCallback } from "react";
import { columns, userRoleOptions, userStatusOptions } from "./column";
import useDebounce from "@/hooks/use-debounce";
import { UserUseQuery } from "@/server/queries/user-queries";
import { toast } from "@/components/ui/use-toast";
import ActionsDropdownMenuActions from "./dropdown-menu-actions";
import { UserRole } from "@/enums/roles";

type UserStatus = "suspended" | "active";

function UserTable() {
  const [statuses, setStatuses] = React.useState<UserStatus[]>([]);
  const [roles, setRoles] = React.useState<UserRole[]>([]);
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

  let params: Record<string, any> = {
    q: debouncedSearch,
    page: pageIndex + 1,
    limit: pageSize,
    roles,
  };

  if (statuses.length === 1) {
    params = {
      ...params,
      is_suspended: statuses.includes("suspended") ? true : false,
    };
  }

  const { data, isError, isFetched, refetch } =
    UserUseQuery.getManyUsers(params);

  const setStatusesHandler = useCallback((values: string[]) => {
    setStatuses(values as UserStatus[]);
  }, []);

  const setRolesHandler = useCallback((values: string[]) => {
    setRoles(values as UserRole[]);
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
          title: "Vai trò",
          columnName: "role",
          options: userRoleOptions,
          onChange: setRolesHandler,
        },
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
      // sort={{
      //   columnName: sort.columnName,
      //   direction: sort.direction,
      //   onChange: (columnName, direction) => {
      //     setSort({ columnName, direction });
      //   },
      // }}
    />
  );
}

export default UserTable;
