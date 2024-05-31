import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { $fetch, $globalFetch } from "@/lib/axios";
import { REQUEST_URLS_CURRENT } from "@/config/request-urls";
import { LIMIT_DEFAULT } from "@/lib/constants";
import { config } from "./commom";
import { IPost, IPostDetail } from "@/types/post";

export class PostUseQuery {
  static getPostsInfinite = (params: Record<string, any>) => {
    return useInfiniteQuery({
      queryKey: ["posts", params],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await $fetch(REQUEST_URLS_CURRENT.POSTS, {
          params: {
            ...params,
            page: pageParam,
          },
        });
        return res.data as {
          result: { data: IPost[]; page: number; limit: number; total: number };
        };
      },
      getNextPageParam: (lastPage) => {
        if (
          lastPage?.result.page >=
          Math.floor(
            (lastPage?.result.total - 1) /
              (lastPage?.result.limit ?? LIMIT_DEFAULT) +
              1
          )
        )
          return false;
        return Number(lastPage?.result?.page + 1);
      },
    });
  };

  static getPostDetail = ({ post_id }: { post_id: string | number }) => {
    return useQuery({
      queryKey: ["postDetail", post_id],
      queryFn: () =>
        $globalFetch(`${REQUEST_URLS_CURRENT.POSTS}/${post_id}`).then(
          (res) => res.data as { result: IPostDetail }
        ),
      ...config,
    });
  };
}
