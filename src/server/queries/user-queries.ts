import {useQuery} from "@tanstack/react-query";
import {$fetch} from "@/lib/axios";

export class UserUseQuery {
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

    static getProfile = () => {
        return useQuery({
            queryKey: ["profile"],
            queryFn: () =>
                $fetch(`/v1/users/profile`, {
                    method: "GET",
                }).then(res => res.data)
            ,
            cacheTime:100,
            keepPreviousData: true
        })
    }
}