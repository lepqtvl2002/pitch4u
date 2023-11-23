import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReportUseMutation } from "@/server/actions/report-actions";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

export function ReportForm({ pitchId }: { pitchId: string | number }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [reason, setReason] = useState("");
  const [reasonList, setReasonList] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const { mutateAsync } = ReportUseMutation.reportPitch();
  const { data, isFetching, isError } = ReportUseMutation.getReportReasons();
  function handleReport() {
    setIsLoaded(true);
    mutateAsync({ pitch_id: pitchId, reason, description });
    setIsLoaded(false);
  }

  useEffect(() => {
    if (data) {
      setReasonList(data?.result.pitch);
    }
  }, [data]);
  if (isError) {
    toast({
      title: "Có lỗi xảy ra",
      description: "Vui lòng thử lại sau",
      variant: "destructive",
    });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">Tố cáo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tố cáo sân bóng</DialogTitle>
          <DialogDescription>
            Chúng tôi sẽ xem xét và xử lý tố cáo của bạn trong thời gian sớm
            nhất.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="">
            <Label htmlFor="reason" className="text-right">
              Lý do
            </Label>
            <Select value={reason} onValueChange={(value) => setReason(value)}>
              <SelectTrigger id="reason">
                <SelectValue placeholder="lý do tố cáo của bạn" />
              </SelectTrigger>
              <SelectContent className="w-full">
                {reasonList.map((reason: string, index: number) => (
                  <SelectItem key={index} value={reason}>
                    {reason}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="">
            <Label htmlFor="description" className="text-right">
              Mô tả
            </Label>
            <Textarea
              id="description"
              className="w-full"
              placeholder="Hãy mô tả chi tiết sự cố bạn gặp phải"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="">
            <Label htmlFor="attaches" className="text-right">
              Tệp đính kèm
            </Label>
            <Input type="file" id="attaches" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button disabled={isFetching || isLoaded} onClick={handleReport}>
            Gửi tố cáo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
