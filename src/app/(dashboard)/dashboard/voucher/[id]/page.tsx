"use client";
import { VoucherInputForm } from "@/components/dashboard/voucher-input-form";
import { Separator } from "@/components/ui/separator";
import { useParams, useSearchParams } from "next/navigation";

export default function DetailVoucherPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  return (
    <div className="flex-1 lg:max-w-2xl space-y-6 p-10 pb-16">
      <div>
        <h3 className="text-lg font-medium">Thông tin nhân viên</h3>
        <p className="text-sm text-muted-foreground">
          Thông tin chi tiết về voucher{" "}
          <b>{searchParams.get("code")?.toUpperCase()}</b> sẽ được hiển thị tại
          đây.
        </p>
      </div>
      <Separator />
      <VoucherInputForm />
    </div>
  );
}
