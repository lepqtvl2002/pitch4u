import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatisticUseQuery } from "@/server/queries/statistic-queries";
import { toast } from "../ui/use-toast";
import { cn, formatMoney, paymentTypeToString } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export function RecentOrder() {
  const { data, isLoading, isError } = StatisticUseQuery.getBooking();
  if (isLoading)
    return (
      <div className="flex items-center">
        <div className="h-9 w-9 bg-gray-400 rounded-full">
        </div>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            <Skeleton className="w-40 h-8"/>
          </p>
        </div>
        <div className="ml-auto font-medium">
          <p><Skeleton className="w-10 h-8"/></p>
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
    <div className="space-y-8">
      {data?.result.data.slice(5).map((order) => (
        <div key={order.booking_id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={order.user.avatar} alt="Avatar" />
            <AvatarFallback>{order.user.fullname.at(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {order.user.fullname}
            </p>
            <p className="text-sm text-muted-foreground">{order.user.email}</p>
          </div>
          <div className="ml-auto font-medium">
            <p>{formatMoney(order.total)}</p>
            <span
              className={cn(
                "text-xs",
                order.payment_type === "vnpay"
                  ? "text-blue-600"
                  : "text-red-500"
              )}
            >
              {paymentTypeToString(order.payment_type)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
