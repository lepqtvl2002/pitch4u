"use client";

import { IPitch } from "@/types/pitch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { convertDayOfWeek, decimalToTimeString } from "@/lib/utils";
import { AvatarCustom } from "@/components/ui/avatar-custom";
import DropdownMenuPitch from "../dropdown-menu-action";

function PitchDetailStatCards({ pitch }: { pitch: IPitch }) {
  return (
    <div className="grid grid-cols-4">
      <Card className="relative h-fit col-span-4 lg:col-span-3">
        <div className="absolute flex items-center p-2 rounded-md hover:bg-gray-300 top-2 right-2">
          <DropdownMenuPitch pitchId={pitch.pitch_id} url="" />
        </div>
        <CardHeader>
          <CardTitle>{pitch?.name}</CardTitle>
          <CardDescription>{pitch?.address}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col">
          <div>
            <Label>Ngày tạo: </Label>
            <span>{format(new Date(pitch?.createdAt), "dd/MM/yyyy")}</span>
          </div>
          <div>
            <Label>Trạng thái: </Label>
            <span>
              {pitch?.config?.active ? "Hoạt động" : "Đã dừng hoạt động"}
            </span>
          </div>
          <div>
            <Label>Giờ mở cửa: </Label>
            <span>{decimalToTimeString(Number(pitch?.config?.open_at))}</span>
          </div>
          <div>
            <Label>Giờ đóng cửa: </Label>
            <span>{decimalToTimeString(Number(pitch?.config?.close_at))}</span>
          </div>
          <div>
            <Label>Các ngày mở cửa trong tuần: </Label>
            <span>
              {pitch?.config?.open_days
                .map((day) => convertDayOfWeek(Number(day)))
                ?.join(", ")}
            </span>
          </div>
        </CardContent>
        <CardFooter>
          <Label>Lần cập nhật gần nhất: </Label>
          <span>
            {format(
              pitch?.updatedAt
                ? new Date(pitch?.updatedAt)
                : new Date(pitch?.createdAt),
              "dd/MM/yyyy"
            )}
          </span>
        </CardFooter>
      </Card>
      <div className="hidden lg:flex justify-center">
        <AvatarCustom
          avatarUrl={pitch?.logo as string}
          name={pitch?.name || "Unknown"}
          className="w-60 h-60 border "
        />
      </div>
    </div>
  );
}

export default PitchDetailStatCards;
