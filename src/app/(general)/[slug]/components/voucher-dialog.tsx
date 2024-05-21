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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VoucherUseQuery } from "@/server/queries/voucher-queries";
import { IVoucher } from "@/types/voucher";
import { ScrollArea } from "@/components/ui/scroll-area";
import { activeVariant, cn } from "@/lib/utils";
import { format } from "date-fns";
import VoucherTypes from "@/enums/voucherTypes";
import { TicketIcon } from "lucide-react";

type VoucherDialogProps = {
  pitchId: number | string;
  voucher: IVoucher | undefined;
  setVoucher: (voucher: IVoucher | undefined) => void;
};

export function VoucherDialog({
  pitchId,
  voucher,
  setVoucher,
}: VoucherDialogProps) {
  const { data: voucherList, isFetching } =
    VoucherUseQuery.getVoucherListForUser({ pitch_id: pitchId });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Chọn voucher <TicketIcon className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chọn voucher</DialogTitle>
          <DialogDescription>
            Chọn voucher để áp dụng cho đơn hàng của bạn
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="code" className="text-right">
              Mã voucher
            </Label>
            <Input
              id="code"
              placeholder="Mã voucher Pitch4u"
              className="flex-1"
            />
            <Button disabled>ÁP DỤNG</Button>
          </div>
          <ScrollArea className="h-96 max-h-[70vh] rounded-md border">
            <div className="p-4">
              <h4 className="mb-4 text-sm font-medium leading-none">
                Danh sách voucher của bạn
              </h4>
              {isFetching
                ? "Loading..."
                : voucherList?.result.length === 0
                ? "Hiện không có voucher nào :("
                : voucherList?.result.map((e) => (
                    <div
                      key={e.voucher_id}
                      className={cn(
                        "rounded-lg border-2 mb-2 overflow-hidden cursor-pointer",
                        e.voucher_id == voucher?.voucher_id
                          ? " border-emerald-400"
                          : "border-gray-200"
                      )}
                      onClick={() => setVoucher(e)}
                    >
                      <VoucherItem voucher={e} />
                    </div>
                  ))}
            </div>
          </ScrollArea>
        </div>
        <DialogFooter>
          <DialogTrigger>
            <Button variant="outline">Trở lại</Button>
          </DialogTrigger>
          <DialogTrigger>
            <Button>Áp dụng</Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function VoucherItem({ voucher }: { voucher: IVoucher }) {
  return (
    <div className="flex">
      <div className="w-32 min-h-32 bg-emerald-500 text-center p-4">
        <span className="text-white font-semibold break-words">
          {voucher.code}
        </span>
      </div>
      <div className="flex-1 flex flex-col justify-between p-2">
        <p>{voucher.code}</p>
        {voucher.type === VoucherTypes.Percent ? (
          <p>{Number(voucher.discount) * 100}%</p>
        ) : (
          <p>{voucher.discount.toLocaleString()}đ</p>
        )}
        {voucher.active ? (
          <div className={activeVariant({ variant: true })}>Đang hoạt động</div>
        ) : (
          <div className={activeVariant({ variant: false })}>Đã hết hạn</div>
        )}
        <div className="flex justify-end">
          <p>
            Ngày hết hạn: {format(new Date(voucher.expire_date), "dd/MM/yyyy")}
          </p>
        </div>
      </div>
    </div>
  );
}
