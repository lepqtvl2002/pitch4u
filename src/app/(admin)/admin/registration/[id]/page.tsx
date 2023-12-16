"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { registrationStatusToString } from "@/lib/convert";
import { formatDateTimeToddMMyyyyHHmm } from "@/lib/format-datetime";
import { mutatingToast } from "@/lib/quick-toast";
import { cn } from "@/lib/utils";
import { RegistrationUseMutation } from "@/server/actions/registration-actions";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { MapPinIcon } from "lucide-react";
import Link from "next/link";

function RegistrationDetail() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const { mutateAsync } = RegistrationUseMutation.approve();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
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
        router.replace("/admin/registration");
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

  const handleNavigateToGoogleMap = ({
    long,
    lat,
    name,
  }: {
    long: number;
    lat: number;
    name: string;
  }) => {
    let href = `https://www.google.com/maps/place/`;
    if (lat && long) href += `@${lat},${long},16z?entry=ttu`;
    else href = `https://www.google.com/maps/search/${name.replace(" ", "+")}`;

    window.open(href, "_blank");
  };

  return (
    <div className="w-full lg:w-2/3 p-10">
      <h3 className="text-3xl font-medium mb-10">Chi tiết hồ sơ đăng ký</h3>
      <h4 className="text-xl font-medium mb-4">Thông tin về người đăng ký</h4>
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
              : status === "denied"
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

      <h4 className="text-xl font-medium mb-4">Thông tin sân đăng ký</h4>
      <div className="grid grid-cols-3 mb-20">
        <Label className="col-span-1">Tên sân</Label>
        <span className="text-gray-500 col-span-2">
          {searchParams.get("pitch_name")}
        </span>
        <Label className="col-span-1">Địa chỉ sân</Label>
        <span className="text-gray-500 col-span-2">
          {searchParams.get("pitch_address")}
        </span>
        <Label className="col-span-1">Tọa độ</Label>
        <span className="text-gray-500 col-span-2">
          {searchParams.get("long")} - {searchParams.get("lat")}
          <Button
            variant="ghost"
            onClick={() =>
              handleNavigateToGoogleMap({
                long: searchParams.get("long") as unknown as number,
                lat: searchParams.get("lat") as unknown as number,
                name: searchParams.get("pitch_name") as string,
              })
            }
          >
            Xem trên Google Map <MapPinIcon />
          </Button>
        </span>
      </div>
      <div className="flex flex-col w-full">
        <Label className="col-span-1">Hình ảnh minh chứng</Label>
        <div className="w-full grid grid-cols-3 gap-4 p-4">
          {searchParams.get("proofs") !== "null" ? (
            searchParams
              .get("proofs")
              ?.split(",")
              ?.map((item, index) => {
                return (
                  <Link href={item} key={index} target="_blank">
                    <Image
                      width={100}
                      height={100}
                      className="w-full h-full"
                      src={item}
                      alt={"Anh minh chung" + index}
                    />
                  </Link>
                );
              })
          ) : (
            <span>Không có ảnh minh chứng</span>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {status === "pending" && (
          <>
            <Button
              onClick={handleApprove}
              disabled={isLoading}
              className="col-span-1 bg-emerald-500 hover:bg-emerald-300"
            >
              Xác nhận
            </Button>
            <PopoverDeny id={id as string} />
          </>
        )}
      </div>
    </div>
  );
}

export default RegistrationDetail;

function PopoverDeny({ id }: { id: string | number }) {
  const [value, setValue] = useState("");
  const { mutateAsync: denyMutate, isLoading } = RegistrationUseMutation.deny();

  async function handelDeny() {
    mutatingToast();
    await denyMutate({
      registration_id: id,
      deny_reason: value,
    });
    window.location.href = "/admin/registration";
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Từ chối đăng ký</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Từ chối đăng ký</h4>
            <p className="text-sm text-muted-foreground">
              Vui lòng đưa ra lý do từ chối trước khi từ chối yêu cầu đăng ký
              này.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid">
              <Textarea
                id="reason"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Điền lý do từ chối"
                className=""
              />
            </div>
            <Button
              disabled={isLoading}
              onClick={handelDeny}
              variant="destructive"
            >
              Xác nhận từ chối
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
