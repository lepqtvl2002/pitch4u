"use client";
import { cn } from "@/lib/utils";
import { ChatObject, Message } from "@/types/message";
import { useSession } from "next-auth/react";
import { Input } from "./input";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
  ArrowLeftIcon,
  Loader2Icon,
  MessageCircleIcon,
  MoreHorizontal,
  PanelLeftCloseIcon,
  SearchIcon,
  Send,
  XIcon,
} from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { SocketContext } from "@/providers/socket-provider";
import useDebounce from "@/hooks/use-debounce";
import { UserUseQuery } from "@/server/queries/user-queries";
import { UserUseMutation } from "@/server/actions/user-actions";
import Link from "next/link";
import { Skeleton } from "./skeleton";
import { mutatingToast } from "@/lib/quick-toast";
import { AvatarCustom } from "./avatar-custom";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { NotificationBadge } from "../notification-badge";

// MessageList.js
export function MessageList({
  messages,
  sendingMessages,
}: {
  messages: { user_id: number; text: string }[];
  sendingMessages?: { text: string }[];
}) {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col-reverse w-full space-y-0.5 max-h-full">
      {sendingMessages?.map((message, index) => {
        return (
          <div key={index} className={cn("w-full flex justify-end")}>
            <div
              className={cn(
                "flex items-start py-2 px-4 rounded-3xl bg-green-200/30 animate-pulse"
              )}
            >
              <p className={cn("max-w-sm xl:max-w-lg break-all")}>
                {message.text}
              </p>
            </div>
          </div>
        );
      })}
      {messages?.map((message, index: number) => {
        const isYou = message.user_id == Number(session?.user.userId);
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
      <Button disabled={message.trim().length === 0} onClick={sendMessage}>
        <Send />
      </Button>
    </div>
  );
}

// Message Card
export function MessageCard({
  avatarUrl,
  name,
  lastMessage,
  lastUser = "",
  onClick,
  className,
}: {
  avatarUrl?: string | null;
  name?: string | null;
  lastMessage: string;
  lastUser?: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex space-x-2 items-center hover:bg-gray-300 cursor-pointer p-2 rounded md:max-w-xs w-full overflow-hidden",
        className
      )}
      onClick={onClick}
    >
      <AvatarCustom avatarUrl={avatarUrl} name={name ?? "Unknown"} />
      <div className="flex flex-col w-60">
        <p className="font-semibold text-lg truncate">{name}</p>
        <span className="text-sm truncate">{`${lastUser}: ${lastMessage}`}</span>
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
  const [sendingMessages, setSendingMessages] = useState<{ text: string }[]>(
    []
  );
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
      setSendingMessages((prev) => prev.filter((e) => e.text !== msg.text));
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
  }, [messages, sendingMessages, route, socket]);

  const onReadMessage = () => {};

  const handleSendMessage = () => {
    setSendingMessages([{ text }, ...sendingMessages]);
    sendMessage({ chatId: id as string, text: text.trim() });
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
          <Button
            className="md:hidden"
            variant="ghost"
            size="icon"
            onClick={() => route.back()}
          >
            <ArrowLeftIcon />
          </Button>
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
                sendingMessages={sendingMessages}
              />
            ) : (
              <Loader2Icon className="animate-spin m-auto" />
            )}
          </div>
        </div>
        <div className={"fixed md:absolute bottom-0 left-0 right-0"}>
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

