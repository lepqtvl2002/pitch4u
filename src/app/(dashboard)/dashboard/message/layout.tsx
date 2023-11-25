"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PanelLeftClose, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { connectSocket, getSocket, joinChat, loadChats } from "../socket";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ChatObject } from "@/types/message";

export default function LayoutMessagePage({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpenSearch, setIsOpenSearch] = useState(true);
  const { data: session, status } = useSession();
  const [conversations, setConversations] = useState<ChatObject[]>([]);
  useMemo(() => {
    console.log("connect socket")
    if (status === "authenticated")
      connectSocket(session?.accessToken?.token as string);
  }, [session?.accessToken?.token, status]);

  const socket = getSocket();

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
            conversations.map((chat, idx) => (
              <Link
                key={String(idx)}
                href={`/dashboard/message/${chat.chat_id}?avatar=${chat.members[1]?.avatar}&fullname=${chat.members[1]?.fullname}`}
              >
                <MessageCard
                  avatarUrl={chat.members[1]?.avatar}
                  name={chat.members[1]?.fullname || "Unknown"}
                  lastMessage={chat?.last_message?.text}
                />
              </Link>
            ))
          ) : (
            <Skeleton className="w-10 h-10 rounded-full" />
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

function MessageCard({ avatarUrl, name, lastMessage }: any) {
  return (
    <div
      className={
        "flex space-x-2 items-center hover:bg-gray-300 cursor-pointer p-2 rounded max-w-xs"
      }
    >
      <Avatar className="h-8 w-8">
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <p className={"font-semibold text-lg truncate"}>{name}</p>
        <span className={"text-sm truncate"}>{lastMessage}</span>
      </div>
    </div>
  );
}
