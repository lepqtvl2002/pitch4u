"use client";
import { ConfigPitchForm } from "@/components/dashboard/config-pitch-form";
import { EditPitchForm } from "@/components/dashboard/edit-pitch-form";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { PitchUseQuery } from "@/server/queries/pitch-queries";

export default function EditPitchPage({
  params,
}: {
  params: { pitchId: string };
}) {
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
  console.log(data)
  return (
    <div className="flex-1 lg:max-w-2xl space-y-6 p-10 pb-16">
      <div id="edit-pitch">
        <h3 className="text-lg font-medium">Cài đặt sân</h3>
        <p className="text-sm text-muted-foreground">
          Bạn có thể đổi tên cũng như cài đặt sân ở đây.
        </p>
      </div>
      <Separator />
      <EditPitchForm pitch={data?.result} />
      <Separator />
      <div id="config-pitch">
        <h3 className="text-lg font-medium">Cài đặt nâng cao</h3>
        <p className="text-sm text-muted-foreground">
          Bạn có thể đổi giờ mở cửa, giờ đóng cửa cũng như giá từng giờ cụ thể ở đây.
        </p>
      </div>
      <ConfigPitchForm pitch={data?.result}/>
    </div>
  );
}
