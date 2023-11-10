import { useQuery } from "@tanstack/react-query";
import { $fetch } from "@/lib/axios";
import { Data as DataStatisticOwner } from "@/app/(dashboard)/dashboard/page";

export class StatisticUseQuery {
  static getPitchStats = (query?: Record<string, any>) => {
    return useQuery({
      queryKey: ["statisticOwner", query],
      queryFn: () =>
        $fetch(`/v1/statistic/owner`, {
          method: "GET",
          params: query,
        }).then((res) => res.data as DataStatisticOwner),
      cacheTime: 100,
      keepPreviousData: true,
    });
  };
  static getSystemStats = (query?: Record<string, any>) => {
    return useQuery({
      queryKey: ["statisticSystem", query],
      queryFn: () =>
        $fetch(`/v1/statistic/system`, {
          method: "GET",
          params: query,
        }).then((res) => res.data),
      cacheTime: 100,
      keepPreviousData: true,
    });
  };
}
