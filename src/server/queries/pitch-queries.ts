import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { $fetch, $globalFetch } from "@/lib/axios";
import { BookingPitch, IPitch } from "@/types/pitch";
import IPaginated from "@/types/paginated";
import { config } from "./commom";
import { REQUEST_URLS_CURRENT } from "@/config/request-urls";
import { LIMIT_DEFAULT } from "@/lib/constants";

type SubPitchConfigPriceType = {
  price_by_hour_id: number;
  time_frame: number[];
  price: number;
  subpitch_id: number;
  createdAt: String;
  updatedAt: String | null;
  deletedAt: String | null;
};

export class PitchUseQuery {
  static search = (query: Record<string, any>) => {
    return useQuery({
      queryKey: ["pitches", query],
      queryFn: () =>
        $globalFetch(REQUEST_URLS_CURRENT.PITCHES, {
          params: query,
        }).then((res) => res.data),
      ...config,
    });
  };

  static getPitchesInfinite = (params: Record<string, any>) => {
    return useInfiniteQuery({
      queryKey: ["pitches"],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await $globalFetch(REQUEST_URLS_CURRENT.PITCHES, {
          params: {
            ...params,
            page: pageParam,
          },
        });
        return res.data;
      },
      getNextPageParam: (lastPage, pages) => {
        if (
          pages?.length >
          (lastPage?.result.total - 1) / (params.limit ?? LIMIT_DEFAULT) + 1
        )
          return false;
        return Number(lastPage?.result?.page + 1);
      },
    });
  };

  static getAllPitches = (query: Record<string, any>) => {
    return useQuery({
      queryKey: ["pitches", query],
      queryFn: () =>
        $fetch(`/v1/pitches`, {
          params: query,
        }).then(
          (res) => res.data as { result: { data: IPitch[] } & IPaginated }
        ),
      ...config,
    });
  };
  static getMyPitches = (params?: Record<string, any>) => {
    return useQuery({
      queryKey: ["my-pitches", params],
      queryFn: () =>
        $fetch(REQUEST_URLS_CURRENT.MY_PITCHES, {
          params: params,
        }).then(
          (res) => res.data as { result: { data: IPitch[] } & IPaginated }
        ),
      ...config,
    });
  };
  static getPitchBySlug = ({ slug }: { slug: string }) => {
    return useQuery({
      queryKey: ["pitch", slug],
      queryFn: () =>
        $globalFetch(`${REQUEST_URLS_CURRENT.PITCH_SLUG}/${slug}`).then(
          (res) => res.data
        ),
      ...config,
    });
  };
  static getPitchDetail = ({ pitch_id }: { pitch_id: string | number }) => {
    return useQuery({
      queryKey: ["pitch", pitch_id],
      queryFn: () =>
        $globalFetch(REQUEST_URLS_CURRENT.PITCH_DETAIL, {
          params: { pitch_id },
        }).then((res) => res.data),
      ...config,
    });
  };
  static getBookingStatus = (query: Record<string, any>) => {
    return useQuery({
      queryKey: ["pitchBookingStatus", query],
      queryFn: () =>
        $globalFetch(REQUEST_URLS_CURRENT.PITCH_BOOKING_STATUS, {
          params: query,
        }).then((res) => res.data as { result: BookingPitch[] }),
      ...config,
    });
  };
  static getPitchesFavorite = (query: Record<string, any>) => {
    return useQuery({
      queryKey: ["pitchFavorite", query],
      queryFn: () =>
        $fetch(REQUEST_URLS_CURRENT.PITCHES_FAVORITE, {
          params: query,
        }).then((res) => res.data as { result: IPitch[] }),
      ...config,
    });
  };
  static getPitchTypes = () => {
    return useQuery({
      queryKey: ["pitchTypes"],
      queryFn: () =>
        $fetch(REQUEST_URLS_CURRENT.PITCH_TYPES).then(
          (res) => res.data as { result: Record<string, string> }
        ),
      ...config,
    });
  };

  static getSubPitchTypes = ({ pitchType }: { pitchType: string }) => {
    return useQuery({
      queryKey: ["subPitchTypes", pitchType],
      queryFn: () =>
        $fetch(`${REQUEST_URLS_CURRENT.SUB_PITCH_TYPES}/${pitchType}`).then(
          (res) => res.data as { result: Record<string, string> }
        ),
      ...config,
    });
  };

  static getSubPitchPriceConfig = ({
    subpitchId,
  }: {
    subpitchId: string | number;
  }) => {
    return useQuery({
      queryKey: ["subPitchConfigPrice", subpitchId],
      queryFn: () =>
        $fetch(
          `${REQUEST_URLS_CURRENT.SUB_PITCH_PRICES_CONFIG}/${subpitchId}`
        ).then((res) => res.data as { result: SubPitchConfigPriceType[] }),
      ...config,
    });
  };
}
