"use client";

import {
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getPaginationRowModel,
    useReactTable,
    type ColumnDef,
    type OnChangeFn,
    type PaginationState,
} from "@tanstack/react-table";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { type ReactNode } from "react";
import { Icons } from "@/components/icons";
import LoadingTable from "./loading-table";
import TableFacet, { type DataFacetedOptionsType } from "./table-facet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data?: TData[];
    pageCount?: number;
    setPagination?: OnChangeFn<PaginationState>;
    pageIndex?: number;
    pageSize?: number;
    facets?:
        | {
        title: string;
        columnName: string;
        options: DataFacetedOptionsType[];
        onChange: (value: string[]) => void;
    }[]
        | null
        | undefined;
    isLoading?: boolean;
    search?: {
        placeholder: string;
        value: string;
        onChange: (value: string) => void;
    };
    sort?: {
        columnName: string;
        direction: "asc" | "desc";
        onChange: (columnName: string, direction: "asc" | "desc") => void;
    };
    headerPrefix?: ReactNode;
    headerSuffix?: ReactNode;
    otherButton?: {
        url?: string;
        onClick?: () => void;
        title: string;
        className?: string;
    };
}

export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                             pageCount,
                                             setPagination,
                                             pageIndex,
                                             facets,
                                             pageSize,
                                             isLoading,
                                             search,
                                             sort,
                                             headerPrefix,
                                             headerSuffix,
                                             otherButton,
                                         }: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data: data || [],
        columns,
        pageCount,
        state: {
            pagination: {
                pageSize: pageSize || 10,
                pageIndex: pageIndex || 0,
            },
        },
        onPaginationChange: setPagination,
        manualPagination: Boolean(setPagination),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    });

    return (
        <div className="space-y-4">
            <div className="flex justify-between">
                {headerPrefix}
                <section id="table-facets" className="flex items-center space-x-4">
                    {facets &&
                        facets.map((facet) => (
                            <TableFacet
                                key={facet.columnName}
                                title={facet.title}
                                column={table.getColumn(facet.columnName)}
                                options={facet.options}
                                onChange={facet.onChange}
                            />
                        ))}
                </section>
                <section
                    id="table-search"
                    className="flex h-fit items-center gap-2"
                >
                    {otherButton &&
                        (otherButton.url ? (
                            <Link href={otherButton?.url}>
                                <Button
                                    onClick={otherButton?.onClick}
                                    className={
                                        otherButton.className ? `${otherButton.className}` : "w-max"
                                    }
                                >
                                    {otherButton.title}
                                </Button>
                            </Link>
                        ) : (
                            <Button
                                onClick={otherButton?.onClick}
                                className={
                                    otherButton.className ? `${otherButton.className}` : "w-max"
                                }
                            >
                                {otherButton.title}
                            </Button>
                        ))}
                    {search && (
                        <Input
                            placeholder={search.placeholder}
                            value={search.value}
                            onChange={(e) => search.onChange(e.target.value)}
                            className="hidden w-[180px] md:block"
                        />
                    )}
                    {sort && (
                        <div>
                            <Select
                                onValueChange={(value) => {
                                    const direction = value === "asc" ? "asc" : "desc";
                                    sort?.onChange(sort.columnName, direction);
                                }}
                                defaultValue="desc"
                            >
                                <SelectTrigger className="w-fit md:w-[180px]">
                                    <SelectValue placeholder="Mới nhất" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="desc">
                                        <div className="flex items-center justify-center">
                                            <Icons.arrowUpToLine className="mr-2 h-4 w-4" />
                                            Mới nhất
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="asc" className="flex">
                                        <div className="flex items-center justify-center">
                                            <Icons.arrowDownToLine className="mr-2 h-4 w-4" />
                                            Cũ nhất
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </section>
                {headerSuffix}
            </div>
            {/* This search is for mobile device */}
            {search && (
                <Input
                    placeholder={search.placeholder}
                    value={search.value}
                    onChange={(e) => search.onChange(e.target.value)}
                    className="block md:hidden"
                />
            )}

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="text-xs">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    {isLoading ? (
                        <LoadingTable.Body
                            cellCount={columns.length}
                            bodyCount={table.getState().pagination.pageSize}
                        />
                    ) : (
                        <TableBody>
                            {data && data.length > 0 ? (
                                table.getRowModel().rows.map((row) => {
                                    return (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell) => {
                                                return (
                                                    <TableCell key={cell.id}>
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        Không có dữ liệu
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    )}
                </Table>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Xem </p>
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value));
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Trang {table.getState().pagination.pageIndex + 1} /
                    {table.getPageCount() || 1}
                </div>
            </div>
            <div className="mx-auto flex w-full items-center justify-center space-x-4 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <Icons.chevronLeft />
                </Button>
                <div className="flex space-x-2 overflow-auto">
                    {Array.from({ length: table.getPageCount() }, (_, i) => i).map(
                        (pageIndex) => {
                            return (
                                <Button
                                    key={pageIndex}
                                    variant={
                                        pageIndex === table.getState().pagination.pageIndex
                                            ? "default"
                                            : "outline"
                                    }
                                    size="sm"
                                    onClick={() => table.setPageIndex(pageIndex)}
                                    disabled={pageIndex === table.getState().pagination.pageIndex}
                                >
                                    {pageIndex + 1}
                                </Button>
                            );
                        }
                    )}
                </div>
                <Button
                    variant={"outline"}
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <Icons.chevronRight />
                </Button>
            </div>
        </div>
    );
}