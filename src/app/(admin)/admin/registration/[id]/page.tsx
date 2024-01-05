"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { registrationStatusToString } from "@/lib/convert";
import { formatDateTimeToddMMyyyyHHmm } from "@/lib/format-datetime";
import { mutatingToast } from "@/lib/quick-toast";
import { RegistrationUseMutation } from "@/server/actions/registration-actions";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { MapPinIcon } from "lucide-react";
import { registrationStatusVariant } from "@/lib/variant";
import { RegistrationStatus } from "@/enums/registrationStatuses";
import { CarouselImages } from "@/components/carousel-custom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function RegistrationDetail() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const { mutateAsync } = RegistrationUseMutation.approve();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  async function handleApprove() {
    setIsLoading(true);
    await mutateAsync({ registration_id: Number(id as string) });
    setIsLoading(false);
    router.replace("/admin/registration");
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
    <div className="w-full xl:w-2/3 p-10">
      <h3 className="text-3xl font-medium mb-10">Chi tiết hồ sơ đăng ký</h3>
      <Card>
        <CardHeader>
          <CardTitle>Thông tin về người đăng ký</CardTitle>
          <CardDescription>
            Thông tin chi tiết của người muốn đăng ký sân
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2">
            <Label className="col-span-1">Tên người đăng ký</Label>
            <span className="text-gray-500">
              {searchParams.get("fullname")}
            </span>
            <Label className="col-span-1">Số điện thoại</Label>
            <span className="text-gray-500">{searchParams.get("phone")}</span>
            <Label className="col-span-1">Email</Label>
            <span className="text-gray-500">{searchParams.get("email")}</span>
            <Label className="col-span-1">Địa chỉ</Label>
            <span className="text-gray-500">{searchParams.get("address")}</span>
            <Label className="col-span-1">Trạng thái</Label>
            <span
              className={registrationStatusVariant({
                variant: status as RegistrationStatus,
              })}
            >
              {registrationStatusToString(status as string)}
            </span>
            <Label className="col-span-1">Ngày đăng ký</Label>
            <span className="text-gray-500">
              {formatDateTimeToddMMyyyyHHmm(
                searchParams.get("createdAt") as string
              )}
            </span>
          </div>
        </CardContent>
        <CardHeader>
          <CardTitle>Thông tin Sân bóng</CardTitle>
          <CardDescription>
            Thông tin chi tiết về sân bóng mà người dùng muốn cung cấp
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2">
            <Label className="col-span-1">Tên sân</Label>
            <span className="text-gray-500">
              {searchParams.get("pitch_name")}
            </span>
            <Label className="col-span-1">Địa chỉ sân</Label>
            <span className="text-gray-500">
              {searchParams.get("pitch_address")}
            </span>
            <Label className="col-span-1">Tọa độ</Label>
            <span className="text-gray-500">
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
        </CardContent>
        <CardHeader>
          <CardTitle>Hình ảnh minh chứng</CardTitle>
          <CardDescription>
            Hình ảnh của người dùng cung cấp nhằm xác định danh tính cũng như
            quyền sở hữu đối với sân bóng
          </CardDescription>
        </CardHeader>
        <CardContent>
          {searchParams.get("proofs") ? (
            <div className="px-10">
              <CarouselImages
                imageUrls={searchParams.get("proofs")?.split(",")}
                sizeImage={1000}
                className="max-w-full h-96 px-10"
              />
            </div>
          ) : (
            <span className="text-red-400 italic mb-10">
              Không có ảnh minh chứng
            </span>
          )}
        </CardContent>
        {status === "pending" && (
          <CardFooter className="space-x-4">
            <Button
              onClick={handleApprove}
              disabled={isLoading}
              className="col-span-1 bg-emerald-500 hover:bg-emerald-300"
            >
              Xác nhận
            </Button>
            <PopoverDeny id={id as string} />
          </CardFooter>
        )}
      </Card>
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
