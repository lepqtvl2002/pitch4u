"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { formatDateTimeToddMMyyyyHHmm } from "@/lib/format-datetime";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

function RegistrationDetail() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const router = useRouter();
  return (
    <div className="w-full lg:w-2/3 p-10">
      <h3 className="text-3xl font-medium mb-10">Chi tiết tố cáo</h3>
      <div className="grid grid-cols-3">
        <Label className="col-span-1">ID người tố cáo</Label>
        <span className="text-gray-500 col-span-2">
          {searchParams.get("reporter_id")}
        </span>
        <Label className="col-span-1">Đối tượng bị tố cáo</Label>
        <span
          className={cn(
            "col-span-2 text-white rounded-full w-fit px-4",
            type === "user"
              ? "bg-yellow-400"
              : type === "pitch"
              ? "bg-red-500"
              : "bg-emerald-500"
          )}
        >
          {type as string}
        </span>
        <Label className="col-span-1">ID đối tượng bị tố cáo</Label>
        <span className="text-gray-500 col-span-2">
          {searchParams.get("reported_id")}
        </span>
        <Label className="col-span-1">Nguyên nhân</Label>
        <span className="text-gray-500 col-span-2">
          {searchParams.get("reason")}
        </span>
        <Label className="col-span-1">Mô tả chi tiết</Label>
        <span className="text-gray-500 col-span-2">
          {searchParams.get("description") || "Không có"}
        </span>

        <Label className="col-span-1">Thời gian nhận được tố cáo</Label>
        <span className="text-gray-500 col-span-2">
          {formatDateTimeToddMMyyyyHHmm(
            searchParams.get("createdAt") as string
          )}
        </span>
      </div>
      <div className="flex flex-col w-full">
        <Label className="col-span-1">Tệp đính kèm</Label>
        <div className="w-full grid grid-cols-3 gap-4 p-4">
          {searchParams
            .get("attaches")
            ?.split(",")
            ?.map((item, index) => {
              return (
                <Image
                  key={index}
                  width={100}
                  height={100}
                  className="w-full h-full"
                  src={item}
                  alt={"Anh to cao" + index}
                />
              );
            })}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 my-20">
        <Button onClick={() => router.back()}>Trở lại</Button>
      </div>
    </div>
  );
}

export default RegistrationDetail;
