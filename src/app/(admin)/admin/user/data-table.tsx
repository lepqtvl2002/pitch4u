"use client";
import { DataTable } from "@/components/dashboard/data-table";
import { stringToVoucherStatus, stringToVoucherType } from "@/lib/utils";
import { type PaginationState } from "@tanstack/react-table";
import React, { useCallback } from "react";
import { columns } from "./column";
import useDebounce from "@/hooks/use-debounce";
import { UserUseQuery } from "@/server/queries/user-queries";
import { toast } from "@/components/ui/use-toast";

type VoucherTypes = "REDUCE_AMOUNT" | "REDUCE_PERCENT";
type VoucherStatuses = "RUNNING" | "EXPIRED";

function UserTable() {
  const [types, setTypes] = React.useState<VoucherTypes[]>([]);
  const [statuses, setStatuses] = React.useState<VoucherStatuses[]>([]);
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

  const { data, isError, isFetched, refetch } = UserUseQuery.getManyUsers({
    q: debouncedSearch,
    page: pageIndex + 1,
    limit: pageSize,
  });
  console.log(data);

  const setTypesHandler = useCallback((values: string[]) => {
    //Convert string to voucher type
    const value = values.map((value) => stringToVoucherType(value));
    setTypes(value);
  }, []);

  const setStatusesHandler = useCallback((values: string[]) => {
    //Convert string to voucher type
    setStatuses(values.map((value) => stringToVoucherStatus(value)));
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
        columns={columns}
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
        // facets={[
        //     {
        //         title: "Trạng thái",
        //         columnName: "status",
        //         options: voucherStatus,
        //         onChange: setStatusesHandler,
        //     },
        //     {
        //         title: "Phân loại",
        //         columnName: "type",
        //         options: vouchersTypes,
        //         onChange: setTypesHandler,
        //     },
        // ]}
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
