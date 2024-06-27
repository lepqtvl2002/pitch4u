import { StatisticUseQuery } from "@/server/queries/statistic-queries";
import { Avatar, AvatarImage } from "../ui/avatar";
import { FALLBACK_IMAGE_URL } from "@/lib/constants";
import { toast } from "../ui/use-toast";
import { Skeleton } from "../ui/skeleton";
import { Icons } from "../icons";
import { pitchTypeToIcon } from "@/lib/convert";
import { cn, formatMoney } from "@/lib/utils";
import { pitchTypeVariant } from "@/lib/variants";

export default function TopPitches() {
  const { data, isLoading, error } = StatisticUseQuery.getPitchesByRevenue({
    limit: 5,
  });

  if (isLoading) {
    <div className="space-y-6">
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
    </div>;
  }
  if (error) {
    toast({
      title: "Đã có lỗi xảy ra khi tải những sân có doanh thu cao",
      variant: "destructive",
      description: "Đã có lỗi xảy ra",
    });
  }
  return (
    <>
      <div className="space-y-4">
        {data?.result?.data.map((e) => {
          const Icon = Icons[pitchTypeToIcon(e.pitch.type)];
          return (
            <div key={e.pitch_id} className="flex items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={e.pitch?.logo ?? FALLBACK_IMAGE_URL}
                  alt="Avatar"
                />
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="inline-flex items-center text-sm font-medium leading-none">
                  <div
                    className={cn(
                      "mr-2",
                      pitchTypeVariant({ variant: e.pitch.type })
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  {e.pitch?.name}
                </p>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {e.pitch?.address}
                </p>
              </div>
              <div className="ml-auto font-medium">
                <p>{formatMoney(e.revenue)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
