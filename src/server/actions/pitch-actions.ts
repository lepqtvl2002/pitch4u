import { useMutation } from "@tanstack/react-query";
import { $fetch } from "@/lib/axios";
import { toast } from "@/components/ui/use-toast";
import { PaymentType } from "@/enums/paymentTypes";
import { BookingStatus } from "@/enums/bookingStatuses";
import { AxiosError } from "axios";
import { errorToast, successToast } from "@/lib/quick-toast";
import { REQUEST_URLS_CURRENT } from "@/config/request-urls";

export type PitchInfo = {
  card_id: string;
  fullname: string;
  email: string;
  phone: string;
  address: string;
  pitch_name?: string;
  pitch_address?: string;
  lat: number;
  long: number;
  proofs?: string[];
  type: string;
};

export type BookingInfo = {
  bookingInfo: {
    isRefund: boolean;
    booking_id: number;
    user_id: number;
    payment_type: PaymentType;
    pitch_id: number;
    voucher_id: number | null;
    booking_pitches: [
      {
        booking_pitch_id: number;
        subpitch_id: number;
        start_time: Date;
        end_time: Date;
        price: number;
        booking_id: number;
        updatedAt: Date;
        createdAt: Date;
      }
    ];
    status: BookingStatus;
    total: number;
    discount: number;
    updatedAt: Date;
    createdAt: Date;
  };
  paymentUrl: string;
};

export type BookingPitchProps = {
  subpitch_id: number | string;
  frame_times: {
    start_time: string;
    end_time: string;
  }[];
  payment_type: PaymentType;
  voucher_id?: number | string;
  returnUrl: string;
  cancelUrl: string;
};

export class PitchUseMutation {
  // Register pitch
  static pitchRegister = () => {
    return useMutation({
      mutationFn: async (data: PitchInfo) =>
        (await $fetch.post(`/v1/pitches/register`, data)).data,
      onSuccess: () => {
        toast({
          title: "Đăng ký sân thành công",
          description:
            "Bạn đã đăng ký sân thành công, vui lòng chờ một thời gian để được kiểm tra và xét duyệt.",
          variant: "success",
        });
      },
      onError: (error: AxiosError) => {
        errorToast({ actionName: "Đăng ký sân", error });
      },
    });
  };

  // Booking pitch
  static bookingPitch = () => {
    return useMutation({
      mutationFn: async (data: BookingPitchProps) =>
        (await $fetch.post(`/v1/booking`, data)).data as {
          result: BookingInfo;
        },
      onSuccess: () => {
        toast({
          title:
            "Tạo lệnh đặt sân thành công. Vui lòng thanh toán để hoàn tất đặt sân",
        });
      },
      onError: (error: AxiosError) => {
        errorToast({ actionName: "Đặt sân", error: error });
      },
    });
  };

  // Cancel booking pitch
  static cancelBookingPitch = () => {
    return useMutation({
      mutationFn: (data: { booking_id: string | number }) =>
        $fetch.post(`/v1/booking/cancel`, data).then((res) => res.data),
      onSuccess: () => {
        toast({ title: "Đã hủy đặt sân thành công", variant: "success" });
      },
      onError: (error: AxiosError) => {
        errorToast({ actionName: "Hủy đặt sân", error: error });
      },
    });
  };

  // Approve booking for user pay later
  static approveBookingPitch = () => {
    return useMutation({
      mutationFn: (data: { booking_id: string | number }) =>
        $fetch.post(`/v1/booking/approve`, data).then((res) => res.data),
      onSuccess: () => {
        toast({ title: "Đã chấp nhận đặt sân thành công", variant: "success" });
      },
      onError: (error: AxiosError) => {
        errorToast({ actionName: "Xác nhận đặt sân", error: error });
      },
    });
  };

  // Add sub pitch
  static addSubPitch = () => {
    return useMutation({
      mutationFn: (data: Record<string, any>) =>
        $fetch.post(`/v1/pitches/subpitches`, data).then((res) => res.data),
      onSuccess: () => {
        toast({ title: "Thêm sân thành công", variant: "success" });
      },
      onError: (error: AxiosError) => {
        errorToast({ actionName: "Thêm sân con", error: error });
      },
    });
  };

  // Active pitch
  static activePitch = (pitch_id: number | string) => {
    return useMutation({
      mutationFn: (active: boolean) =>
        $fetch
          .patch(`${REQUEST_URLS_CURRENT.PITCHES}/${pitch_id}`, { active })
          .then((res) => res.data),
      onSuccess: () => {
        successToast({ actionName: "Mở khóa sân" });
      },
      onError: (error: AxiosError) => {
        errorToast({ actionName: "Mở/Khóa sân", error: error });
      },
    });
  };

  // Suspend pitch
  static suspendPitch = () => {
    return useMutation({
      mutationFn: (pitch_id: number | string) =>
        $fetch.patch(`/v1/pitches/${pitch_id}/suspend`).then((res) => res.data),
      onSuccess: () => {
        toast({ title: "Đã khóa sân thành công", variant: "success" });
      },
      onError: (error: AxiosError) => {
        errorToast({ actionName: "Khóa sân", error: error });
      },
    });
  };

