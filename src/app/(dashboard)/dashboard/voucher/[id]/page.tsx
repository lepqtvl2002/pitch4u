"use client";
import { VoucherInputForm } from "@/components/dashboard/voucher-input-form";
import { Separator } from "@/components/ui/separator";
import { IVoucher } from "@/types/voucher";
import { useSearchParams } from "next/navigation";

export default function DetailVoucherPage() {
  const searchParams = useSearchParams();
  searchParams.forEach(a => console.log(a))
  const voucher = Object.fromEntries(searchParams.entries());
  console.log(voucher)
  return (
    <div className="flex-1 lg:max-w-2xl space-y-6 p-10 pb-16">
      <div>
        <h3 className="text-lg font-medium">Thông tin Voucher</h3>
        <p className="text-sm text-muted-foreground">
          Thông tin chi tiết về voucher{" "}
          <b>{searchParams.get("code")?.toUpperCase()}</b> sẽ được hiển thị tại
          đây.
        </p>
      </div>
      <Separator />
      <VoucherInputForm voucher={voucher as unknown as IVoucher} />
    </div>
  );
}
