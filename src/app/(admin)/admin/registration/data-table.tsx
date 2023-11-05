"use client";
import { DataTable } from "@/components/dashboard/data-table";
import { type PaginationState } from "@tanstack/react-table";
import React, { useCallback } from "react";
import { columns, registrationStatus } from "./column";
import useDebounce from "@/hooks/use-debounce";
import { RegistrationStatus } from "@/enums/registrationStatuses";
import { stringToRegistrationStatus } from "@/lib/convert";
import { RegistrationUseQuery } from "@/server/queries/registration-queries";

function RegistrationTable() {
  const [statuses, setStatuses] = React.useState<RegistrationStatus[]>([]);
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

  const { data, isError, isFetched } = RegistrationUseQuery.getMany({
    q: debouncedSearch,
    limit : pageSize,
    page : pageIndex + 1,
    status : statuses.length === 1 ? statuses[0] : undefined,
    statuses,
    sort: sort.direction,
    sort_by: sort.columnName,
  });
  console.log(data);

  const setStatusesHandler = useCallback((values: string[]) => {
    setStatuses(values.map((value) => stringToRegistrationStatus(value)));
  }, []);

  const setSearchHandler = useCallback((value: string) => {
    setSearch(value);
  }, []);

  if (isError) return <div className="mx-auto text-red-500">Error</div>;
  return (
    <div>
      <DataTable
        columns={columns}
        data={data?.result.data}
        isLoading={!isFetched}
        pageCount={Math.floor(data?.result?.total / data?.result.limit)}
        setPagination={setPagination}
        pageIndex={pageIndex}
        pageSize={pageSize}
        facets={[
          {
            title: "Trạng thái",
            columnName: "status",
            options: registrationStatus,
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
      />
    </div>
  );
}

export default RegistrationTable;