  // Unsuspend pitch
  static unsuspendPitch = () => {
    return useMutation({
      mutationFn: (pitch_id: number | string) =>
        $fetch
          .patch(`/v1/pitches/${pitch_id}/unsuspend`)
          .then((res) => res.data),
      onSuccess: () => {
        toast({ title: "Đã mở khóa sân này", variant: "success" });
      },
      onError: (error: AxiosError) => {
        errorToast({ actionName: "Mở khóa sân", error: error });
      },
    });
  };

  // Update sub pitch
  static updateSubPitch = () => {
    return useMutation({
      mutationFn: ({
        subPitchId,
        data,
      }: {
        subPitchId: string | number;
        data: {
          name?: string;
          type?: string;
          price?: number;
        };
      }) =>
        $fetch
          .patch(`/v1/pitches/subpitches/${subPitchId}`, data)
          .then((res) => res.data),
      onSuccess: () => {
        toast({ title: "Cập nhật thành công", variant: "success" });
      },
      onError: (error: AxiosError) => {
        errorToast({ actionName: "Cập nhật sân", error: error });
      },
    });
  };

  // Delete sub pitch
  static removeSubPitch = (subPitchId: string | number) => {
    return useMutation({
      mutationFn: () =>
        $fetch
          .delete(`/v1/pitches/subpitches/${subPitchId}`)
          .then((res) => res.data),
      onSuccess: () => {
        toast({ title: "Xóa sân thành công", variant: "success" });
      },
      onError: (error: AxiosError) => {
        errorToast({ actionName: "Xóa sân con", error: error });
      },
    });
  };

  // Update pitch
  static updatePitch = (pitchId: number | string) => {
    return useMutation({
      mutationFn: (data: Record<string, any>) =>
        $fetch.patch(`/v1/pitches/${pitchId}`, data).then((res) => res.data),
      onSuccess: () => {
        toast({
          title: "Cập nhật thông tin sân thành công",
          variant: "success",
        });
      },
      onError: (error: AxiosError) => {
        errorToast({ actionName: "Cập nhật sân", error: error });
      },
    });
  };

  // Config pitch
  static configPitch = (pitchId: number | string) => {
    return useMutation({
      mutationFn: (data: {
        open_at?: number;
        close_at?: number;
        open_days?: string[];
        time_frames?: number[][];
      }) =>
        $fetch
          .patch(`/v1/pitches/${pitchId}/config`, data)
          .then((res) => res.data),
      onSuccess: () => {
        toast({
          title: "Cập nhật thông tin sân thành công",
          variant: "success",
        });
      },
      onError: (error: AxiosError) => {
        errorToast({ actionName: "Cài đặt sân", error: error });
      },
    });
  };

  // Like pitch
  static likePitch = () => {
    return useMutation({
      mutationFn: (pitchId: number | string) =>
        $fetch
          .post(`/v1/pitches/like`, { pitch_id: pitchId })
          .then((res) => res.data),
      onSuccess: (data) => {
        if (data?.result == 1) {
          toast({
            title: "Bạn đã xóa sân này ra khỏi danh sách yêu thích",
          });
        } else
          toast({
            title: "Sân đã được thêm vào danh sách yêu thích",
            variant: "success",
          });
      },
      onError: (error: AxiosError) => {
        errorToast({ actionName: "Yêu thích sân", error: error });
      },
    });
  };

  // Set price special by hours
  static setSpecialPrice = () => {
    return useMutation({
      mutationFn: (data: {
        subpitch_id: number | string;
        time_frames: {
          time_frame: number[];
          price: number;
        }[];
      }) =>
        $fetch
          .post(`/v1/pitches/subpitches/update-config-price`, data)
          .then((res) => res.data),
      onSuccess: () => {
        toast({
          title: "Cập nhật giá thành công",
          variant: "success",
        });
      },
      onError: (error: AxiosError) => {
        errorToast({ actionName: "Cài đặt giá sân", error: error });
      },
    });
  };

  // Set price special by hours
  static updateSpecialPrice = (price_id: string | number) => {
    return useMutation({
      mutationFn: (data: { price: number }) =>
        $fetch
          .patch(`/v1/pitches/subpitches/special-price/${price_id}`, data)
          .then((res) => res.data),
      onSuccess: () => {
        toast({
          title: "Cập nhật giá thành công",
          variant: "success",
        });
      },
      onError: (error: AxiosError) => {
        errorToast({ actionName: "Cập nhật giá sân", error: error });
      },
    });
  };

  // Delete price special by hours
  static deleteSpecialPrice = (price_id: string | number) => {
    return useMutation({
      mutationFn: () =>
        $fetch
          .delete(`/v1/pitches/subpitches/special-price/${price_id}`)
          .then((res) => res.data),
      onSuccess: () => {
        toast({
          title: "Đã trả về giá sân trung bình",
          variant: "success",
        });
      },
      onError: (error: AxiosError) => {
        errorToast({ actionName: "Xóa cài đặt giá sân", error: error });
      },
    });
  };
}
