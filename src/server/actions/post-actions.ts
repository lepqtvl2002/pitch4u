import { REQUEST_URLS_CURRENT } from "@/config/request-urls";
import { $fetch } from "@/lib/axios";
import { successToast } from "@/lib/quick-toast";
import { useMutation } from "@tanstack/react-query";

export class PostUseMutation {
  static createPost = () =>
    useMutation({
      mutationFn: (data: { text: string; images: string[]; hastag?: string }) =>
        $fetch.post(REQUEST_URLS_CURRENT.POSTS, data).then((res) => res.data),
      onSuccess: () => {
        successToast({ actionName: "Tạo bài viết" });
      },
    });

  static likePost = () =>
    useMutation({
      mutationFn: (data: { post_id: string | number }) =>
        $fetch
          .post(`${REQUEST_URLS_CURRENT.POSTS}/like`, data)
          .then((res) => res.data),
    });

  static comment = () =>
    useMutation({
      mutationFn: (data: { post_id: string | number; text: string }) =>
        $fetch
          .post(`${REQUEST_URLS_CURRENT.POSTS}/comment`, data)
          .then((res) => res.data),
    });
}
