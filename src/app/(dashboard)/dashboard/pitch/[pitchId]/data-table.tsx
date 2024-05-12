"use client";
import { DataTable } from "@/components/dashboard/data-table";
import { type PaginationState } from "@tanstack/react-table";
import React, { useCallback } from "react";
import { columns } from "./column";
import { PitchUseQuery } from "@/server/queries/pitch-queries";
import { useParams } from "next/navigation";
import PitchDetailStatCards from "./stat-cards";
import { toast } from "@/components/ui/use-toast";
import DropdownMenuSubPitch from "./dropdown-menu-action";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

function PitchDetailTable() {
  const params = useParams();
  const [search, setSearch] = React.useState<string>();
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

  const { data, isError, isFetching, refetch } = PitchUseQuery.getPitchDetail({
    pitch_id: params.pitchId as string,
  });

  const setSearchHandler = useCallback((value: string) => {
    setSearch(value);
  }, []);

  if (isError) {
    toast({
      title: "Đã xảy ra lỗi trong khi tải dữ liệu",
      description: "Vui lòng thử lại sau",
      variant: "destructive",
    });
  }
  return (
    <div className="flex flex-col space-y-4 md:space-y-10">
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <PitchDetailStatCards pitch={data?.result} />
      )}
      <DataTable
        columns={[
          ...columns,
          {
            id: "actions",
            cell: ({ row }) => {
              const subPitchParams = new URLSearchParams(
                row.original as unknown as string[][]
              );
              const specialPrices = row.original.price_by_hour;
              const timeFrames: number[] = [];
              const prices: number[] = [];
              specialPrices?.forEach((frame) => {
                timeFrames.push(frame.time_frame[0]);
                prices.push(frame.price);
              });
              const openAt = data?.result?.config?.open_at;
              const closeAt = data?.result?.config?.close_at;
              const parentPitchName = data?.result?.name;

              subPitchParams.set("open_at", openAt);
              subPitchParams.set("close_at", closeAt);
              subPitchParams.set("parent_name", parentPitchName);
              subPitchParams.set("time_frames_special", timeFrames.join(","));
              subPitchParams.set("special_prices", prices.join(","));
              return (
                <DropdownMenuSubPitch
                  subPitchId={row.original.subpitch_id}
                  url={`/dashboard/pitch/${row.original.pitch_id}/${row.original.subpitch_id}?${subPitchParams}`}
                  refetch={refetch}
                />
              );
            },
          },
        ]}
        data={data?.result?.sub_pitches}
        isLoading={isFetching}
        pageCount={Math.floor(data?.result?.sub_pitches.length / pageSize)}
        setPagination={setPagination}
        pageIndex={pageIndex}
        pageSize={pageSize}
        headerPrefix={
          <Link href={`/dashboard/pitch/${params.pitchId}/create`}>
            <Button variant="secondary">
              <span className="mr-2 hidden md:inline-block">Thêm sân con</span>
              <PlusIcon />
            </Button>
          </Link>
        }
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
    </div>
  );
}

export default PitchDetailTable;
