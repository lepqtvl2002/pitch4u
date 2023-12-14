"use client";
import { DataTable } from "@/components/dashboard/data-table";
import { stringToVoucherStatus, stringToVoucherType } from "@/lib/utils";
import { type PaginationState } from "@tanstack/react-table";
import React, { useCallback } from "react";
import { columns } from "./column";
import useDebounce from "@/hooks/use-debounce";
import DropdownMenuActions from "./dropdown-menu-actions";
import { StatisticUseQuery } from "@/server/queries/statistic-queries";
import { toast } from "@/components/ui/use-toast";

type VoucherTypes = "REDUCE_AMOUNT" | "REDUCE_PERCENT";
type VoucherStatuses = "RUNNING" | "EXPIRED";

export default function BookingTable() {
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

  const { data, isError, isFetched, refetch } = StatisticUseQuery.getBooking({
    page: pageIndex + 1,
    // sort: sort.direction,
    // sort_by: sort.direction,
  });

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
              const id = row.original.booking_id;
              const params = new URLSearchParams(
                row.original as unknown as Record<string, string>
              );
              return (
                <DropdownMenuActions
                  refetchTable={refetch}
                  id={id}
                  link={`/dashboard/booking/${id}?${params}`}
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
