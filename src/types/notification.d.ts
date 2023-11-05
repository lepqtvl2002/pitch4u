export type INotification = {
  notification_id: number;
  user_id: number;
  data: {
    text: string;
    post_id: number;
    user_id: number;
    comment_id: number | null;
  };
  is_read: boolean;
  type: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
