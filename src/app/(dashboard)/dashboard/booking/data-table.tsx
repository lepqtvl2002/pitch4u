"use client";
import { DataTable } from "@/components/dashboard/data-table";
import { stringToBookingStatus } from "@/lib/utils";
import { type PaginationState } from "@tanstack/react-table";
import React, { useCallback } from "react";
import { bookingStatusOptions, columns } from "./column";
import DropdownMenuActions from "./dropdown-menu-actions";
import { StatisticUseQuery } from "@/server/queries/statistic-queries";
import { toast } from "@/components/ui/use-toast";
import { BookingStatus } from "@/enums/bookingStatuses";
import { SelectPitch } from "@/components/dashboard/pitch-picker";

export default function BookingTable() {
  const [statuses, setStatuses] = React.useState<BookingStatus[]>([]);
  const [pitchId, setPitchId] = React.useState<number | undefined>();
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
    limit: pageSize,
    status: statuses.join(","),
    sort: sort.direction,
    sort_by: sort.columnName,
    pitch_id: pitchId,
  });

  const setStatusesHandler = useCallback((values: string[]) => {
    //Convert string to voucher type
    setStatuses(values.map((value) => stringToBookingStatus(value)));
  }, []);

  if (isError) {
    toast({
      title: "Có lỗi xảy ra",
      description: "Vui lòng thử lại",
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
            const id = row.original.booking_id;
            const userAvatar = row.original.user.avatar;
            const userName = row.original.user.fullname;
            const userPhone = row.original.user.phone;
            const userEmail = row.original.user.email;
            const params = new URLSearchParams(
              row.original as unknown as Record<string, string>
            );
            params.set("user_avatar", userAvatar);
            params.set("user_name", userName);
            params.set("user_phone", userPhone);
            params.set("user_email", userEmail);
            return (
              <DropdownMenuActions
                refetchTable={refetch}
                id={id}
                link={`/dashboard/booking/${id}?${params}`}
                status={row.original.status}
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
      facets={[
        {
          title: "Trạng thái",
          columnName: "status",
          options: bookingStatusOptions,
          onChange: setStatusesHandler,
        },
      ]}
      sort={{
        columnName: sort.columnName,
        direction: sort.direction,
        onChange: (columnName, direction) => {
          setSort({ columnName, direction });
        },
      }}
      headerPrefix={
        <div className="max-w-1/2">
          <SelectPitch pitchId={pitchId} setPitchId={setPitchId} />
        </div>
      }
    />
  );
}
