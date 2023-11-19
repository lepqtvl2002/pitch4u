"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, PanelLeftClose, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { connectSocket, getSocket, joinChat, loadChats } from "../socket";
import { Skeleton } from "@/components/ui/skeleton";

import { useSession } from "next-auth/react";

export default function MessagePage() {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [messages, setMessages] = useState(messageList);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [conversations, setConversations] = useState([]);
  console.log("1 :>> ", conversations);
  const { data: session } = useSession();
  connectSocket(session?.accessToken?.token || " ");
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

  function onNewMessage(msg: any) {
    loadChats();
  } // nhan tin nhan moi

  useEffect(() => {
    loadChats();
    socket.on("read_message", onReadMessage);
    socket.on("load_chats", onLoadChats);
    socket.on("message", onNewMessage);
  }, []);

  useEffect(() => {
    // Scroll to the most recent message when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
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
          <MessageCard
            avatarUrl={"https://i.imgur.com/qMAdfYS.jpg"}
            name={"Chat name 1 sajhd  jsahdjsah dsajhsd ja"}
          />
          {conversations.length ? (
            conversations.map((chat, idx) => (
              <MessageCard
                key={String(idx)}
                avatarUrl={"https://i.imgur.com/qMAdfYS.jpg"}
                name={"Chat name 1 sajhd  jsahdjsah dsajhsd ja"}
              />
            ))
          ) : (
            <Skeleton className="w-10 h-10 rounded-full" />
          )}
        </div>
      </div>

      <div className={"flex-1 bg-gray-50 h-full relative"}>
        <div
          className={
            "flex justify-between items-center bg-white p-2 border-b border-b-gray-300 shadow"
          }
        >
          <div className={"flex items-center space-x-2"}>
            <Avatar className="h-10 w-10s">
              <AvatarImage src={"avatarUrl"} alt={"name"} />
              <AvatarFallback>{"name".charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className={"font-semibold text-lg"}>Chat name 1</span>
          </div>
          <Button variant={"ghost"}>
            <MoreHorizontal />
          </Button>
        </div>
        <div className={"flex-1 flex-col"}>
          <div
            className={
              "absolute top-16 bottom-16 left-0 right-0 px-2 pl-12 overflow-y-auto"
            }
            ref={chatContainerRef}
          >
            <MessageList messages={messages} />
          </div>
          <div className={"absolute bottom-0 left-0 right-0"}>
            <MessageInput
              sendMessage={(message: any) => {
                setMessages([...messages, message]);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageCard({ avatarUrl, name }: any) {
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
      <span className={"font-semibold text-lg truncate"}>{name}</span>
    </div>
  );
}

const messageList = [
  {
    id: 1,
    sender: 1,
    content: "hello",
  },
  {
    id: 2,
    sender: 2,
    content: "hello1",
  },
  {
    id: 3,
    sender: 2,
    content: "hello3",
  },
];

// MessageList.js
function MessageList({ messages }: { messages: any }) {
  return (
    <div className="flex flex-col w-full space-y-0.5 max-h-full">
      {messages.map((message: any, index: number) => {
        const isFirstMessageBySender =
          index === 0 || messages[index - 1].sender !== message.sender;
        const isLastMessageBySender =
          index === messages.length - 1 ||
          messages[index + 1].sender !== message.sender;
        return (
          <div
            key={message.id}
            className={cn(
              "w-full flex relative",
              message.sender === 1 ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "flex items-start py-2 px-4 rounded-3xl bg-blue-200",
                message.sender === 1
                  ? isFirstMessageBySender
                    ? "rounded-br"
                    : isLastMessageBySender
                    ? "rounded-tr"
                    : "rounded-r"
                  : isFirstMessageBySender
                  ? "rounded-bl"
                  : isLastMessageBySender
                  ? "rounded-tl"
                  : "rounded-l"
              )}
            >
              {isLastMessageBySender && message.sender !== 1 ? (
                <Avatar className="h-8 w-8 border absolute -left-10">
                  <AvatarImage
                    src={message.sender.toString()}
                    alt={message.sender.toString()}
                  />
                  <AvatarFallback>
                    {message.sender.toString().charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ) : null}
              <p className={cn("max-w-sm xl:max-w-lg break-all")}>
                {message.content}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// MessageInput.js
function MessageInput({ sendMessage }: { sendMessage: any }) {
  const [message, setMessage] = useState("");

  const handleMessageSend = () => {
    if (message.trim() !== "") {
      sendMessage({
        id: Math.random(),
        sender: 1,
        content: message,
      });
      setMessage("");
    }
  };

  return (
    <div className="flex space-x-2 p-2">
      <Input
        className={"flex-1"}
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyUp={(e) => {
          console.log(e);
          if (e.key === "Enter") handleMessageSend();
        }}
      />
      <Button onClick={handleMessageSend}>Send</Button>
    </div>
  );
}
