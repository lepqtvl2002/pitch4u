"use client";
import { SubPitchForm } from "@/components/dashboard/subpitch-form";
import { Separator } from "@/components/ui/separator";
import { useParams, useSearchParams } from "next/navigation";

export default function CreateSubPitchPage() {
  const { pitchId } = useParams();
  const searchParams = useSearchParams();
  const pitchType = searchParams.get("type");

  console.log(pitchType);

  return (
    <div className="flex-1 lg:max-w-2xl space-y-6 p-10 pb-16">
      <div>
        <h3 className="text-lg font-medium">Thêm sân con</h3>
        <p className="text-sm text-muted-foreground">
          Điền thông tin cần thiết để thêm sân mới.
        </p>
      </div>
      <Separator />
      <SubPitchForm pitch_id={pitchId as string} pitchType={pitchType} />
    </div>
  );
}
