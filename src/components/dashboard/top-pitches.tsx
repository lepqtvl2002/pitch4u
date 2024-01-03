import { StatisticUseQuery } from "@/server/queries/statistic-queries";
import { Avatar, AvatarImage } from "../ui/avatar";
import { FALLBACK_IMAGE_URL } from "@/lib/constants";
import { toast } from "../ui/use-toast";
import { Skeleton } from "../ui/skeleton";

export default function TopPitches() {
  const { data, isLoading, error } = StatisticUseQuery.getTopPitchesByRevenue({
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
        {data?.result?.data.map((pitch, index) => (
          <div key={index} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={pitch.pitch?.logo ?? FALLBACK_IMAGE_URL}
                alt="Avatar"
              />
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {pitch.pitch?.name}
              </p>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {pitch.pitch?.address}
              </p>
            </div>
            <div className="ml-auto font-medium">
              <p>
                {pitch?.revenue.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
