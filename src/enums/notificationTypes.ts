enum NotificationTypes {
  PostLike = "post_like",
  PostComment = "post_comment",
  PostReplyComment = "post_reply_comment",
  PostLikeReplyComment = "post_like_reply_comment",
}

export default NotificationTypes;

export type NotificationType =
  | NotificationTypes.PostLike
  | NotificationTypes.PostComment
  | NotificationTypes.PostReplyComment
  | NotificationTypes.PostLikeReplyComment;
