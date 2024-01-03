import { useQuery } from "@tanstack/react-query";
import { $fetch } from "@/lib/axios";
import { Data as DataStatisticOwner } from "@/app/(dashboard)/dashboard/page";
import { Data as DataStatisticSystem } from "@/app/(admin)/admin/page";
import IPaginated from "@/types/paginated";
import { PitchType } from "@/enums/pitchTypes";
import { BookingStatus } from "@/enums/bookingStatuses";

export type Booking = {
  booking_id: number;
  user_id: number;
  payment_type: string;
  status: BookingStatus;
  discount: number;
  total: number;
  voucher_id: number | null;
  tournament_id: number | null;
  pitch_id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  pitches: Pitch;
  user: User;
  booking_pitches: BookingPitch[];
};

type Pitch = {
  pitch_id: number;
  name: string;
  slug: string;
  address: string;
  logo: string | null;
  user_id: number;
  long: number | null;
  lat: number | null;
};

type User = {
  avatar: string;
  user_id: number;
  fullname: string;
  phone: string;
  email: string;
};

type BookingPitch = {
  booking_pitch_id: number;
  booking_id: number;
  subpitch_id: number;
  start_time: string;
  end_time: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  sub_pitch: SubPitch;
};

type SubPitch = {
  subpitch_id: number;
  pitch_id: number;
  name: string;
  price: number;
  type: PitchType;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export class StatisticUseQuery {
  static getPitchStats = (params?: Record<string, any>) => {
    return useQuery({
      queryKey: ["statisticOwner", params],
      queryFn: () =>
        $fetch(`/v1/statistic/owner`, {
          method: "GET",
          params,
        }).then((res) => res.data as DataStatisticOwner),
      cacheTime: 100,
      keepPreviousData: true,
    });
  };
  static getSystemStats = (params?: Record<string, any>) => {
    return useQuery({
      queryKey: ["statisticSystem", params],
      queryFn: () =>
        $fetch(`/v1/statistic/system`, {
          method: "GET",
          params,
        }).then((res) => res.data as DataStatisticSystem),
      cacheTime: 100,
      keepPreviousData: true,
    });
  };
  static getBooking = (params?: {
    limit?: number;
    page?: number;
    status?: string;
    pitch_id?: number;
    sort?: "asc" | "desc";
    sort_by?: string;
  }) => {
    return useQuery({
      queryKey: ["booking", params],
      queryFn: () =>
        $fetch(`/v1/booking`, {
          method: "GET",
          params,
        }).then(
          (res) => res.data as { result: { data: Booking[] } & IPaginated }
        ),
      cacheTime: 100,
      keepPreviousData: true,
    });
  };
}
