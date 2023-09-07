import {useQuery} from "@tanstack/react-query"
import {$fetch} from "@/lib/axios";
export class PostApi {
    static search = (query: Record<string, any>) => {
        return useQuery({
            queryKey: ["posts", query],
            queryFn: () =>
                $fetch(`https://jsonplaceholder.typicode.com/posts`, {
                    method: "GET",
                    params: query,
                }).then(res => res.data)
            ,
            cacheTime:100,
            keepPreviousData: true
        })
    }
}