"use client";

import { cn } from "@/lib/utils";
import { INotification } from "@/types/notification";
import { Separator } from "./ui/separator";
import NotificationTypes, {
  notificationTypesArray,
} from "@/enums/notificationTypes";
import {
  BellRing,
  CheckCircle,
  ChevronDownIcon,
  ClipboardCheck,
  MessageSquare,
  MessagesSquare,
  SmileIcon,
  ThumbsUp,
} from "lucide-react";
import { format } from "date-fns";
import { NotificationUseMutation } from "@/server/actions/notification-actions";
import { Fragment, useState } from "react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { notificationTypeToString } from "@/lib/convert";
import { NotificationUseQuery } from "@/server/queries/notification-queries";

export default function NotificationList({
  onClickUnread,
}: {
  onClickUnread: () => void;
}) {
  const [isUnread, setIsUnread] = useState(false);
  const [isOpenFilterList, setIsOpenFilterList] = useState(false);
  const [types, setTypes] = useState<string[]>([]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isInitialLoading,
  } = NotificationUseQuery.getNotificationsInfinite();

  return (
    <div className="flex flex-col min-h-[400px] max-h-[80vh]">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Thông báo</h2>
        <UnreadSwitch
          unread={isUnread}
          setUnread={(value) => setIsUnread(value)}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button
          size="sm"
          onClick={() => setIsOpenFilterList((pre) => !pre)}
          variant="ghost"
        >
          Lọc theo loại thông báo
          <ChevronDownIcon
            className={cn(
              "ml-2 transition delay-150 duration-300 ease-in-out",
              isOpenFilterList && "rotate-180"
            )}
          />
        </Button>
      </div>
      <Separator className="my-3" />

      <div
        className={cn("flex flex-wrap gap-2", !isOpenFilterList && "hidden")}
      >
        {notificationTypesArray.map((type, index) => (
          <Button
            key={`${type}-${index}`}
            variant={types.includes(type) ? "default" : "outline"}
            onClick={() => {
              if (types.includes(type)) {
                setTypes(types.filter((t) => t !== type));
              } else {
                setTypes([...types, type]);
              }
            }}
            size="sm"
            className="gap-2"
          >
            {returnByTypeNotification(type)}
            {notificationTypeToString(type)}
          </Button>
        ))}
        <Separator className="my-3" />
      </div>

      <div className="max-h-[500px] overflow-y-auto no-scrollbar">
        {data?.pages.map((page, index) => {
          return (
            <Fragment key={index}>
              {page?.result.data
                .filter((notification: INotification) => {
                  if (isUnread) {
                    return !notification.is_read;
                  }
                  return true;
                })
                .filter((notification: INotification) => {
                  if (types.length === 0) return true;
                  return types.includes(notification.type);
                })
                .map((notification: INotification) => (
                  <Fragment key={notification.notification_id}>
                    <NotificationItem
                      onClickUnread={() => onClickUnread()}
                      data={notification}
                    />
                    <Separator className="my-3" />
                  </Fragment>
                ))}
            </Fragment>
          );
        })}
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage || isInitialLoading
            ? "Đang tải..."
            : hasNextPage
            ? "Tải thêm"
            : "Không có gì để hiển thị thêm"}
        </Button>
      </div>
    </div>
  );
}

function NotificationItem({
  data,
  onClickUnread,
}: {
  data: INotification;
  onClickUnread: () => void;
}) {
  const { mutate } = NotificationUseMutation.markAsRead();
  return (
    <div className={cn("flex items-center")}>
      <div className="mr-2">{returnByTypeNotification(data.type)}</div>
      <div
        onClick={() => {
          if (!data.is_read) {
            data.is_read = true;
            // onClickUnread();
            mutate(data.notification_id);
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
  );
}

export function UnreadSwitch({
  unread,
  setUnread,
}: {
  unread: boolean;
  setUnread: (unread: boolean) => void;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="unread">Chưa đọc</Label>
      <Switch
        id="unread"
        checked={unread}
        onCheckedChange={(checked) => {
          setUnread(checked);
        }}
      />
    </div>
  );
}

function returnByTypeNotification(type: string) {
  switch (type) {
    case NotificationTypes.PostLike:
      return <ThumbsUp className="text-blue-600" />;
    case NotificationTypes.PostComment:
      return <MessageSquare className="text-blue-500" />;
    case NotificationTypes.PostReplyComment:
      return <MessagesSquare className="text-blue-500" />;
    case NotificationTypes.PostLikeReplyComment:
      return <SmileIcon className="text-blue-500" />;
    case NotificationTypes.BookingCancel:
      return <ClipboardCheck className="text-gray-500" />;
    case NotificationTypes.BookingPending:
      return <ClipboardCheck className="text-yellow-500" />;
    case NotificationTypes.BookingApprove:
      return <CheckCircle className="text-green-500" />;
    case NotificationTypes.Success:
      return <ClipboardCheck className="text-green-500" />;
    case NotificationTypes.Canceled:
      return <ClipboardCheck className="text-red-500" />;
    default:
      return <BellRing className="text-gray-500" />;
  }
}
