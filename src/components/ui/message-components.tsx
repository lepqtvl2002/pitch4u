import { cn } from "@/lib/utils";
import { ChatObject, Message } from "@/types/message";
import { useSession } from "next-auth/react";
import { Input } from "./input";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Loader2Icon, MoreHorizontal, PanelLeftCloseIcon, SearchIcon, Send } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { SocketContext } from "@/providers/socket-provider";
import useDebounce from "@/hooks/use-debounce";
import { UserUseQuery } from "@/server/queries/user-queries";
import { UserUseMutation } from "@/server/actions/user-actions";
import Link from "next/link";
import { Skeleton } from "./skeleton";
import { mutatingToast } from "@/lib/quick-toast";

// MessageList.js
export function MessageList({ messages }: { messages: Message[] }) {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col-reverse w-full space-y-0.5 max-h-full">
      {messages?.map((message, index: number) => {
        const isYou = message.user_id == Number(session?.user.userId);
        return (
          <div
            key={message.message_id}
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
        placeholder="Nhập tin nhắn..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") sendMessage();
        }}
      />
      <Button onClick={sendMessage}>
        <Send />
      </Button>
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

// Chat detail
export function ChatDetail({
  area = "dashboard",
}: {
  area: "dashboard" | "admin";
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [text, setText] = useState("");
  const [maximumNumberOfMessages, setMaximumNumberOfMessages] = useState(1);
  const { id } = useParams();
  const searchParams = useSearchParams();
  const route = useRouter();
  const { socket, connectSocket, loadMessages, loadChats, sendMessage } =
    useContext(SocketContext);

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
      setMessages([msg, ...messages]);
    }
    loadChats();

    if (socket) {
      socket.on("load_messages", onLoadMessages);
      socket.on("read_message", onReadMessage);
      socket.on("message", onNewMessage);
    } else {
      route.push(`/${area}/message`);
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
    <div className={"flex-1 h-full relative"}>
      <div
        className={
          "flex justify-between items-center p-2 border-b border-b-gray-300 shadow"
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
              <MessageList
                messages={messages?.filter((e) => e.chat_id == Number(id))}
              />
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

export function ContainerChats({
  area = "dashboard",
  children,
}: {
  area: "dashboard" | "admin";
  children: React.ReactNode;
}) {
  const [isOpenSearch, setIsOpenSearch] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const debounceValue = useDebounce(searchValue);
  const [conversations, setConversations] = useState<ChatObject[]>([]);
  const { data: session } = useSession();
  const router = useRouter();

  const { socket, loadChats, joinChat, connectSocket } =
    useContext(SocketContext);

  const { data, isLoading } = UserUseQuery.getManyUsers({
    q: searchValue,
  });

  const { mutateAsync: joinChatMutate } = UserUseMutation.joinChat();

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
    } else {
      connectSocket();
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
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className={cn("flex-1", isOpenSearch ? "block" : "hidden")}
            placeholder={"Tìm kiếm"}
            type={"text"}
          />
          <Button
            onClick={() => setIsOpenSearch((pre) => !pre)}
            variant={"ghost"}
          >
            {isOpenSearch ? <PanelLeftCloseIcon /> : <SearchIcon />}
          </Button>
        </div>
        <div
          className={
            "absolute top-16 bottom-0 left-0 right-0 flex flex-col space-y-3 p-2 overflow-y-auto"
          }
        >
          {conversations.length && !debounceValue.length ? (
            conversations.map((chat, idx) => {
              const user =
                chat.members.find((e) => e.email !== session?.user.email) ??
                chat.members[0];

              return (
                <Link
                  key={String(idx)}
                  href={`/${area}/message/${chat.chat_id}?avatar=${user.avatar}&fullname=${user.fullname}`}
                >
                  <MessageCard
                    avatarUrl={user.avatar}
                    name={user.fullname || "Unknown"}
                    lastMessage={chat?.last_message?.text}
                  />
                </Link>
              );
            })
          ) : isLoading ? (
            <Skeleton className="w-10 h-10 rounded-full" />
          ) : (
            data?.result.data?.map((user) => {
              let chat: ChatObject | undefined = undefined;
              conversations.forEach((conversation) => {
                if (
                  conversation.members.findIndex(
                    (member) => member.user_id == user.user_id
                  ) !== -1
                ) {
                  chat = conversation;
                  return;
                }
              });
              if (!chat) {
                return (
                  <div
                    key={user.user_id}
                    onClick={async () => {
                      mutatingToast();
                      const newChat = await joinChatMutate(user.user_id);
                      joinChat(newChat.result.chat_id);
                      router.push(
                        `/${area}/message/${newChat.result.chat_id}?avatar=${user.avatar}&fullname=${user.fullname}`
                      );
                    }}
                  >
                    <MessageCard
                      key={user.user_id}
                      avatarUrl={user.avatar}
                      name={user.fullname || "Unknown"}
                      lastMessage={""}
                    />
                  </div>
                );
              } else {
                return (
                  <Link
                    key={(chat as ChatObject)?.chat_id}
                    href={`/${area}/message/${
                      (chat as ChatObject).chat_id
                    }?avatar=${user.avatar}&fullname=${user.fullname}`}
                  >
                    <MessageCard
                      key={user.user_id}
                      avatarUrl={user.avatar}
                      name={user.fullname || "Unknown"}
                      lastMessage={(chat as ChatObject)?.last_message?.text}
                    />
                  </Link>
                );
              }
            })
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
