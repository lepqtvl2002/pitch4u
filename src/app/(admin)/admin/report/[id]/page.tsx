"use client";
import { CarouselImages } from "@/components/carousel-custom";
import { ImageWithFallback } from "@/components/image-with-fallback";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ReportType } from "@/enums/reportTypes";
import { reportTypeToString } from "@/lib/convert";
import { formatDateTimeToddMMyyyyHHmm } from "@/lib/format-datetime";
import { reportTypeVariant } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

function RegistrationDetail() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const router = useRouter();
  return (
    <div className="w-full lg:w-2/3 p-10">
      <h3 className="text-3xl font-medium mb-10">Chi tiết tố cáo</h3>
      <div className="grid grid-cols-2">
        <Label className="col-span-1">Đối tượng bị tố cáo</Label>
        <span className={reportTypeVariant({ variant: type as ReportType })}>
          {reportTypeToString(type as string)}
        </span>
        <Label className="col-span-1">ID người tố cáo</Label>
        <span className="text-gray-500">{searchParams.get("reporter_id")}</span>
        <Label className="col-span-1">ID đối tượng bị tố cáo</Label>
        <span className="text-gray-500">
          {type === "user"
            ? searchParams.get("user_id")
            : searchParams.get("pitch_id")}
        </span>
        <Label className="col-span-1">Nguyên nhân</Label>
        <span className="text-gray-500">{searchParams.get("reason")}</span>
        <Label className="col-span-1">Mô tả chi tiết</Label>
        <span className="text-gray-500">
          {searchParams.get("description") || "Không có"}
        </span>

        <Label className="col-span-1">Thời gian nhận được tố cáo</Label>
        <span className="text-gray-500">
          {formatDateTimeToddMMyyyyHHmm(
            searchParams.get("createdAt") as string
          )}
        </span>
      </div>
      {searchParams.get("attaches") ? (
        <div className="flex flex-col w-full mx-10">
          <Label className="col-span-1 my-4">Tệp đính kèm</Label>
          <CarouselImages
            imageUrls={searchParams.get("attaches")?.split(",")}
          />
        </div>
      ) : (
        <span className="italic text-gray-500">Không có thông tin đính kèm</span>
      )}
      <div className="grid grid-cols-2 gap-3 my-20">
        <Button onClick={() => router.back()}>Trở lại</Button>
      </div>
    </div>
  );
}

export default RegistrationDetail;
