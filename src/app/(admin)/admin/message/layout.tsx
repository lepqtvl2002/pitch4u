"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PanelLeftClose, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useContext, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ChatObject } from "@/types/message";
import { MessageCard } from "@/components/ui/message-components";
import { SocketContext } from "@/providers/socket-provider";
import { useSession } from "next-auth/react";

export default function LayoutMessagePage({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpenSearch, setIsOpenSearch] = useState(true);
  const [conversations, setConversations] = useState<ChatObject[]>([]);
  const { socket, loadChats, joinChat } = useContext(SocketContext);
  const { data: session } = useSession();

  function onReadMessage(msg: any) {
    loadChats();
  } // nguoi khac doc tin nhan
  function onLoadChats(chats: any) {
    chats.sort((a: any, b: any) => {
      const timeA = new Date(a.last_message?.createdAt);
      const timeB = new Date(b.last_message?.createdAt);

      return (timeB as any) - (timeA as any);
    });

    setConversations(chats);

    chats.forEach((c: any) => joinChat(c.chat_id));
  } // list cac cuoc tro chuyen

  useEffect(() => {
    if (socket) {
      loadChats();
      socket.on("read_message", onReadMessage);
      socket.on("load_chats", onLoadChats);
    }
  }, [socket]);

  return (
    <div className={"flex h-full"}>
      <div
        className={cn(
          "relative flex flex-col border-r border-r-gray-300 overflow-hidden",
          isOpenSearch ? "w-auto" : "w-20"
        )}
      >
        <div className={"flex justify-center p-2 border-b border-b-gray-300"}>
          <Input
            autoFocus={true}
            className={cn("flex-1", isOpenSearch ? "block" : "hidden")}
            placeholder={"Tìm kiếm"}
            type={"text"}
          />
          <Button
            onClick={() => setIsOpenSearch((pre) => !pre)}
            variant={"ghost"}
          >
            {isOpenSearch ? <PanelLeftClose /> : <Search />}
          </Button>
        </div>
        <div
          className={
            "absolute top-16 bottom-0 left-0 right-0 flex flex-col space-y-3 p-2 overflow-y-auto"
          }
        >
          {conversations.length ? (
            conversations.map((chat, idx) => {
              const user =
                chat.members.find((e) => e.email !== session?.user.email) ??
                chat.members[0];

              return (
                <Link
                  key={String(idx)}
                  href={`/dashboard/message/${chat.chat_id}?avatar=${user.avatar}&fullname=${user.fullname}`}
                >
                  <MessageCard
                    avatarUrl={user.avatar}
                    name={user.fullname || "Unknown"}
                    lastMessage={chat?.last_message?.text}
                  />
                </Link>
              );
            })
          ) : (
            <Skeleton className="w-10 h-10 rounded-full" />
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
