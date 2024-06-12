"use client";
import { DataTable } from "@/components/dashboard/data-table";
import {
  stringToVoucherActivity,
  stringToVoucherStatus,
  stringToVoucherType,
} from "@/lib/utils";
import { type PaginationState } from "@tanstack/react-table";
import React, { useCallback } from "react";
import { columns, voucherStatus, vouchersTypeOptions } from "./column";
import { VoucherUseQuery } from "@/server/queries/voucher-queries";
import DropdownMenuActions from "./dropdown-menu-actions";
import { VoucherType } from "@/enums/voucherTypes";
import VoucherStatuses, { VoucherStatus } from "@/enums/voucherStatues";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import VoucherStatCards from "./stat-cards";
import { PlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import UserRoles from "@/enums/roles";

function VoucherTable() {
  const { data: session, status } = useSession();
  const isStaff = session?.user.userRole === UserRoles.Staff;
  const [types, setTypes] = React.useState<VoucherType[]>([]);
  const [statuses, setStatuses] = React.useState<VoucherStatus[]>([]);
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

  let params: any =
    types.length === 1
      ? {
          page: pageIndex + 1,
          limit: pageSize,
          sort: sort.direction,
          sort_by: sort.columnName,
          type: types[0],
        }
      : {
          page: pageIndex + 1,
          limit: pageSize,
          sort: sort.direction,
          sort_by: sort.columnName,
        };

  params =
    statuses.length === 1
      ? { ...params, active: statuses.at(0) == VoucherStatuses.Running }
      : params;
  const { data, isError, isFetched, refetch } =
    VoucherUseQuery.getVoucherList(params);

  const setTypesHandler = useCallback((values: string[]) => {
    const value = values.map((value) => stringToVoucherType(value));
    setTypes(value);
  }, []);

  const setStatusesHandler = useCallback((values: string[]) => {
    setStatuses(values.map((value) => stringToVoucherStatus(value)));
  }, []);

  return (
    <div className="px-2 md:container py-4 md:py-10">
      <VoucherStatCards
        data={data?.result.data ?? []}
        isLoading={!isFetched}
        isError={isError}
      />
      <div className="mx-auto py-10">
        <DataTable
          columns={
            isStaff
              ? columns
              : [
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
                ]
          }
          data={data?.result.data}
          isLoading={!isFetched || status === "loading" || !session}
          pageCount={Math.floor((data?.result.total! - 1) / pageSize) + 1}
          setPagination={setPagination}
          pageIndex={pageIndex}
          pageSize={pageSize}
          facets={[
            {
              title: "Phân loại",
              columnName: "type",
              options: vouchersTypeOptions,
              onChange: setTypesHandler,
            },
            {
              title: "Trạng thái",
              columnName: "status",
              options: voucherStatus,
              onChange: setStatusesHandler,
            },
          ]}
          headerPrefix={
            !isStaff ? (
              <Link href="/dashboard/voucher/create">
                <Button variant="secondary">
                  <span className="hidden md:inline-block">Thêm voucher</span>
                  <PlusIcon />
                </Button>
              </Link>
            ) : null
          }
          sort={{
            columnName: sort.columnName,
            direction: sort.direction,
            onChange: (columnName, direction) => {
              setSort({ columnName, direction });
            },
          }}
        />
      </div>
    </div>
  );
}

export default VoucherTable;
