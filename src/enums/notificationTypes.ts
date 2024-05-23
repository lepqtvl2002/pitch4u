enum NotificationTypes {
  PostLike = "post_like",
  PostComment = "post_comment",
  PostReplyComment = "post_reply_comment",
  PostLikeReplyComment = "post_like_reply_comment",
  BookingCancel = "booking_cancel",
  BookingPending = "booking_pending",
  BookingApprove = "booking_approve",
  Success = "success",
  Canceled = "canceled",
}

export default NotificationTypes;

export const notificationTypesArray = Object.values(NotificationTypes);

export type NotificationType =
  | NotificationTypes.PostLike
  | NotificationTypes.PostComment
  | NotificationTypes.PostReplyComment
  | NotificationTypes.PostLikeReplyComment
  | NotificationTypes.BookingCancel
  | NotificationTypes.BookingPending
  | NotificationTypes.BookingApprove
  | NotificationTypes.Success
  | NotificationTypes.Canceled;

export const groupNotifications = {
  booking: {
    title: "Đặt lịch",
    types: [
      NotificationTypes.BookingCancel,
      NotificationTypes.BookingPending,
      NotificationTypes.BookingApprove,
      NotificationTypes.Success,
      NotificationTypes.Canceled,
    ],
  },
  post: {
    title: "Tương tác bài viết",
    types: [
      NotificationTypes.PostLike,
      NotificationTypes.PostComment,
      NotificationTypes.PostReplyComment,
      NotificationTypes.PostLikeReplyComment,
    ],
  },
};
