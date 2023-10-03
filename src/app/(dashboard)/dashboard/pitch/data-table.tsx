"use client";
import { DataTable } from "@/components/dashboard/data-table";
import { stringToVoucherStatus, stringToVoucherType } from "@/lib/utils";
import { type PaginationState } from "@tanstack/react-table";
import React, { useCallback } from "react";
import { columns, voucherStatus, vouchersTypes } from "./column";
import useDebounce from "@/hooks/use-debounce";
import {PostUseQuery} from "@/server/queries/post-query";

type VoucherTypes = "REDUCE_AMOUNT" | "REDUCE_PERCENT";
type VoucherStatuses = "RUNNING" | "EXPIRED";

function PitchTable() {
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

    const { data, isError, isFetched } = PostUseQuery.search({q: debouncedSearch})
    console.log(data)

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

    if (isError) return <div className="mx-auto text-red-500">Error</div>;
    return (
        <div>
            <DataTable
                columns={columns}
                data={data}
                isLoading={!isFetched}
                pageCount={data?.metadata?.count}
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
                otherButton={{
                    url: "/dashboard/voucher/create",
                    title: "Tạo mới +",
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

export default PitchTable;