export interface IPost {
  post_id: number;
  user_id: number;
  author: User;
  text: string;
  hashtag: string;
  like_count: number;
  comment_count: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  media: Media[];
  likes: Like[];
}

interface Like {
  type: string;
  user_like: User;
}

interface User {
  avatar: string;
  user_id: number;
  fullname: string;
  phone: string;
  email: string;
  is_suspended: boolean;
}

interface Media {
  media_id: number;
  post_id: number;
  type: string;
  path: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
}

export interface IPostDetail extends IPost {
  comments: Comment[];
}

interface Comment {
  text: string;
  like_count: number;
  comment_id: number;
  parent_id: null;
  replies: Reply[];
  user_comment: Usercomment;
}

interface Reply {
  text: string;
  like_count: number;
  comment_id: number;
  parent_id: number;
  user_comment: Usercomment;
}

interface Usercomment {
  avatar: string;
  user_id: number;
  fullname: string;
  phone: string;
  email: string;
  is_suspended: boolean;
}
