"use client";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "next/navigation";

export default function DetailBookingPage() {
  const searchParams = useSearchParams();
  const bookingInfo = Object.fromEntries(searchParams.entries());

  function renderInfo() {
    return Object.entries(bookingInfo).map((item, index) => {
      if (typeof (item[1]) === "object") {
        return 
      }
      else return (
        <p key={index}>
          <Label>{item[0]} :</Label> {item[1]}
        </p>
      )
    });
  }
  return (
    <div className="flex-1 lg:max-w-2xl space-y-6 p-10 pb-16">
      <div>
        <h3 className="text-lg font-medium">Thông tin đặt sân</h3>
        <p className="text-sm text-muted-foreground">
          Thông tin chi tiết về nội dung đặt sân sẽ được hiển thị tại đây.
        </p>
      </div>
      <Separator />
      <div className="flex flex-col gap-5 px-10">{renderInfo()}</div>
    </div>
  );
}
