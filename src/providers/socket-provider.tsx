"use client";
import { useSession } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const SocketContext = createContext<{
  socket?: Socket;
  connectSocket: () => void;
  getSocket: () => Socket | undefined;
  createChat: (userId: string) => void;
  loadChats: () => void;
  loadMessages: (params: {
    chatId: string;
    page?: number;
    limit?: number;
  }) => void;
  readMessage: (messageId: string) => void;
  sendMessage: (params: { chatId: string; text: string }) => void;
  joinChat: (chatId: string) => void;
}>({
  socket: undefined,
  connectSocket: () => {},
  getSocket: () => undefined,
  createChat: () => {},
  loadChats: () => {},
  loadMessages: () => {},
  readMessage: () => {},
  sendMessage: () => {},
  joinChat: () => {},
});

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [socket, setSocket] = useState<Socket>();
  const { data } = useSession();

  const connectSocket = (): void => {
    const newSocket = io(process.env.NEXT_PUBLIC_BACKEND_URL as string, {
      extraHeaders: {
        Authorization: `Bearer ${data?.accessToken?.token}`,
      },
      autoConnect: false,
    });
    setSocket(newSocket);
    if (newSocket) newSocket.connect();
    console.log("connect socket");
  };

  const getSocket = (): Socket | undefined => socket;

  const createChat = (userId: string): void => {
    socket?.emit("create_chat", { userId });
  };

  const loadChats = (): void => {
    socket?.emit("load_chats");
  };

  const loadMessages = ({
    chatId,
    page = 1,
    limit = 20,
  }: {
    chatId: string;
    page?: number;
    limit?: number;
  }): void => {
    socket?.emit("load_messages", { chatId, page, limit });
  };

  const readMessage = (messageId: string): void => {
    socket?.emit("read_message", { messageId });
  };

  const sendMessage = ({
    chatId,
    text,
  }: {
    chatId: string;
    text: string;
  }): void => {
    socket?.emit("message", { chatId, text });
  };

  const joinChat = (chatId: string): void => {
    socket?.emit("join_chat", { chatId });
  };

  useEffect(() => {
    connectSocket();
  }, [data?.accessToken?.token]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        connectSocket,
        getSocket,
        createChat,
        loadChats,
        loadMessages,
        readMessage,
        sendMessage,
        joinChat,
      }}
    >
      {/* Your new code goes here */}
      {children}
    </SocketContext.Provider>
  );
}
