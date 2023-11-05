import { useQuery } from "@tanstack/react-query";
import { $fetch, $globalFetch } from "@/lib/axios";

export class PitchUseQuery {
    static search = (query: Record<string, any>) => {
        return useQuery({
            queryKey: ["pitches", query],
            queryFn: () =>
                $globalFetch(`/v1/pitches`, {
                    method: "GET",
                    params: query,
                }).then(res => res.data)
            ,
            cacheTime: 100,
            keepPreviousData: true
        })
    }
    static getPitchBySlug = ({ slug }: { slug: string }) => {
        return useQuery({
            queryKey: ["pitch", slug],
            queryFn: () =>
                $globalFetch(`/v1/pitches/slugs/${slug}`, {
                    method: "GET"
                }).then(res => res.data)
            ,
            cacheTime: 100,
            keepPreviousData: true
        })
    }
    static getPitchDetail = ({ pitch_id }: { pitch_id: string | number }) => {
        return useQuery({
            queryKey: ["pitch", pitch_id],
            queryFn: () =>
                $globalFetch(`/v1/pitches/detail`, {
                    method: "GET",
                    params: { pitch_id }
                }).then(res => res.data)
            ,
            cacheTime: 100,
            keepPreviousData: true
        })
    }
    static getBookingStatus = (query: Record<string, any>) => {
        return useQuery({
            queryKey: ["pitchBookingStatus", query],
            queryFn: () =>
                $globalFetch(`/v1/pitches/booking-status`, {
                    method: "GET",
                    params: query
                }).then(res => res.data)
            ,
            cacheTime: 100,
            keepPreviousData: true
        })
    }
}