import { toast } from "@/components/ui/use-toast";
import { $fetch } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export class UserUseMutation {
  static updateProfile = () => {
    return useMutation({
      mutationFn: (data: Record<string, any>) =>
        $fetch("/v1/users/profile", {
          method: "PATCH",
          data: data,
        }),
      onSuccess: () => {
        toast({
          title: "Cập nhật thành công",
          variant: "success",
          description: "Đã cập nhật thông tin thành công.",
        });
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: "Cập nhật thất bại",
          variant: "destructive",
          description:
            "Đã xảy ra lỗi trong lúc cập nhật thông tin. Vui lòng thử lại sau.",
        });
      },
    });
  };

  static resetPassword = () => {
    return useMutation({
      mutationKey: ["reset-password"],
      mutationFn: (data: { password: string; new_password: string }) =>
        $fetch(`/v1/auth/reset-password`, {
          method: "PATCH",
          data,
        }).then((res) => res.data),
      onSuccess: () => {
        toast({
          title: "Cập nhật mật khẩu thành công",
          variant: "success",
          description: "Đã cập nhật thông tin thành công.",
        });
      },
      onError: () => {
        toast({
          title: "Cập nhật thất bại",
          variant: "destructive",
          description:
            "Đã xảy ra lỗi trong lúc cập nhật thông tin. Vui lòng thử lại sau.",
        });
      },
    });
  };

  static updateStaffProfile = () => {
    return useMutation({
      mutationKey: ["update-staff"],
      mutationFn: ({
        userId,
        data,
      }: {
        userId: string | number;
        data: {
          fullname?: string;
          gender?: string;
          phone?: string;
          birthday?: string;
        };
      }) =>
        $fetch(`/v1/users/staffs/${userId}`, {
          method: "PATCH",
          data,
        }).then((res) => res.data),
      onSuccess: () => {
        toast({
          title: "OK",
          variant: "success",
          description: "Đã cập nhật thông tin thành công.",
        });
      },
      onError: (error) => {
        toast({
          title: "Cập nhật thông tin thất bại",
          variant: "destructive",
          description: `Đã xảy ra lỗi trong khi cập nhật thông tin, lỗi ${error?.toString()}.`,
        });
      },
    });
  };

  static resetStaffPassword = ({ userId }: { userId: number | string }) => {
    return useMutation({
      mutationKey: ["reset-staff-password"],
      mutationFn: (data: { password: string; new_password: string }) =>
        $fetch(`/v1/users/staffs/${userId}/reset-password`, {
          method: "PATCH",
          data: { password: data.new_password },
        }).then((res) => res.data),
      onSuccess: () => {
        toast({
          title: "Cập nhật mật khẩu thành công",
          variant: "success",
          description: "Đã cập nhật thông tin thành công.",
        });
      },
      onError: () => {
        toast({
          title: "Cập nhật thất bại",
          variant: "destructive",
          description:
            "Đã xảy ra lỗi trong lúc cập nhật thông tin. Vui lòng thử lại sau.",
        });
      },
    });
  };

  static createNewStaff = () => {
    return useMutation({
      mutationKey: ["create-staff"],
      mutationFn: (data: {
        fullname: string;
        gender: string;
        phone: string;
        birthday: string;
        email: string;
        password: string;
        pitch_ids: number[];
      }) =>
        $fetch(`/v1/users/staffs`, {
          method: "POST",
          data,
        }).then((res) => res.data),
      onSuccess: () => {
        toast({
          title: "Thành công",
          variant: "success",
          description: "Đã thêm nhân viên thành công.",
        });
      },
      onError: () => {
        toast({
          title: "Thất bại",
          variant: "destructive",
          description:
            "Đã xãy ra lỗi trong khi thêm mới nhân viên. Vui lòng điền đúng email và các thông tin được yêu cầu.",
        });
      },
    });
  };

  static deleteStaff = () => {
    return useMutation({
      mutationKey: ["delete-staff"],
      mutationFn: (userId: number | string) =>
        $fetch(`/v1/users/staffs/${userId}`, {
          method: "DELETE",
        }).then((res) => res.data),
      onSuccess: (data) => {
        console.log(data);
        toast({
          title: "Xóa thành công",
          variant: "success",
          description: "Đã xóa thành công nhân viên này.",
        });
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: "Hành động thất bại",
          variant: "destructive",
          description: "Đã xảy ra lỗi trong lúc thực hiện hành động xóa.",
        });
      },
    });
  };

  static suspendUser = () => {
    return useMutation({
      mutationKey: ["suspend-staff"],
      mutationFn: (userId: number | string) =>
        $fetch(`/v1/users/suspend`, {
          method: "POST",
          data: {
            user_id: userId,
          },
        }).then((res) => res.data),
      onSuccess: () => {
        toast({
          title: "Chặn thành công",
          variant: "success",
          description: "Đã tạm khóa thành công người dùng này này.",
        });
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: "Hành động thất bại",
          variant: "destructive",
          description: "Đã xảy ra lỗi trong lúc thực hiện hành động này.",
        });
      },
    });
  };

  static unsuspendUser = () => {
    return useMutation({
      mutationKey: ["unsuspend-staff"],
      mutationFn: (userId: number | string) =>
        $fetch(`/v1/users/unsuspend`, {
          method: "POST",
          data: {
            user_id: userId,
          },
        }).then((res) => res.data),
      onSuccess: () => {
        toast({
          title: "Mở khóa thành công",
          variant: "success",
          description: "Đã mở khóa thành công người dùng này này.",
        });
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: "Hành động thất bại",
          variant: "destructive",
          description: "Đã xảy ra lỗi trong lúc thực hiện hành động này.",
        });
      },
    });
  };

  static joinChat = () => {
    return useMutation({
      mutationKey: ["joinChat"],
      mutationFn: (userId: number | string) =>
        $fetch(`/v1/chats`, {
          method: "POST",
          data: {
            userId,
          },
        }).then((res) => res.data),
      onSuccess: () => {
        toast({
          title: "Tham gia cuộc hội thoại thành công",
          variant: "success",
          description: "Bạn có thể nhắn tin cho người dùng này.",
        });
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: "Hành động thất bại",
          variant: "destructive",
          description: "Đã xảy ra lỗi trong lúc thực hiện hành động này.",
        });
      },
    });
  };
}
