import { BellIcon } from "lucide-react";
import { NotificationBadge } from "./notification-badge";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import NotificationList from "./notification-list";
import { NotificationUseQuery } from "@/server/queries/notification-queries";
import { useState } from "react";

export default function NotificationPopover() {
  const { data } = NotificationUseQuery.getNumberOfUnread();
  const [numberOfUnreadNotifications, setNumberOfUnreadNotifications] =
    useState(data?.result ?? 0);

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          variant="ghost"
          className={"relative hover:bg-gray-200 rounded-full p-2"}
        >
          {data ? (
            <NotificationBadge number={numberOfUnreadNotifications} />
          ) : null}
          <BellIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[360px]">
        <NotificationList
          onClickUnread={() => setNumberOfUnreadNotifications((pre) => pre - 1)}
        />
      </PopoverContent>
    </Popover>
  );
}
