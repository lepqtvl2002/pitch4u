import { useQuery } from "@tanstack/react-query";
import { $fetch } from "@/lib/axios";
import IPaginated from "@/types/paginated";

export type User = {
  user_id: number;
  fullname: string;
  avatar: string | null;
  phone: string;
  email: string;
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
};

export type PaginatedUserList = {
  result: {
    data: User[];
  } & IPaginated;
};

export class UserUseQuery {
  // Function to testing
  static search = (query: Record<string, any>) => {
    return useQuery({
      queryKey: ["posts", query],
      queryFn: () =>
        $fetch(`https://jsonplaceholder.typicode.com/posts`, {
          method: "GET",
          params: query,
        }).then((res) => res.data),
      cacheTime: 100,
      keepPreviousData: true,
    });
  };

  static getProfile = () => {
    return useQuery({
      queryKey: ["profile"],
      queryFn: () =>
        $fetch(`/v1/users/profile`, {
          method: "GET",
        }).then((res) => res.data as { result: UserProfile }),
      cacheTime: 100,
      keepPreviousData: true,
    });
  };

  static getManyUsers = (query: Record<string, any>) => {
    return useQuery({
      queryKey: ["users", query],
      queryFn: () =>
        $fetch(`/v1/users`, {
          method: "GET",
          params: query,
        }).then((res) => res.data as PaginatedUserList),
      cacheTime: 100,
      keepPreviousData: true,
    });
  };

  static getManyStaffs = (query : {q?: string, pitchId?: string | number}) => {
    return useQuery({
      queryKey: ["users", query],
      queryFn: () =>
        $fetch(`/v1/users/staffs`, {
          method: "GET",
          params: query
        }).then((res) => res.data as { result: User[] }),
      cacheTime: 100,
      keepPreviousData: true,
    });
  };
}
