"use client";
import { ConfigPitchForm } from "@/components/dashboard/config-pitch-form";
import { EditPitchForm } from "@/components/dashboard/edit-pitch-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { PitchUseQuery } from "@/server/queries/pitch-queries";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

export default function EditPitchPage({
  params,
}: {
  params: { pitchId: string };
}) {
  const [open, setOpen] = useState(false);
  const { data, isLoading, isError } = PitchUseQuery.getPitchDetail({
    pitch_id: params.pitchId,
  });
  if (isLoading) return <>Loading....</>;
  if (isError) {
    toast({
      title: "Tải dữ liệu sân thất bại",
      description: "Đã có lỗi xảy ra, vui lòng thử lại",
      variant: "destructive",
    });
  }
  return (
    <div className="flex-1 lg:max-w-2xl space-y-4 md:space-y-6 p-4 md:p-10 pb-16">
      <div id="edit-pitch">
        <h3 className="text-lg font-medium">Cài đặt sân</h3>
        <p className="text-sm text-muted-foreground">
          Bạn có thể đổi tên cũng như cài đặt sân ở đây.
        </p>
        <i className="text-sm text-muted-foreground">
          Nếu bạn muốn thay đổi giá sân, hãy vào chi tiết từng sân con.
        </i>
      </div>
      <Separator />
      <EditPitchForm pitch={data?.result} />
      <Separator />
      <Button variant="ghost" onClick={() => setOpen((pre) => !pre)}>
        <h3 className="text-lg font-medium mr-2">Cài đặt nâng cao</h3>
        <ChevronDownIcon className={open ? "rotate-180" : ""} />
      </Button>
      <div id="config-pitch" className={open ? "block" : "hidden"}>
        <p className="text-sm text-muted-foreground">
          Bạn có thể đổi giờ mở cửa, giờ đóng cửa cũng như giá từng giờ cụ thể ở
          đây.
        </p>
        <ConfigPitchForm pitch={data?.result} />
      </div>
    </div>
  );
}
