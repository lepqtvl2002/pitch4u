"use client";
import { ResetPasswordForm } from "@/components/dashboard/reset-password-form";
import { StaffProfileForm } from "@/components/dashboard/staff-profile-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function DetailStaffPage({
  params,
  searchParams,
}: {
  params: { id: string | number };
  searchParams: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex-1 lg:max-w-2xl space-y-6 px-2 md:px-10 py-10 pb-16">
      <div>
        <h3 className="text-lg font-medium">Thông tin nhân viên</h3>
        <p className="text-sm text-muted-foreground">
          Thông tin chi tiết về nhân viên <b>{searchParams?.fullname}</b> sẽ
          được hiển thị tại đây.
        </p>
      </div>
      <Separator />
      <StaffProfileForm userProfile={searchParams} staffId={params.id} />
      <Button
        variant="outline"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex"
      >
        Đặt lại mật khẩu
        {!isOpen ? <ChevronDown /> : <ChevronUp />}
      </Button>
      {isOpen && <ResetPasswordForm staffId={params.id} />}
    </div>
  );
}
