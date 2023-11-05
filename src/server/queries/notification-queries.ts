import {useQuery} from "@tanstack/react-query";
import {$fetch} from "@/lib/axios";

export class NotificationUseQuery {
    static getMany = (query: Record<string, any>) => {
        return useQuery({
            queryKey: ["notifications", query],
            queryFn: () =>
                $fetch(`/v1/notifications`, {
                    method: "GET",
                    params: query,
                }).then(res => res.data)
            ,
            cacheTime:100,
            keepPreviousData: true
        })
    }
    static getNumberOfUnread = () => {
        return useQuery({
            queryKey: ["unreadNotifications"],
            queryFn: () =>
                $fetch(`/v1/notifications/unread`, {
                    method: "GET",
                }).then(res => res.data)
            ,
            cacheTime:100,
            keepPreviousData: true
        })
    }
}