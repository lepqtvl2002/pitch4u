"use client";

import { IPitch } from "@/types/pitch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileEdit } from "lucide-react";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

function PitchDetailStatCards({ pitch }: { pitch: IPitch }) {
  return (
    <div className="grid grid-cols-3 xl:grid-cols-4">
      <Card className="relative h-fit col-span-2">
        <Button variant="ghost" className="absolute top-2 right-2">
          <FileEdit />
        </Button>
        <CardHeader>
          <CardTitle>{pitch?.name}</CardTitle>
          <CardDescription>{pitch?.address}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col">
          <div>
            <Label>Ngày tạo:{" "}</Label>
            <span>{format(new Date(pitch?.createdAt), "dd/MM/yyyy")}</span>
          </div>
          <div>
            <Label>Trạng thái:{" "}</Label>
            <span>{pitch?.config?.active ? "Hoạt động" : "Đã dừng hoạt động"}</span>
          </div>
          <div>
            <Label>Giờ mở cửa:{" "}</Label>
            <span>{pitch?.config?.open_at}</span>
          </div>
          <div>
            <Label>Giờ đóng cửa:{" "}</Label>
            <span>{pitch?.config?.close_at}</span>
          </div>
          <div>
            <Label>Các ngày mở cửa trong tuần:{" "}</Label>
            <span>{pitch?.config?.open_days}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Label>Lần cập nhật gần nhất:{" "}</Label>
          <span>{format(pitch?.updatedAt ? new Date(pitch?.updatedAt) : new Date(pitch?.createdAt), "dd/MM/yyyy")}</span>
        </CardFooter>
      </Card>

    </div>
  )
}

export default PitchDetailStatCards;