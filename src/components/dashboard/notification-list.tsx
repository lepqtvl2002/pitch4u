"use client";

import { cn } from "@/lib/utils";
import { NotificationUseQuery } from "@/server/queries/notification-queries";
import { INotification } from "@/types/notification";
import { toast } from "../ui/use-toast";
import { Separator } from "../ui/separator";
import NotificationTypes from "@/enums/notificationTypes";
import {
  ClipboardCheck,
  MessageSquare,
  MessagesSquare,
  ThumbsUp,
} from "lucide-react";
import { format } from "date-fns";
import { NotificationUseMutation } from "@/server/actions/notification-actions";

export default function NotificationList() {
  const { data, isLoading, isError } = NotificationUseQuery.getMany({
    limit: 10,
    page: 1,
  });
  if (isLoading) return <span>Loading...</span>;
  if (isError) {
    toast({
      title: "Đã có lỗi trong khi tải thông báo",
      description: "Vui lòng thử lại",
      variant: "destructive",
    });
    return <span className="text-red-500">Error</span>;
  }
  return (
    <div className="flex flex-col min-h-[400px]">
      <h2 className="text-xl font-bold">Thông báo</h2>
      <Separator className="my-3" />
      <div className="max-h-[500px] overflow-y-auto">
        {data?.result.data.map((notification: INotification) => (
          <NotificationItem
            key={notification.notification_id}
            data={notification}
          />
        ))}
      </div>
    </div>
  );
}

function NotificationItem({ data }: { data: INotification }) {
  const { mutate } = NotificationUseMutation.markAsRead();
  return (
    <>
      <div className={cn("flex items-center")}>
        <div className="mr-2">
          {data.type === NotificationTypes.PostLike ? (
            <ThumbsUp className="text-blue-600" />
          ) : data.type === NotificationTypes.PostComment ? (
            <MessageSquare className="text-blue-500" />
          ) : data.type === NotificationTypes.PostReplyComment ? (
            <MessagesSquare className="text-blue-500" />
          ) : (
            <ClipboardCheck className="text-green-500" />
          )}
        </div>
        <div
          onClick={() => {
            if (!data.is_read) {
              mutate(data.notification_id);
              data.is_read = true;
            } else {
                data.is_read = false;
            }
          }}
          className="flex-col cursor-pointer"
        >
          <h5
            className={cn(
              "font-extrabold",
              data.is_read && "text-gray-500 font-semibold"
            )}
          >
            {data.data.text}
          </h5>
          <span className="text-sm text-gray-500">
            {format(new Date(data.createdAt), "HH:mm dd/MM/yyyy")}
          </span>
        </div>
      </div>
      <Separator className="my-3" />
    </>
  );
}
