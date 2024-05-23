import { useQuery } from "@tanstack/react-query";
import { $fetch } from "@/lib/axios";
import { REQUEST_URLS_CURRENT } from "@/config/request-urls";
import { config } from "process";

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
