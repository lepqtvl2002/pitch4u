import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

type LoadingTableProps = {
    bodyCount?: number;
    cellCount?: number;
};

export default function LoadingTable({
                                         bodyCount = 10,
                                         cellCount = 4,
                                     }: LoadingTableProps) {
    return (
        <Table className="rounded-md border">
            <TableHeader>
                <TableRow>
                    <TableHead>
                        <Skeleton className="h-7 w-full" />
                    </TableHead>
                    <TableHead>
                        <Skeleton className="h-7 w-full" />
                    </TableHead>
                    <TableHead>
                        <Skeleton className="h-7 w-full" />
                    </TableHead>
                    <TableHead>
                        <Skeleton className="h-7 w-full" />
                    </TableHead>
                    <LoadingTableBody bodyCount={bodyCount} cellCount={cellCount} />
                </TableRow>
            </TableHeader>
        </Table>
    );
}

const LoadingTableBody = ({
                              bodyCount = 10,
                              cellCount = 4,
                          }: LoadingTableProps) => {
    return (
        <TableBody>
            {Array.from({ length: bodyCount }).map((_, iR) => (
                <TableRow key={iR}>
                    {Array.from({ length: cellCount }).map((_, iC) => (
                        <TableCell key={iR + iC * 2.3}>
                            <Skeleton className="h-7 w-full" />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    );
};

LoadingTable.Body = LoadingTableBody;