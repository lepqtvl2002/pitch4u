import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { $fetch } from "@/lib/axios";
import { REQUEST_URLS_CURRENT } from "@/config/request-urls";
import { config } from "process";
import { LIMIT_DEFAULT } from "@/lib/constants";

export class NotificationUseQuery {
  static getMany = (query: Record<string, any>) => {
    return useQuery({
      queryKey: ["notifications", query],
      queryFn: () =>
        $fetch(REQUEST_URLS_CURRENT.NOTIFICATIONS, {
          params: query,
        }).then((res) => res.data),
      ...config,
    });
  };
  static getNotificationsInfinite = (params?: Record<string, any>) => {
    return useInfiniteQuery({
      queryKey: ["notifications"],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await $fetch(REQUEST_URLS_CURRENT.NOTIFICATIONS, {
          params: {
            ...params,
            page: pageParam,
          },
        });
        return res.data;
      },
      getNextPageParam: (lastPage, pages) => {
        if (
          pages?.length >=
          (lastPage?.result.pagination.total - 1) /
            (params?.limit ?? LIMIT_DEFAULT) +
            1
        )
          return false;
        return Number(lastPage?.result?.pagination?.page + 1);
      },
    });
  };
  static getNumberOfUnread = () => {
    return useQuery({
      queryKey: ["unreadNotifications"],
      queryFn: () =>
        $fetch(REQUEST_URLS_CURRENT.NOTIFICATIONS_UNREAD, {
          method: "GET",
        }).then((res) => res.data as { result: number }),
      ...config,
    });
  };
}
