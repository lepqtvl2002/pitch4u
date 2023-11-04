"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { registrationStatusToString } from "@/lib/convert";
import { formatDateTimeToddMMyyyyHHmm } from "@/lib/format-datetime";
import { cn } from "@/lib/utils";
import { RegistrationUseMutation } from "@/server/actions/registration-actions";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";

function RegistrationDetail() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const { mutateAsync } = RegistrationUseMutation.approve();
  const [isLoading, setIsLoading] = useState(false);
  async function handleApprove() {
    try {
      setIsLoading(true);
      const res = await mutateAsync({ registration_id: id as string });
      setIsLoading(false);
      if (res.status === 200) {
        toast({
          title: "Thành công",
          description: "Đã chấp nhận hồ sơ đăng ký",
          variant: "success",
        });
      } else {
        toast({
          title: "Thất bại",
          description: "Đã có lỗi xảy ra",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Đã có lỗi xảy ra",
        description: "Vui lòng thử lại sau.",
        variant: "destructive",
      });
    }
  }
  return (
    <div className="w-full lg:w-2/3 p-10">
      <h3 className="text-xl font-bold mb-10">Chi tiết hồ sơ đăng ký</h3>
      <div className="grid grid-cols-3 mb-20">
        <Label className="col-span-1">Tên người đăng ký</Label>
        <span className="text-gray-500 col-span-2">
          {searchParams.get("fullname")}
        </span>
        <Label className="col-span-1">Số điện thoại</Label>
        <span className="text-gray-500 col-span-2">
          {searchParams.get("phone")}
        </span>
        <Label className="col-span-1">Email</Label>
        <span className="text-gray-500 col-span-2">
          {searchParams.get("email")}
        </span>
        <Label className="col-span-1">Địa chỉ</Label>
        <span className="text-gray-500 col-span-2">
          {searchParams.get("address")}
        </span>
        <Label className="col-span-1">Trạng thái</Label>
        <span
          className={cn(
            "col-span-2 text-white rounded-full w-fit px-4",
            status === "pending"
              ? "bg-yellow-400"
              : status === "rejected"
              ? "bg-red-500"
              : "bg-emerald-500"
          )}
        >
          {registrationStatusToString(status as string)}
        </span>
        <Label className="col-span-1">Ngày đăng ký</Label>
        <span className="text-gray-500 col-span-2">
          {formatDateTimeToddMMyyyyHHmm(
            searchParams.get("createdAt") as string
          )}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={handleApprove}
          disabled={isLoading}
          className="col-span-1 bg-emerald-500 hover:bg-emerald-300"
        >
          Xác nhận
        </Button>
        <Button
          disabled={isLoading}
          className="col-span-1 bg-red-500 hover:bg-red-300"
        >
          Từ chối
        </Button>
        <Button disabled={isLoading} className="col-span-2">
          Liên hệ để lấy thêm thông tin
        </Button>
      </div>
    </div>
  );
}

export default RegistrationDetail;
