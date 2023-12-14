import { cn } from "@/lib/utils";
import { Message } from "@/types/message";
import { useSession } from "next-auth/react";
import { Input } from "./input";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

// MessageList.js
export function MessageList({ messages }: { messages: Message[] }) {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col-reverse w-full space-y-0.5 max-h-full">
      {messages?.map((message, index: number) => {
        return (
          <div
            key={message.message_id}
            className={cn(
              "w-full flex relative",
              message.user_id == Number(session?.user.userId)
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
export function MessageInput({
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

// Message Card
export function MessageCard({ avatarUrl, name, lastMessage }: any) {
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
