import {useQuery} from "@tanstack/react-query";
import {$fetch} from "@/lib/axios";

export class RegistrationUseQuery {
    static getMany = (query: Record<string, any>) => {
        return useQuery({
            queryKey: ["registrations", query],
            queryFn: () =>
                $fetch(`/v1/pitches/registrations`, {
                    method: "GET",
                    params: query,
                }).then(res => res.data)
            ,
            cacheTime:100,
            keepPreviousData: true
        })
    }
    static getOneById = (id: number | string) => {
        return useQuery({
            queryKey: ["registration", id],
            queryFn: () =>
                $fetch(`/v1/pitches/registrations/${id}`, {
                    method: "GET",
                }).then(res => res.data)
            ,
            cacheTime:100,
            keepPreviousData: true
        })
    }
}