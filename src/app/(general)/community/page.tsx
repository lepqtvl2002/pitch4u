"use client";

import { AvatarCustom } from "@/components/ui/avatar-custom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PostUseMutation } from "@/server/actions/post-actions";
import { PostUseQuery } from "@/server/queries/post-queries";
import { IPost } from "@/types/post";
import {
  MessageCircleIcon,
  SendHorizontalIcon,
  Share2Icon,
  ThumbsUpIcon,
} from "lucide-react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreatePostForm } from "@/components/dashboard/create-post-form";

export default function CommunityPage() {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, refetch } =
    PostUseQuery.getPostsInfinite({});
  const { data: session, status } = useSession();
  const { mutateAsync: createPostMutate } = PostUseMutation.createPost();

  const lastPostElementRef = useRef(null);

  async function handleCreatePost() {
    createPostMutate({ text: "Hello", images: [] });
    await refetch();
  }

  function loadMorePosts() {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }

  useEffect(() => {
    if (status === "loading") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMorePosts();
        }
      },
      { threshold: 1 }
    );

    const currentRef = lastPostElementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [status, lastPostElementRef]);

  return (
    <div className="p-2 md:p-6 w-full max-w-2xl">
      {status === "loading" ? (
        "Loading..."
      ) : session ? (
        <CreatePostForm
          user={session.user}
          onSuccess={() => {
            refetch();
          }}
        />
      ) : null}
      <div className="flex flex-col gap-2">
        {data?.pages.map((page, pageIndex) =>
          page.result.data.map((post, postIndex) =>
            pageIndex === data.pages.length - 1 &&
            postIndex === page.result.data.length - 1 ? (
              <div key={post.post_id} ref={lastPostElementRef}>
                <PostItem post={post} user={session?.user} />
              </div>
            ) : (
              <PostItem key={post.post_id} post={post} user={session?.user} />
            )
          )
        )}
        {isFetchingNextPage ? "Đang tải thêm" : null}
      </div>
    </div>
  );
}

function PostItem({ post, user }: { post: IPost; user?: User }) {
  const { mutateAsync: likePostMutate } = PostUseMutation.likePost();

  const isLikedPost =
    user &&
    post.likes.findIndex((like) => like.user_like.user_id == user.userId) !==
      -1;

  const [isLiked, setIsLiked] = useState(isLikedPost);
  const [numberOfLike, setNumberOfLike] = useState(post.like_count);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  function handleLike(post_id: string | number) {
    likePostMutate({ post_id });
    setIsLiked(!isLiked);
    setNumberOfLike(isLiked ? numberOfLike - 1 : numberOfLike + 1);
  }
  return (
    <div
      key={post.post_id}
      className="grid gap-2 rounded-xl shadow-lg p-2 md:p-4 bg-white"
    >
      <div className="flex gap-2 items-center">
        <AvatarCustom
          avatarUrl={post.author.avatar}
          name={post.author.fullname}
        />
        <div>
          <div>{post.author.fullname}</div>
          <p className="text-sm text-gray-500">{post.createdAt}</p>
        </div>
      </div>
      <div>{post.text}</div>
      <div className="flex w-full overflow-auto">
        {post.media?.map((media) => (
          <Image
            key={media.media_id}
            alt={media.path}
            src={media.path}
            width={1000}
            height={1000}
            className="max-h-[60vh] object-contain"
          />
        ))}
      </div>
      <div className="flex justify-between items-center mt-2 -mb-2 md:-mb-3 border-t">
        <Button
          variant="ghost"
          className="flex-1"
          onClick={() => {
            handleLike(post.post_id);
          }}
        >
          {numberOfLike}
          <ThumbsUpIcon
            className="ml-2 text-emerald-500"
            fill={isLiked ? "currentColor" : "transparent"}
          />
        </Button>
        <Button
          variant="ghost"
          className="flex-1"
          onClick={() => {
            setIsOpenDialog(true);
          }}
        >
          {post.comment_count} <MessageCircleIcon className="ml-2" />
        </Button>
        <Button variant="ghost" className="flex-1">
          <Share2Icon />
        </Button>
      </div>
      <PostDialog
        post={post}
        user={user}
        open={isOpenDialog}
        setOpen={setIsOpenDialog}
      />
    </div>
  );
}

export function PostDialog({
  post,
  user,
  open,
  setOpen,
}: {
  post: IPost;
  user?: User;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen} modal={true}>
      <DialogContent className="sm:max-w-xl p-0 overflow-hidden">
        <ScrollArea className="max-h-screen md:max-h-[90vh] overflow-y-auto pb-10">
          <PostItem post={post} user={user} />
        </ScrollArea>
        <div className="flex justify-between fixed bottom-0 right-0 left-0 p-1 gap-2">
          <Input placeholder="Viết bình luận..." />
          <Button>
            <SendHorizontalIcon />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
