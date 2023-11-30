"use client";
import { Separator } from "@/components/ui/separator";
import BookingTable from "./data-table";

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Lịch sử đặt sân</h3>
        <p className="text-sm text-muted-foreground">
          Lịch sử đặt sân của bạn.
        </p>
      </div>
      <Separator />
      <BookingTable />
    </div>
  );
}
