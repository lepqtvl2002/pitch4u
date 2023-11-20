// Define types for the objects in the members array
type Member = {
  avatar: string | null;
  user_id: number;
  fullname: string;
  phone: string;
  email: string;
  // Add other properties as needed
};

// Define types for the main objects
type LastMessage = {
  chat_id: number;
  createdAt: string;
  deletedAt: string | null;
  is_read: boolean;
  message_id: number;
  text: string;
  updatedAt: string;
  user_id: number;
  // Add other properties as needed
};

type ChatObject = {
  chat_id: number;
  createdAt: string;
  created_by: number;
  deletedAt: string | null;
  last_message: LastMessage;
  members: Member[];
  type: string;
  unread_message_count: number;
  updatedAt: string;
};
type Message = {
  chat_id: number;
  createdAt: string;
  deletedAt: string | null;
  is_read: boolean;
  message_id: number;
  text: string;
  updatedAt: string;
  user_id: number;
};

export const { ChatObject, Member, LastMessage, Message };
