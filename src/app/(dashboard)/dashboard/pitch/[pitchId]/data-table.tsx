"use client";
import { DataTable } from "@/components/dashboard/data-table";
import { type PaginationState } from "@tanstack/react-table";
import React, { useCallback } from "react";
import { columns } from "./column";
import useDebounce from "@/hooks/use-debounce";
import { PitchUseQuery } from "@/server/queries/pitch-queries";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FileEdit } from "lucide-react";
import PitchDetailStatCards from "./stat-cards";

type VoucherTypes = "REDUCE_AMOUNT" | "REDUCE_PERCENT";
type VoucherStatuses = "RUNNING" | "EXPIRED";

function PitchDetailTable() {
    const params = useParams();
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

    const { data, isError, isFetching } = PitchUseQuery.getPitchDetail({ pitch_id: params.pitchId as string })
    console.log(data, params)

    const setSearchHandler = useCallback((value: string) => {
        setSearch(value);
    }, []);

    if (isError) return <div className="mx-auto text-red-500">Error</div>;
    return (
        <div className="flex flex-col space-y-10">
            {isFetching ? <div>Loading...</div> : <PitchDetailStatCards pitch={data?.result}/>}
            <DataTable
                columns={columns}
                data={data?.result?.sub_pitches}
                isLoading={isFetching}
                pageCount={Math.floor(data?.result?.sub_pitches.length / pageSize)}
                setPagination={setPagination}
                pageIndex={pageIndex}
                pageSize={pageSize}
                search={{
                    placeholder: "Tìm kiếm",
                    value: search || "",
                    onChange: setSearchHandler,
                }}
                otherButton={{
                    url: `/dashboard/pitch/${params.pitchId}/create`,
                    title: "Thêm sân +",
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

export default PitchDetailTable;