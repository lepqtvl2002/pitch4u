import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { UserUseMutation } from "@/server/actions/user-actions";

export function ReviewDialogForm({
  bookingId,
}: {
  bookingId: string | number;
}) {
  const [rate, setRate] = useState("5");
  const [description, setDescription] = useState("");
  const { mutateAsync, isLoading } = UserUseMutation.review();

  async function handleReview() {
    await mutateAsync({
      bookingId,
      star: Number(rate),
      text: description,
      attaches: [],
    });
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Review sân</DialogTitle>
        <DialogDescription>
          Hãy cho chúng tôi biết cảm nhận của bạn về sân này ^^
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="">
          <Label htmlFor="reason" className="text-right">
            Điểm đánh giá
          </Label>
          <Select value={rate} onValueChange={(value) => setRate(value)}>
            <SelectTrigger id="reason">
              <SelectValue placeholder="lý do tố cáo của bạn" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value={"1"}>1</SelectItem>
              <SelectItem value={"2"}>2</SelectItem>
              <SelectItem value={"3"}>3</SelectItem>
              <SelectItem value={"4"}>4</SelectItem>
              <SelectItem value={"5"}>5</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="">
          <Label htmlFor="description" className="text-right">
            Mô tả thêm
          </Label>
          <Textarea
            id="description"
            required
            className="w-full"
            placeholder="Hãy thể hiện cảm xúc của bạn về sân này ^^"
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
        <Button disabled={isLoading} onClick={handleReview}>
          Gửi đánh giá
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
