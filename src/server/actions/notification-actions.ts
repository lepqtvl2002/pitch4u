import { $fetch } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export class NotificationUseMutation {
  static markAsRead = () => {
    return useMutation({
      mutationFn: (notificationId : string | number) =>
        $fetch(`/v1/notifications/${notificationId}`, {
          method: "PATCH",
        }),
      onSuccess: (data) => data,
      onError: (error) => error,
    });
  };
}
