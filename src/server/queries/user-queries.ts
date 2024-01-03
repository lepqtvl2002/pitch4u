import { useQuery } from "@tanstack/react-query";
import { $fetch } from "@/lib/axios";
import IPaginated from "@/types/paginated";
import { ISubPitch } from "@/types/subPitch";
import { IPitch } from "@/types/pitch";

export type User = {
  user_id: number;
  fullname: string;
  avatar: string | null;
  phone: string;
  email: string;
  is_suspended?: boolean;
  role?: {
    role_id: number;
    name: "admin" | "user" | "staff" | "super_admin";
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
  payment_type: "pay_later" | "vnpay";
  status: "success" | "pending" | "canceled";
  discount: number;
  total: number;
  voucher_id: number;
  tournament_id: number | null;
  pitch_id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  booking_pitches: {
    booking_pitch_id: number;
    booking_id: number;
    subpitch_id: number;
    start_time: string;
    end_time: string;
    price: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    sub_pitch: ISubPitch;
  }[];
  pitch: IPitch;
};

export class UserUseQuery {
  // Function to testing
  static search = (params: Record<string, any>) => {
    return useQuery({
      queryKey: ["posts", params],
      queryFn: () =>
        $fetch(`https://jsonplaceholder.typicode.com/posts`, {
          method: "GET",
          params,
        }).then((res) => res.data),
      cacheTime: 100,
      keepPreviousData: true,
    });
  };

  static getProfile = (params?: { userId: number | string }) => {
    return useQuery({
      queryKey: ["profile", params],
      queryFn: () =>
        $fetch(`/v1/users/profile`, {
          method: "GET",
          params: {
            user_id: params?.userId,
          },
        }).then((res) => res.data as { result: UserProfile }),
      cacheTime: 100,
      keepPreviousData: true,
    });
  };

  static getManyUsers = (params: Record<string, any>) => {
    return useQuery({
      queryKey: ["users", params],
      queryFn: () =>
        $fetch(`/v1/users`, {
          method: "GET",
          params,
        }).then((res) => res.data as PaginatedUserList),
      cacheTime: 100,
      keepPreviousData: true,
    });
  };

  static getManyStaffs = (params: {
    name?: string;
    pitch_id?: string | number;
    sort?: "asc" | "desc";
    sort_by?: string;
  }) => {
    return useQuery({
      queryKey: ["users", params],
      queryFn: () =>
        $fetch(`/v1/users/staffs`, {
          method: "GET",
          params,
        }).then((res) => res.data as { result: User[] }),
      cacheTime: 100,
      keepPreviousData: true,
    });
  };

  static getBookingHistory = (params: Record<string, any>) => {
    return useQuery({
      queryKey: ["myBookingHistory", params],
      queryFn: () =>
        $fetch(`/v1/booking/my-bookings`, {
          method: "GET",
          params,
        }).then(
          (res) =>
            res.data as { result: { data: BookingHistory[] } & IPaginated }
        ),
      cacheTime: 100,
      keepPreviousData: true,
    });
  };
}
