"use client";
import { DataTable } from "@/components/dashboard/data-table";
import { type PaginationState } from "@tanstack/react-table";
import React, { useCallback, useEffect, useRef } from "react";
import { columns } from "./column";
import useDebounce from "@/hooks/use-debounce";
import { toast } from "@/components/ui/use-toast";
import { UserUseQuery } from "@/server/queries/user-queries";
import DropdownMenuActions from "./dropdown-menu-action";
import { useSearchParams } from "next/navigation";
import { PitchUseMutation } from "@/server/actions/pitch-actions";
import PaymentStatuses from "@/enums/paymentStatuses";

export default function BookingTable() {
  const searchParams = useSearchParams();
  const cancel = searchParams.get("cancel");
  const status = searchParams.get("status");
  const orderCode = searchParams.get("orderCode");
  let isCancelledRef = useRef(false);
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

  const { mutateAsync } = PitchUseMutation.cancelBookingPitch();

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

  useEffect(() => {
    const handleCancelBooking = async (bookingId: string) => {
      isCancelledRef.current = true;
      await mutateAsync({ booking_id: bookingId });
      await refetch();
    };

    if (
      cancel === "true" &&
      status === PaymentStatuses.Cancelled &&
      orderCode &&
      !isFetching &&
      !isCancelledRef.current
    ) {
      handleCancelBooking(orderCode as string);
    }
  }, [cancel, isFetching, mutateAsync, orderCode, refetch, status]);

  

  return (
    <div>
      <DataTable
        columns={[
          ...columns,
          {
            id: "actions",
            cell: ({ row }) => {
              const bookingId = row.original.booking_id;
              return (
                <DropdownMenuActions
                  refetch={refetch}
                  id={bookingId}
                  booking={row.original}
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
