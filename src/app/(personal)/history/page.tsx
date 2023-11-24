"use client";
import { ResetPasswordForm } from "@/components/dashboard/reset-password-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { UserUseQuery } from "@/server/queries/user-queries";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function HistoryPage() {
  const { data, isFetching, isError } = UserUseQuery.getProfile();
  const [isOpen, setIsOpen] = useState(false);
  if (isFetching) return <div>Loading...</div>;
  if (isError)
    return toast({
      title: "Đã có lỗi xảy ra trong khi tải dữ liệu.",
      description: "Vui lòng thử lại!",
      variant: "destructive",
    });
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          Đây là thông tin được hiển thị với mọi người.
        </p>
      </div>
      <Separator />
      <Button
        variant="outline"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex"
      >
        Đặt lại mật khẩu
        {!isOpen ? <ChevronDown /> : <ChevronUp />}
      </Button>
      {isOpen && <ResetPasswordForm />}
    </div>
  );
}