export function SidebarChats({
  area = "dashboard",
  className,
}: {
  className?: string;
  area: "dashboard" | "admin";
}) {
  const [isOpenSearch, setIsOpenSearch] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const debounceValue = useDebounce(searchValue);
  const [conversations, setConversations] = useState<ChatObject[]>([]);
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = useParams();

  const { socket, loadChats, joinChat, connectSocket } =
    useContext(SocketContext);

  const { data, isLoading } = UserUseQuery.getManyUsers({
    q: searchValue,
  });

  const { mutateAsync: joinChatMutate } = UserUseMutation.joinChat();

  useEffect(() => {
    function onLoadChats(chats: any) {
      chats.sort((a: any, b: any) => {
        const timeA = new Date(a.last_message?.createdAt);
        const timeB = new Date(b.last_message?.createdAt);
        return (timeB as any) - (timeA as any);
      });
      setConversations(chats);

      chats.forEach((c: any) => joinChat(c.chat_id));
    } // list cac cuoc tro chuyen

    if (socket) {
      loadChats();
      socket.on("load_chats", onLoadChats);
    } else {
      connectSocket();
    }
  }, [socket]);

  return (
    <div
      className={cn(
        "relative flex flex-col border-r border-r-gray-300 overflow-hidden",
        isOpenSearch ? "w-screen md:w-auto" : "w-screen md:w-20",
        className,
        id && "hidden md:block"
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
          className="hidden md:block"
        >
          {isOpenSearch ? <PanelLeftCloseIcon /> : <SearchIcon />}
        </Button>
      </div>
      <div
        className={
          "absolute top-16 bottom-0 left-0 right-0 flex flex-col space-y-3 p-2 overflow-y-auto"
        }
      >
        {conversations.length && !searchValue.length ? (
          conversations
            .filter((chat) =>
              chat.members.find((e) => e.email !== session?.user.email)
            )
            .map((chat) => {
              const user = chat.members.find(
                (e) => e.email !== session?.user.email
              );

              return (
                <Link
                  key={user?.user_id.toString()}
                  href={`/${area}/message/${
                    chat.chat_id
                  }?avatar=${user?.avatar?.toString()}&fullname=${user?.fullname.toString()}`}
                >
                  <MessageCard
                    avatarUrl={user?.avatar || "/fallback-avatar.png"}
                    name={user?.fullname || "Unknown"}
                    lastMessage={chat?.last_message?.text}
                    lastUser={
                      chat?.last_message?.user_id == session?.user?.userId
                        ? "you"
                        : user?.fullname
                    }
                  />
                </Link>
              );
            })
        ) : isLoading ? (
          <Skeleton className="w-10 h-10 rounded-full" />
        ) : (
          debounceValue.length > 0 &&
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
            return !chat ? (
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
                  avatarUrl={user.avatar}
                  name={user.fullname || "Unknown"}
                  lastMessage={""}
                />
              </div>
            ) : (
              <Link
                key={user.user_id}
                href={`/${area}/message/${
                  (chat as ChatObject).chat_id
                }?avatar=${user.avatar}&fullname=${user.fullname}`}
              >
                <MessageCard
                  avatarUrl={user.avatar}
                  name={user.fullname || "Unknown"}
                  lastMessage={(chat as ChatObject)?.last_message?.text}
                />
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}

export function ChatOverview() {
  return (
    <div className={"hidden md:flex flex-col flex-1 h-full relative"}>
      <div
        className={
          "flex justify-between items-center p-2 border-b border-b-gray-300 shadow"
        }
      >
        <div className={"flex items-center space-x-2"}>
          <Skeleton className="w-10 h-10 rounded-full" />
        </div>

        <Button variant={"ghost"}>
          <MoreHorizontal />
        </Button>
      </div>
      <div className="w-full h-full text-center pt-20">
        <span className="m-auto">Qua trái và tìm kiếm cuộc trò chuyện nào</span>
      </div>
    </div>
  );
}

export function PopupChatList({ className }: { className?: string }) {
  const [searchValue, setSearchValue] = useState("");
  const debounceValue = useDebounce(searchValue);
  const [conversations, setConversations] = useState<ChatObject[]>([]);
  const { data: session } = useSession();
  const [openPopup, setOpenPopup] = useState(false);
  const [user, setUser] = useState<{
    avatar?: string | null;
    fullname?: string | null;
  }>({ avatar: "", fullname: "" });
  const [chatId, setChatId] = useState("");

  const { socket, loadChats, joinChat, connectSocket } =
    useContext(SocketContext);

  const { data, isLoading } = UserUseQuery.getManyUsers({
    q: debounceValue,
  });

  const { mutateAsync: joinChatMutate } = UserUseMutation.joinChat();

  useEffect(() => {
    function onLoadChats(chats: any) {
      chats.sort((a: any, b: any) => {
        const timeA = new Date(a.last_message?.createdAt);
        const timeB = new Date(b.last_message?.createdAt);
        return (timeB as any) - (timeA as any);
      });
      setConversations(chats);

      chats.forEach((c: any) => joinChat(c.chat_id));
    } // list cac cuoc tro chuyen

    if (socket) {
      loadChats();
      socket.on("load_chats", onLoadChats);
    } else {
      connectSocket();
    }
  }, [socket]);

  return (
    <div className={cn("relative flex flex-col overflow-hidden", className)}>
      <div className={"flex justify-center p-2 border-b border-b-gray-300"}>
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className={cn("flex-1")}
          placeholder={"Tìm kiếm"}
          type={"text"}
          autoFocus={false}
        />
      </div>
      <div
        className={
          "flex flex-col h-[76vh] md:h-[60vh] md:min-h-[400px] space-y-3 p-2 overflow-y-auto"
        }
      >
        {conversations.length && !debounceValue.length ? (
          conversations
            .filter((chat) =>
              chat.members.find((e) => e.email !== session?.user.email)
            )
            .map((chat) => {
              const user = chat.members.find(
                (e) => e.email !== session?.user.email
              );

              return (
                <MessageCard
                  key={user?.user_id.toString()}
                  onClick={() => {
                    setUser({ avatar: user?.avatar, fullname: user?.fullname });
                    setChatId((chat as ChatObject).chat_id.toString());
                    setOpenPopup(true);
                  }}
                  avatarUrl={user?.avatar}
                  name={user?.fullname}
                  lastMessage={chat?.last_message?.text}
                  lastUser={
                    chat?.last_message?.user_id == session?.user?.userId
                      ? "you"
                      : user?.fullname
                  }
                />
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
            return !chat ? (
              <MessageCard
                key={user.user_id}
                onClick={async () => {
                  mutatingToast();
                  const newChat = await joinChatMutate(user.user_id);
                  joinChat(newChat.result.chat_id);
                  setUser({ avatar: user.avatar, fullname: user.fullname });
                  setChatId(newChat.result.chat_id);
                  setOpenPopup(true);
                }}
                avatarUrl={user.avatar}
                name={user.fullname}
                lastMessage={""}
              />
            ) : (
              <MessageCard
                key={user.user_id}
                onClick={() => {
                  setUser({ avatar: user.avatar, fullname: user.fullname });
                  setChatId((chat as ChatObject).chat_id.toString());
                  setOpenPopup(true);
                }}
                avatarUrl={user.avatar}
                name={user.fullname}
                lastMessage={(chat as ChatObject)?.last_message?.text}
                lastUser={
                  (chat as ChatObject).last_message?.user_id ==
                  session?.user?.userId
                    ? "you"
                    : user?.fullname
                }
              />
            );
          })
        )}
      </div>
      {openPopup && (
        <PopupChat
          id={chatId}
          user={user}
          open={openPopup}
          onClose={() => {
            setOpenPopup(false);
          }}
        />
      )}
    </div>
  );
}

// Chat detail
export function PopupChat({
  id,
  user,
  open,
  onClose,
}: {
  id: string;
  user: {
    avatar?: string | null;
    fullname?: string | null;
  };
  open: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sendingMessages, setSendingMessages] = useState<{ text: string }[]>(
    []
  );
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [text, setText] = useState("");
  const [maximumNumberOfMessages, setMaximumNumberOfMessages] = useState(1);
  const route = useRouter();
  const { socket, connectSocket, loadMessages, loadChats, sendMessage } =
    useContext(SocketContext);

  useEffect(() => {
    loadMessages({ chatId: id, page });
  }, [id, page]);

  useEffect(() => {
    const onLoadMessages = (msgs: any) => {
      const { data, total } = msgs;
      setMessages([...messages, ...data]);
      setMaximumNumberOfMessages(total);
    };
    function onNewMessage(msg: Message) {
      setSendingMessages((prev) => prev.filter((e) => e.text !== msg.text));
      setMessages([msg, ...messages]);
    }
    loadChats();

    if (socket) {
      socket.on("load_messages", onLoadMessages);
      socket.on("read_message", onReadMessage);
      socket.on("message", onNewMessage);
    } else {
      console.log("cannot connect to socket");
    }
    // Scroll to the most recent message when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, sendingMessages, route, socket]);

  const onReadMessage = () => {};

  const handleSendMessage = () => {
    setSendingMessages([{ text }, ...sendingMessages]);
    sendMessage({ chatId: id, text: text.trim() });
    setText("");
  };

  return (
    <div
      className={cn(
        "h-full w-full fixed bottom-0 right-0 bg-white",
        !open && "hidden"
      )}
    >
      <div
        className={
          "flex justify-between items-center p-2 border-b border-b-gray-300 shadow"
        }
      >
        <div className={"flex items-center space-x-2"}>
          <AvatarCustom
            avatarUrl={user.avatar}
            name={user.fullname ?? "Unknown"}
          />
          <span className={"font-semibold text-lg"}>{user.fullname}</span>
        </div>
        <Button variant={"ghost"}>
          <XIcon onClick={onClose} />
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
                sendingMessages={sendingMessages}
              />
            ) : (
              <Loader2Icon className="animate-spin m-auto" />
            )}
          </div>
        </div>
        <div className={"fixed md:absolute bottom-0 left-0 right-0"}>
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

export function PopupMessage() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          variant="ghost"
          className={"relative hover:bg-gray-200 rounded-full p-2"}
        >
          <NotificationBadge number={0} />
          <MessageCircleIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-screen md:w-[360px]">
        <PopupChatList />
      </PopoverContent>
    </Popover>
  );
}
