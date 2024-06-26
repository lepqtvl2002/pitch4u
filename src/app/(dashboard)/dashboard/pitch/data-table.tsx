"use client";
import { DataTable } from "@/components/dashboard/data-table";
import { type PaginationState } from "@tanstack/react-table";
import React, { useCallback } from "react";
import { columns, pitchStatusOptions } from "./column";
import useDebounce from "@/hooks/use-debounce";
import { PitchUseQuery } from "@/server/queries/pitch-queries";
import { toast } from "@/components/ui/use-toast";
import DropdownMenuPitch from "./dropdown-menu-action";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import SelectPitchType from "@/components/select-pitch-type";

type PitchStatus = "suspended" | "active";
function PitchTable() {
  const [statuses, setStatuses] = React.useState<PitchStatus[]>([]);
  const [search, setSearch] = React.useState<string>();
  const [type, setType] = React.useState("");
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

  const pitchParams = {
    limit: pageSize,
    page: pageIndex + 1,
    name: debouncedSearch,
    sort_by: sort.columnName,
    sort: sort.direction,
    pitchType: type,
    active:
      statuses.length === 1
        ? statuses.includes("suspended")
          ? false
          : true
        : "all",
  };

  const { data, isError, isFetching, refetch } =
    PitchUseQuery.getMyPitches(pitchParams);

  const setStatusesHandler = useCallback((values: string[]) => {
    setStatuses([...(values as PitchStatus[])]);
  }, []);

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

  return (
    <DataTable
      columns={[
        ...columns,
        {
          id: "actions",
          cell: ({ row }) => {
            return <DropdownMenuPitch refetch={refetch} pitch={row.original} />;
          },
        },
      ]}
      data={data?.result.data}
      isLoading={isFetching}
      pageCount={Math.floor((data?.result.total ?? 0 - 1) / pageSize + 1)}
      setPagination={setPagination}
      pageIndex={pageIndex}
      pageSize={pageSize}
      facets={[
        {
          title: "Trạng thái",
          columnName: "status",
          options: pitchStatusOptions,
          onChange: setStatusesHandler,
        },
      ]}
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
      headerPrefix={
        <Link href="/dashboard/pitch/register">
          <Button variant="secondary" size="lg">
            <span className="hidden md:block">Đăng ký thêm sân</span>
            <PlusIcon />
          </Button>
        </Link>
      }
      headerSuffix={
        <div>
          <SelectPitchType
            pitchType={type}
            setPitchType={setType}
            className="rounded-md"
          />
        </div>
      }
    />
  );
}

export default PitchTable;
