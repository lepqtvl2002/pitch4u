"use client";

import { BotMessageSquareIcon, SendHorizontalIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { chatSession } from "@/lib/genAI";
import { errorToastWithCode } from "@/lib/quick-toast";

export default function Chatbot() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "model"; parts: { text: string }[] }[]
  >([]);
  const [value, setValue] = useState("");

  const handleSendMessage = async () => {
    setMessages([
      {
        role: "user",
        parts: [{ text: value }],
      },
      ...messages,
    ]);
    setIsLoading(true);
    try {
      const result = await chatSession.sendMessage(value);

      console.log(result.response);
      setMessages([
        {
          role: "model",
          parts: [{ text: result.response.text().toString() }],
        },
        ...messages,
      ]);
      setValue("");
    } catch (error) {
      console.log(error);
      errorToastWithCode({ actionName: "send message", code: 400 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Popover>
      <PopoverTrigger className="fixed bottom-20 right-10 z-50 ">
        <div className="bg-primary p-4 rounded-full text-white relative">
          <BotMessageSquareIcon />
          <div className="animate-ping bg-emerald-500 w-10 h-10 absolute top-2 left-2 rounded-full" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-screen md:w-[360px] min-h-[60vh]">
        <div className="flex flex-col gap-2">
          <div className="flex-1">
            <MessageList isSending={isLoading} messages={messages} />
          </div>
          <div className="flex gap-2 fixed bottom-1 right-2 left-2">
            <Input
              placeholder="Nhập tin nhắn"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button
              disabled={isLoading || value.trim().length === 0}
              onClick={handleSendMessage}
            >
              <SendHorizontalIcon />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function MessageList({
  isSending,
  messages,
}: {
  isSending: boolean;
  messages: {
    role: "user" | "model";
    parts: { text: string }[];
  }[];
}) {
  return (
    <div className="flex flex-col-reverse w-full space-y-0.5 max-h-full">
      {messages.length === 0 && <p>Bắt đầu trò chuyện với Chatbot nào !!!</p>}
      {isSending && (
        <div className="w-full flex">
          <div className="flex items-start py-2 px-4 rounded-3xl bg-green-200/30">
            <p className="max-w-sm xl:max-w-lg break-all">Loading...</p>
          </div>
        </div>
      )}
      {messages?.map((message, index: number) => {
        const isYou = message.role === "user";
        return (
          <div
            key={index}
            className={cn(
              "w-full flex relative",
              isYou ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "flex items-start py-2 px-4 rounded-3xl",
                isYou ? "bg-green-200/30" : "bg-gray-200/30"
              )}
            >
              <p className={cn("max-w-sm xl:max-w-lg break-all")}>
                {message.parts[0].text}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
