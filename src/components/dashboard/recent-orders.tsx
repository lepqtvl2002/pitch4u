import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatisticUseQuery } from "@/server/queries/statistic-queries";
import { toast } from "../ui/use-toast";
import { cn, formatMoney, paymentTypeToString } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import PaymentTypes from "@/enums/paymentTypes";
import { Icons } from "../icons";
import { bookingStatusToIcon } from "@/lib/convert";
import BookingStatuses from "@/enums/bookingStatuses";
import { paymentTypeVariant } from "@/lib/variant";
import { AvatarCustom } from "../ui/avatar-custom";

export function RecentOrder({ pitchId }: { pitchId?: number }) {
  const params = pitchId ? { pitch_id: pitchId, limit: 5 } : { limit: 5 };
  const { data, isLoading, isError } = StatisticUseQuery.getBooking(params);
  if (isLoading)
    return (
      <div className="flex items-center">
        <div className="h-9 w-9 bg-gray-400 rounded-full"></div>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            <Skeleton className="w-40 h-8" />
          </p>
        </div>
        <div className="ml-auto font-medium">
          <p>
            <Skeleton className="w-10 h-8" />
          </p>
        </div>
      </div>
    );
  if (isError) {
    toast({
      title: "Đã xảy ra lỗi trong khi tải những lượt đặt sân gần đây",
      variant: "destructive",
    });
  }
  return (
    <div className="space-y-6">
      {data?.result.data.map((order) => {
        const Icon = Icons[bookingStatusToIcon(order.status)];
        return (
          <div key={order.booking_id} className="flex items-center">
            <AvatarCustom
              avatarUrl={order.user.avatar}
              name={order.user.fullname}
            />
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {order.user.fullname}
              </p>
              <p className="text-sm text-muted-foreground">
                {order.user.email}
              </p>
            </div>
            <div className="ml-auto font-medium">
              <p>{formatMoney(order.total)}</p>
              <div
                className={cn(
                  "text-xs flex items-center",
                  order.status === BookingStatuses.Success
                    ? "text-green-500"
                    : order.status === BookingStatuses.Pending
                    ? "text-yellow-500"
                    : "text-red-500"
                )}
              >
                <span
                  className={paymentTypeVariant({
                    variant: order.payment_type,
                  })}
                >
                  {paymentTypeToString(order.payment_type)}
                </span>
                <Icon />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
