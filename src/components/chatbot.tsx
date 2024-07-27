"use client";

import { BotMessageSquareIcon, SendHorizontalIcon, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { chatSession } from "@/lib/genAI";
import { errorToastWithCode } from "@/lib/quick-toast";
import Draggable from "react-draggable";

export default function Chatbot() {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "model"; parts: { text: string }[] }[]
  >([]);
  const [value, setValue] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    setMessages((messages) => [
      {
        role: "user",
        parts: [{ text: value }],
      },
      ...messages,
    ]);
    setValue("");
    setIsLoading(true);
    try {
      const result = await chatSession.sendMessage(value);
      setMessages((messages) => [
        {
          role: "model",
          parts: [{ text: result.response.text().toString() }],
        },
        ...messages,
      ]);
    } catch (error) {
      console.log(error);
      errorToastWithCode({ actionName: "send message", code: 400 });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Scroll to the most recent message when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Draggable>
        <PopoverTrigger
          className="fixed bottom-20 right-10 z-50"
          onTouchStart={() => setOpen(!open)}
        >
          <div className="bg-primary p-4 rounded-full text-white relative">
            {open ? <XIcon /> : <BotMessageSquareIcon />}
            <div className="animate-ping bg-emerald-500 w-10 h-10 absolute top-2 left-2 rounded-full" />
          </div>
        </PopoverTrigger>
      </Draggable>
      <PopoverContent
        ref={chatContainerRef}
        className="w-screen md:w-[360px] p-0 pb-10 overflow-hidden"
      >
        <div className="flex items-center gap-2 p-2 border-b text-white bg-emerald-400">
          <BotMessageSquareIcon
            size={40}
            className="rounded-full border p-2 bg-white text-emerald-500"
          />
          Bạn đang trò chuyện với Chatbot
        </div>
        <div className="flex flex-col gap-2 p-2 min-h-[60vh] max-h-[60vh] overflow-scroll no-scrollbar">
          <div className="flex-1">
            <MessageList isSending={isLoading} messages={messages} />
          </div>
          <form
            className="flex gap-2 fixed bottom-2 right-2 left-2"
            onSubmit={handleSendMessage}
          >
            <Input
              placeholder="Nhập tin nhắn"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button
              type="submit"
              disabled={isLoading || value.trim().length === 0}
              onClick={handleSendMessage}
            >
              <SendHorizontalIcon />
            </Button>
          </form>
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
    <div className="flex flex-col-reverse w-full space-y-1 max-h-full">
      {messages.length === 0 && (
        <p className="mt-10">Bắt đầu trò chuyện với Chatbot nào !!!</p>
      )}
      {isSending && (
        <div className="w-full flex">
          <div className="animate-pulse flex items-start py-2 px-4 rounded-3xl bg-gray-200/30">
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
              <p className={cn("max-w-sm xl:max-w-lg break-keep")}>
                {message.parts[0].text}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
