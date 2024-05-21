import { useQuery } from "@tanstack/react-query";
import { $fetch } from "@/lib/axios";
import IPaginated from "@/types/paginated";
import { ISubPitch } from "@/types/subPitch";
import { IPitch } from "@/types/pitch";
import { PaymentType } from "@/enums/paymentTypes";
import { UserRole } from "@/enums/roles";
import { BookingStatus } from "@/enums/bookingStatuses";
import { REQUEST_URLS_CURRENT } from "@/config/request-urls";
import { config } from "./commom";

export type User = {
  user_id: number;
  fullname: string;
  avatar: string | null;
  phone: string;
  email: string;
  is_suspended?: boolean;
  role?: {
    role_id: number;
    name: UserRole;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
};

export type UserProfile = {
  user_id: number;
  fullname: string;
  phone: string;
  email: string;
  provider: string;
  password: string;
  is_verified: boolean;
  avatar: string | null;
  gender: string;
  birthday: string;
  role_id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  is_suspended?: boolean;
};

export type PaginatedUserList = {
  result: {
    data: User[];
  } & IPaginated;
};

export type BookingHistory = {
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
  booking_pitches: {
    booking_pitch_id: number;
    booking_id: number;
    subpitch_id: number;
    start_time: Date;
    end_time: Date;
    price: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    sub_pitch: ISubPitch;
  }[];
  pitch: IPitch;
  payment_url?: string;
};

export class UserUseQuery {
  static getProfile = (params?: { userId: number | string }) => {
    return useQuery({
      queryKey: ["profile", params],
      queryFn: async () =>
        (
          await $fetch(REQUEST_URLS_CURRENT.USER_PROFILE, {
            params: {
              user_id: params?.userId,
            },
          })
        ).data as { result: UserProfile },
      ...config,
    });
  };

  static getManyUsers = (params: Record<string, any>) => {
    return useQuery({
      queryKey: ["users", params],
      queryFn: async () =>
        (
          await $fetch(REQUEST_URLS_CURRENT.USERS, {
            params,
          })
        ).data as PaginatedUserList,
      ...config,
    });
  };

  static getManyStaffs = (params: {
    name?: string;
    pitch_id?: string | number;
    sort?: "asc" | "desc";
    sort_by?: string;
  }) => {
    return useQuery({
      queryKey: ["staffs", params],
      queryFn: async () =>
        (
          await $fetch(REQUEST_URLS_CURRENT.STAFFS, {
            params,
          })
        ).data as PaginatedUserList,
      ...config,
    });
  };

  static getBookingHistory = (params: Record<string, any>) => {
    return useQuery({
      queryKey: ["myBookingHistory", params],
      queryFn: async () =>
        (
          await $fetch(REQUEST_URLS_CURRENT.BOOKING_HISTORY, {
            params,
          })
        ).data as { result: { data: BookingHistory[] } & IPaginated },
      ...config,
    });
  };
}
