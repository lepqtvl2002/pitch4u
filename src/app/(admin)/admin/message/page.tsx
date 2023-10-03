"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, PanelLeftClose, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export default function MessagePage() {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [messages, setMessages] = useState(messageList);
  const chatContainerRef = useRef<HTMLDivElement>(null);

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
          "flex flex-col border-r border-r-gray-300 overflow-hidden",
          isOpenSearch ? "w-auto" : "w-20"
        )}
      >
        <div className={"flex justify-end p-2 border-b border-b-gray-300"}>
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
        <div className={"flex flex-col space-y-3 p-2"}>
          <MessageCard avatarUrl={"asdda.png"} name={"Chat name 1"} />
          <MessageCard avatarUrl={"asdda.png"} name={"Chat name 2"} />
          <MessageCard avatarUrl={"asdda.png"} name={"Chat name 3"} />
        </div>
      </div>

      <div className={"flex-1 bg-gray-100 h-full relative"}>
        <div
          className={
            "flex justify-between items-center bg-white p-2 border-b border-b-gray-300 shadow"
          }
        >
          <div className={"flex items-center space-x-2"}>
            <Avatar className="h-8 w-8">
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
        "flex space-x-2 items-center hover:bg-gray-300 cursor-pointer p-2 rounded"
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
    content: "hello",
  },
  {
    id: 3,
    sender: 1,
    content:
      "helloshacasdhsajkdhsakjdhsakjdhkasjhdkajsdhkasjhdkjsahdkjashdkjashda dashdkasjdhsakjdhsakdjsah asjdhsakjdhaskjdh askdhsakjdhsakd",
  },
  {
    id: 4,
    sender: 1,
    content: "hello",
  },
  {
    id: 5,
    sender: 2,
    content: "hello",
  },
  {
    id: 6,
    sender: 1,
    content: "hello",
  },
  {
    id: 7,
    sender: 1,
    content: "hello",
  },
  {
    id: 8,
    sender: 2,
    content: "hello",
  },
  {
    id: 9,
    sender: 1,
    content: "hello",
  },
  {
    id: 10,
    sender: 1,
    content: "hello",
  },
  {
    id: 11,
    sender: 2,
    content: "hello",
  },
  {
    id: 12,
    sender: 2,
    content: "hello",
  },
  {
    id: 13,
    sender: 1,
    content: "hello",
  },
  {
    id: 14,
    sender: 1,
    content: "hello",
  },
  {
    id: 15,
    sender: 2,
    content: "hello",
  },
  {
    id: 16,
    sender: 1,
    content: "hello",
  },
  {
    id: 17,
    sender: 1,
    content: "hello",
  },
  {
    id: 18,
    sender: 2,
    content: "hello",
  },
  {
    id: 19,
    sender: 1,
    content: "hello",
  },
];

// MessageList.js
function MessageList({ messages }: { messages: any }) {
  return (
    <div className="flex flex-col w-full space-y-0.5 max-h-full">
      {messages.map((message: any, index: number) => (
        <div
          key={message.id}
          className={cn(
            "w-full flex relative",
            message.sender === 1 ? "justify-end" : "justify-start"
          )}
        >
          <div
            className={cn(
              "flex items-start py-2 px-4 rounded-full bg-blue-200",
              message.sender === 1 ? "rounded-br" : "rounded-bl"
            )}
          >
            {(index + 1 === messages.length ||
              messages[index + 1].sender === 1) &&
            message.sender !== 1 ? (
              <Avatar className="h-8 w-8 border absolute -left-10 -bottom-4">
                <AvatarImage
                  src={message.sender.toString()}
                  alt={message.sender.toString()}
                />
                <AvatarFallback>
                  {message.sender.toString().charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ) : null}
            <p className={cn("max-w-sm xl:max-w-xl break-words")}>
              {message.content}
            </p>
          </div>
        </div>
      ))}
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
