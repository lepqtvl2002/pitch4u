"use client";
import { AvatarCustom } from "@/components/ui/avatar-custom";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { UserUseQuery } from "@/server/queries/user-queries";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import ActionsDropdownMenuActions from "../dropdown-menu-actions";

export default function UserDetailPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = UserUseQuery.getProfile({
    userId: id as string,
  });

  const user = data?.result;
  if (isLoading || !user)
    return (
      <div className="p-10">
        <Skeleton className="w-32 h-32 rounded-full" />

        <Skeleton className="w-60 h-10" />
        <p className="text-sm text-muted-foreground">
          Thông tin chi tiết của người dùng
        </p>
      </div>
    );
  if (isError) {
    toast({
      title: "Đã xảy ra lỗi trong lúc tải dữ liệu",
      variant: "destructive",
      description: "Vui lòng thử lại sau.",
    });
  }

  return (
    <div className="flex flex-col gap-5 p-10">
      <div className="relative">
        <div className="absolute right-0 top-0">
          <ActionsDropdownMenuActions id={id as string} link="" />
        </div>
        <AvatarCustom
          className="w-32 h-32"
          avatarUrl={user.avatar as string}
          name={user.fullname}
        />

        <h3 className="text-2xl font-semibold">{user.fullname}</h3>
        <p className="text-sm text-muted-foreground">
          Thông tin chi tiết của người dùng
        </p>
      </div>
      <Separator />
      <div className="flex flex-col gap-5 px-10">
        <p>
          <Label>Email:</Label> {user.email}
        </p>
        <p>
          <Label>Giới tính:</Label> {user.gender === "male" ? "Nam" : "Nữ"}
        </p>
        <p>
          <Label>Ngày sinh:</Label>{" "}
          {format(new Date(user.birthday), "dd/MM/yyyy")}
        </p>
        <p>
          <Label>Số điện thoại:</Label> {user.phone}
        </p>
        <p>
          <Label>Thời gian tạo tài khoản:</Label>{" "}
          {format(new Date(user.createdAt), "dd/MM/yyyy")}
        </p>
        {user?.deletedAt && (
          <p>
            <Label>Đã bị xóa tài khoản vào thời gian:</Label>{" "}
            {format(new Date(user?.deletedAt), "dd/MM/yyyy")}
          </p>
        )}
        <p>
          {user.is_verified ? (
            <span className="rounded-full bg-emerald-400 text-white px-4 py-2">
              Đã xác thực
            </span>
          ) : (
            <span className="rounded-full bg-red-500 text-white px-4 py-2">
              Chưa được xác thực
            </span>
          )}
        </p>
        <p>
          <Label>Vai trò:</Label> {user.role_id}
        </p>
      </div>
    </div>
  );
}
