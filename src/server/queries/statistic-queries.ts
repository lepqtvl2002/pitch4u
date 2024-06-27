import { useQuery } from "@tanstack/react-query";
import { $fetch } from "@/lib/axios";
import { Data as DataStatisticOwner } from "@/app/(dashboard)/dashboard/page";
import { Data as DataStatisticSystem } from "@/app/(admin)/admin/page";
import IPaginated from "@/types/paginated";
import { BookingStatus } from "@/enums/bookingStatuses";
import { config } from "./commom";
import { REQUEST_URLS_CURRENT } from "@/config/request-urls";
import { PaymentType } from "@/enums/paymentTypes";
import { IPitch } from "@/types/pitch";

export type Booking = {
  booking_id: number;
  user_id: number;
  payment_type: PaymentType;
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
  type: string;
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
        $fetch(REQUEST_URLS_CURRENT.STATISTIC_OWNER, {
          params,
        }).then((res) => res.data as DataStatisticOwner),
      ...config,
    });
  };
  static getSystemStats = (params?: Record<string, any>) => {
    return useQuery({
      queryKey: ["statisticSystem", params],
      queryFn: () =>
        $fetch(REQUEST_URLS_CURRENT.STATISTIC_SYSTEM, {
          params,
        }).then((res) => res.data as DataStatisticSystem),
      ...config,
    });
  };
  static getPitchesByRevenue = (params?: {
    limit?: number;
    page?: number;
    sort?: "asc" | "desc";
    sort_by?: string;
  }) => {
    return useQuery({
      queryKey: ["revenue", params],
      queryFn: () =>
        $fetch(REQUEST_URLS_CURRENT.STATISTIC_REVENUE, {
          params,
        }).then(
          (res) =>
            res.data as {
              result: {
                data: ({ pitch: IPitch } & {
                  pitch_id: number;
                  revenue: number;
                })[];
              } & IPaginated;
            }
        ),
      ...config,
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
      queryKey: ["statisticBooking", params],
      queryFn: () =>
        $fetch(REQUEST_URLS_CURRENT.STATISTIC_BOOKING, {
          params,
        }).then(
          (res) => res.data as { result: { data: Booking[] } & IPaginated }
        ),
      ...config,
    });
  };

  static getNumberBookingByTimeFrame = (params?: {
    start_time?: string;
    end_time?: string;
  }) => {
    return useQuery({
      queryKey: ["numberBookingByTimeFrame", params],
      queryFn: () =>
        $fetch(REQUEST_URLS_CURRENT.STATISTIC_NUMBER_BOOKING_BY_TIME_FRAME, {
          params,
        }).then(
          (res) =>
            res.data as {
              result: {
                pitch_id: number;
                pitch_name: string;
                frame: { time: string; orders: number }[];
              }[];
            }
        ),
      ...config,
    });
  };
}
