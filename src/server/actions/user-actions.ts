import { toast } from "@/components/ui/use-toast";
import { REQUEST_URLS_CURRENT } from "@/config/request-urls";
import { $fetch } from "@/lib/axios";
import { errorToast } from "@/lib/quick-toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export class UserUseMutation {
  static updateProfile = () => {
    return useMutation({
      mutationFn: (data: Record<string, any>) =>
        $fetch.patch(REQUEST_URLS_CURRENT.USER_PROFILE, data),
      onSuccess: () => {
        toast({
          title: "Cập nhật thành công",
          variant: "success",
          description: "Đã cập nhật thông tin thành công.",
        });
      },
      onError: (error: AxiosError) => {
        errorToast({ actionName: "Cập nhật thông tin", error: error });
      },
    });
  };

  static resetPassword = () => {
    return useMutation({
      mutationKey: ["reset-password"],
      mutationFn: (data: { password: string; new_password: string }) =>
        $fetch
          .patch(REQUEST_URLS_CURRENT.RESET_PASSWORD, data)
          .then((res) => res.data),
      onSuccess: () => {
        toast({
          title: "Cập nhật mật khẩu thành công",
          variant: "success",
          description: "Đã cập nhật thông tin thành công.",
        });
      },
      onError: (error: AxiosError) => {
        errorToast({ actionName: "Đặt lại mật khẩu", error: error });
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
        $fetch
          .patch(`${REQUEST_URLS_CURRENT.STAFFS}/${userId}`, data)
          .then((res) => res.data),
      onSuccess: () => {
        toast({
          title: "OK",
          variant: "success",
          description: "Đã cập nhật thông tin thành công.",
        });
      },
      onError: (error: AxiosError) => {
        errorToast({
          actionName: "Cập nhật thông tin nhân viên",
          error: error,
        });
      },
    });
  };

  static resetStaffPassword = ({ userId }: { userId: number | string }) => {
    return useMutation({
      mutationKey: ["reset-staff-password"],
      mutationFn: (data: { password: string; new_password: string }) =>
        $fetch
          .patch(`${REQUEST_URLS_CURRENT.STAFFS}/${userId}/reset-password`, {
            password: data.new_password,
          })
          .then((res) => res.data),
      onSuccess: () => {
        toast({
          title: "Cập nhật mật khẩu thành công",
          variant: "success",
          description: "Đã cập nhật thông tin thành công.",
        });
      },
      onError: (error: AxiosError) => {
        errorToast({ actionName: "Cập nhật mật khẩu", error: error });
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
        $fetch.post(REQUEST_URLS_CURRENT.STAFFS, data).then((res) => res.data),
      onSuccess: () => {
        toast({
          title: "Thành công",
          variant: "success",
          description: "Đã thêm nhân viên thành công.",
        });
      },
      onError: (error: AxiosError) => {
        errorToast({ actionName: "Thêm nhân viên", error: error });
      },
    });
  };

  static deleteStaff = () => {
    return useMutation({
      mutationKey: ["delete-staff"],
      mutationFn: (userId: number | string) =>
        $fetch
          .delete(`${REQUEST_URLS_CURRENT.STAFFS}/${userId}`)
          .then((res) => res.data),
      onSuccess: (data) => {
        console.log(data);
        toast({
          title: "Xóa thành công",
          variant: "success",
          description: "Đã xóa thành công nhân viên này.",
        });
      },
      onError: (error: AxiosError) => {
        errorToast({ actionName: "Xóa nhân viên", error: error });
      },
    });
  };

  static suspendUser = () => {
    return useMutation({
      mutationKey: ["suspend-staff"],
      mutationFn: (userId: number | string) =>
        $fetch
          .post(REQUEST_URLS_CURRENT.SUSPEND_USER, {
            user_id: userId,
          })
          .then((res) => res.data),
      onSuccess: () => {
        toast({
          title: "Chặn thành công",
          variant: "success",
          description: "Đã tạm khóa thành công người dùng này này.",
        });
      },
      onError: (error: AxiosError) => {
        errorToast({ actionName: "Khóa người dùng", error: error });
      },
    });
  };

  static unsuspendUser = () => {
    return useMutation({
      mutationKey: ["unsuspend-staff"],
      mutationFn: (userId: number | string) =>
        $fetch
          .post(REQUEST_URLS_CURRENT.UNSUSPEND_USER, {
            user_id: userId,
          })
          .then((res) => res.data),
      onSuccess: () => {
        toast({
          title: "Mở khóa thành công",
          variant: "success",
          description: "Đã mở khóa thành công người dùng này này.",
        });
      },
      onError: (error: AxiosError) => {
        errorToast({ actionName: "Mở khóa người dùng", error: error });
      },
    });
  };

  static joinChat = () => {
    return useMutation({
      mutationKey: ["joinChat"],
      mutationFn: (userId: number | string) =>
        $fetch
          .post(REQUEST_URLS_CURRENT.CHAT, {
            userId,
          })
          .then((res) => res.data),
      onSuccess: () => {
        toast({
          title: "Tham gia cuộc hội thoại thành công",
          variant: "success",
          description: "Bạn có thể nhắn tin cho người dùng này.",
        });
      },
      onError: (error: AxiosError) => {
        errorToast({ actionName: "Tham gia hội thoại", error: error });
      },
    });
  };

  static review = () => {
    return useMutation({
      mutationKey: ["review"],
      mutationFn: ({
        bookingId,
        star,
        text = ".",
        attaches,
      }: {
        bookingId: number | string;
        star: number;
        text: string;
        attaches: string[];
      }) =>
        $fetch
          .post(REQUEST_URLS_CURRENT.REVIEW, {
            booking_id: bookingId,
            star,
            text,
            attaches,
          })
          .then((res) => res.data),
      onSuccess: () => {
        toast({
          title: "Review thành công",
          variant: "success",
          description: "Cảm ơn bạn đã chia sẻ trải nghiệm của mình.",
        });
      },
      onError: (error: AxiosError) => {
        errorToast({ actionName: "Review đặt sân", error: error });
      },
    });
  };
}
