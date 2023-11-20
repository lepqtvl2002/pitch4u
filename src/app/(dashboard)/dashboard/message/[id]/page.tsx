"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2Icon, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { getSocket, loadChats, loadMessages, sendMessage } from "../../socket";
import { Message } from "@/types/message";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function MessagePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [text, setText] = useState("");
  const [maximumNumberOfMessages, setMaximumNumberOfMessages] = useState(1);
  const { id } = useParams();
  const searchParams = useSearchParams();
  const route = useRouter();
  const socket = getSocket();

  useEffect(() => {
    loadMessages({ chatId: id as string, page });
  }, [id, page]);

  useEffect(() => {
    const onLoadMessages = (msgs: any) => {
      const { data, total } = msgs;
      setMessages([...messages, ...data]);
      setMaximumNumberOfMessages(total);
    };
    function onNewMessage(msg: Message) {
      console.log(msg.text);
      setMessages([msg, ...messages]);
    }
    loadChats();

    if (socket) {
      socket.on("load_messages", onLoadMessages);
      socket.on("read_message", onReadMessage);
      socket.on("message", onNewMessage);
    } else {
      route.push("/dashboard/message");
    }
    // Scroll to the most recent message when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, route, socket]);

  const onReadMessage = () => {};

  const handleSendMessage = () => {
    sendMessage({ chatId: id as string, text });
    setText("");
  };

  return (
    <div className={"flex-1 bg-gray-50 h-full relative"}>
      <div
        className={
          "flex justify-between items-center bg-white p-2 border-b border-b-gray-300 shadow"
        }
      >
        <div className={"flex items-center space-x-2"}>
          <Avatar className="h-10 w-10s">
            <AvatarImage
              src={searchParams.get("avatar") as string}
              alt={"name"}
            />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
          <span className={"font-semibold text-lg"}>
            {searchParams.get("fullname") as string}
          </span>
        </div>
        <Button variant={"ghost"}>
          <MoreHorizontal />
        </Button>
      </div>
      <div className={"flex-1 flex-col"}>
        <div
          ref={chatContainerRef}
          className={
            "absolute top-16 bottom-16 left-0 right-0 px-2 overflow-y-auto"
          }
        >
          <div>
            {messages.length ? (
              <MessageList messages={messages} />
            ) : (
              <Loader2Icon className="animate-spin m-auto" />
            )}
          </div>
        </div>
        <div className={"absolute bottom-0 left-0 right-0"}>
          <MessageInput
            message={text}
            setMessage={setText}
            sendMessage={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}

// MessageList.js
function MessageList({ messages }: { messages: Message[] }) {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col-reverse w-full space-y-0.5 max-h-full">
      {messages?.map((message, index: number) => {
        return (
          <div
            key={message.message_id}
            className={cn(
              "w-full flex relative",
              message.user_id === Number(session?.user.userId)
                ? "justify-end"
                : "justify-start"
            )}
          >
            <div
              className={cn(
                "flex items-start py-2 px-4 rounded-3xl bg-blue-200"
              )}
            >
              <p className={cn("max-w-sm xl:max-w-lg break-all")}>
                {message.text}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// MessageInput.js
function MessageInput({
  message,
  setMessage,
  sendMessage,
}: {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: any;
}) {
  return (
    <div className="flex space-x-2 p-2">
      <Input
        className={"flex-1"}
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") sendMessage();
        }}
      />
      <Button onClick={sendMessage}>Send</Button>
    </div>
  );
}
