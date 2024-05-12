"use client";
import { VoucherInputForm } from "@/components/dashboard/voucher-input-form";
import { Separator } from "@/components/ui/separator";

export default function CreateVoucherPage() {
  return (
    <div className="flex-1 lg:max-w-2xl space-y-6 p-2 md:p-10 pb-16">
      <div>
        <h3 className="text-lg font-medium">Tạo voucher mới</h3>
        <p className="text-sm text-muted-foreground">
          Thêm các thông tin cần thiết để tạo voucher.
        </p>
      </div>
      <Separator />
      <VoucherInputForm />
    </div>
  );
}
