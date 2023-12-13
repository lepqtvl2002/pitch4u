"use client";
import { DataTable } from "@/components/dashboard/data-table";
import { stringToVoucherStatus, stringToVoucherType } from "@/lib/utils";
import { type PaginationState } from "@tanstack/react-table";
import React, { useCallback } from "react";
import { columns, voucherStatus, vouchersTypes } from "./column";
import useDebounce from "@/hooks/use-debounce";
import { VoucherUseQuery } from "@/server/queries/voucher-queries";
import DropdownMenuActions from "./dropdown-menu-actions";
import { toast } from "@/components/ui/use-toast";

type VoucherTypes = "REDUCE_AMOUNT" | "REDUCE_PERCENT";
type VoucherStatuses = "RUNNING" | "EXPIRED";

function VoucherTable() {
  const [types, setTypes] = React.useState<VoucherTypes[]>([]);
  const [statuses, setStatuses] = React.useState<VoucherStatuses[]>([]);
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

  const { data, isError, isFetched, refetch } =
    VoucherUseQuery.getVoucherList();

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
      title: "Có lỗi xảy ra",
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
              const voucher_id = row.original.voucher_id;
              const params = new URLSearchParams(
                row.original as unknown as Record<string, string>
              );
              return (
                <DropdownMenuActions
                  refetchTable={refetch}
                  id={voucher_id}
                  link={`/dashboard/voucher/${voucher_id}?${params}`}
                />
              );
            },
          },
        ]}
        data={data?.result.data}
        isLoading={!isFetched}
        pageCount={Math.floor((data?.result.total! - 1) / pageSize) + 1}
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
        otherButton={{
          url: "/dashboard/voucher/create",
          title: "Tạo mới +",
        }}
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

export default VoucherTable;
