
import { io, Socket } from 'socket.io-client';


let socket: Socket;

export const connectSocket = (token: string): void => {
  socket = io(process.env.NEXT_PUBLIC_BACKEND_URL as string, {
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
    autoConnect: false,
  });
  socket.connect();
};

export const getSocket = (): Socket => socket;

export const createChat = (userId: string): void => {socket?.emit('create_chat', { userId })};

export const loadChats = (): void =>{ socket?.emit('load_chats')};

export const loadMessages = ({ chatId, page = 1, limit = 20 }: { chatId: string; page?: number; limit?: number }): void => {
  socket?.emit('load_messages', { chatId, page, limit });
};

export const readMessage = (messageId: string): void => {socket?.emit('read_message', { messageId })};

export const sendMessage = ({ chatId, text }: { chatId: string; text: string }): void => {
  
  socket?.emit('message', { chatId, text });
};

export const joinChat = (chatId: string): void => {
  
  socket?.emit('join_chat', { chatId });
};
