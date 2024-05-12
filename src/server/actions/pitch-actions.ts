import { useMutation } from "@tanstack/react-query";
import { $fetch } from "@/lib/axios";
import { toast } from "@/components/ui/use-toast";
import { PaymentType } from "@/enums/paymentTypes";

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
export class PitchUseMutation {
  // Register pitch
  static pitchRegister = () => {
    return useMutation({
      mutationFn: (data: PitchInfo) =>
        $fetch(`/v1/pitches/register`, {
          method: "POST",
          data: data as PitchInfo,
        }).then((res) => res.data),
      onSuccess: () => {
        toast({
          title: "Đăng ký sân thành công",
          description:
            "Bạn đã đăng ký sân thành công, vui lòng chờ một thời gian để được kiểm tra và xét duyệt.",
          variant: "success",
        });
      },
      onError: (err: any) => {
        toast({
          title: "Đã xảy ra lỗi",
          description: `${
            err?.message ||
            "Đã xảy ra lỗi trong lúc đăng ký, vui lòng kiểm tra và thử lại."
          }`,
          variant: "destructive",
        });
      },
    });
  };

  // Booking pitch
  static bookingPitch = () => {
    return useMutation({
      mutationFn: (data: {
        subpitch_id: number | string;
        frame_times: {
          start_time: string;
          end_time: string;
        }[];
        payment_type: PaymentType;
        voucher_id?: number | string;
      }) =>
        $fetch(`/v1/booking`, {
          method: "POST",
          data,
        }).then((res) => res.data),
      onSuccess: () => {
        toast({ title: "Đặt sân thành công", variant: "success" });
      },
      onError: (err: any) => {
        toast({
          title: "Đã xảy ra lỗi trong khi đặt sân",
          description: `${err?.message || "Vui lòng thử lại"}`,
          variant: "destructive",
        });
      },
    });
  };

  // Cancel booking pitch
  static cancelBookingPitch = () => {
    return useMutation({
      mutationFn: (data: { booking_id: string | number }) =>
        $fetch(`/v1/booking/cancel`, {
          method: "POST",
          data,
        }).then((res) => res.data),
      onSuccess: () => {
        toast({ title: "Đã hủy đặt sân thành công", variant: "success" });
      },
      onError: (err: any) => {
        toast({
          title: "Đã xảy ra lỗi trong khi hủy đặt sân",
          description: `${err?.message || "Đã xảy ra lỗi"}`,
          variant: "destructive",
        });
      },
    });
  };

  // Approve booking for user pay later
  static approveBookingPitch = () => {
    return useMutation({
      mutationFn: (data: { booking_id: string | number }) =>
        $fetch(`/v1/booking/approve`, {
          method: "POST",
          data,
        }).then((res) => res.data),
      onSuccess: () => {
        toast({ title: "Đã chấp nhận đặt sân thành công", variant: "success" });
      },
      onError: (err: any) => {
        toast({
          title: "Đã xảy ra lỗi trong khi thực hiện hành động",
          description: `${err?.message || "Đã xảy ra lỗi"}`,
          variant: "destructive",
        });
      },
    });
  };

  // Add sub pitch
  static addSubPitch = () => {
    return useMutation({
      mutationFn: (data: Record<string, any>) =>
        $fetch(`/v1/pitches/subpitches`, {
          method: "POST",
          data,
        }).then((res) => res.data),
      onSuccess: () => {
        toast({ title: "Thêm sân thành công", variant: "success" });
      },
      onError: (err: any) => {
        toast({
          title: "Đã xảy ra lỗi trong khi thêm sân, vui lòng thử lại",
          description: `${err?.message || "Có lỗi xảy ra, vui lòng thử lại."}`,
          variant: "destructive",
        });
      },
    });
  };

  // Suspend pitch
  static suspendPitch = () => {
    return useMutation({
      mutationFn: (pitch_id: number | string) =>
        $fetch(`/v1/pitches/${pitch_id}/suspend`, {
          method: "PATCH",
        }).then((res) => res.data),
      onSuccess: () => {
        toast({ title: "Đã khóa sân thành công", variant: "success" });
      },
      onError: (err: any) => {
        toast({
          title: "Đã xảy ra lỗi trong khi khóa sân này",
          description: `${err?.message || "Có lỗi xảy ra, vui lòng thử lại."}`,
          variant: "destructive",
        });
      },
    });
  };

  // Unsuspend pitch
  static unsuspendPitch = () => {
    return useMutation({
      mutationFn: (pitch_id: number | string) =>
        $fetch(`/v1/pitches/${pitch_id}/unsuspend`, {
          method: "PATCH",
        }).then((res) => res.data),
      onSuccess: () => {
        toast({ title: "Đã mở khóa sân này", variant: "success" });
      },
      onError: (err: any) => {
        toast({
          title: "Đã xảy ra lỗi trong khi mở khóa sân này",
          description: `${err?.message || "Có lỗi xảy ra, vui lòng thử lại."}`,
          variant: "destructive",
        });
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
        $fetch(`/v1/pitches/subpitches/${subPitchId}`, {
          method: "PATCH",
          data,
        }).then((res) => res.data),
      onSuccess: () => {
        toast({ title: "Cập nhật thành công", variant: "success" });
      },
      onError: (err: any) => {
        toast({
          title: "Đã xảy ra lỗi trong khi thay đổi thông tin sân này",
          description: `${err?.message || "Có lỗi xảy ra, vui lòng thử lại."}`,
          variant: "destructive",
        });
      },
    });
  };

  // Delete sub pitch
  static removeSubPitch = (subPitchId: string | number) => {
    return useMutation({
      mutationFn: () =>
        $fetch(`/v1/pitches/subpitches/${subPitchId}`, {
          method: "DELETE",
        }).then((res) => res.data),
      onSuccess: () => {
        toast({ title: "Xóa sân thành công", variant: "success" });
      },
      onError: (err: any) => {
        toast({
          title: "Đã xảy ra lỗi trong khi xóa sân này",
          description: `${err?.message || "Có lỗi xảy ra, vui lòng thử lại."}`,
          variant: "destructive",
        });
      },
    });
  };

  // Update pitch
  static updatePitch = (pitchId: number | string) => {
    return useMutation({
      mutationFn: (data: Record<string, any>) =>
        $fetch(`/v1/pitches/${pitchId}`, {
          method: "PATCH",
          data,
        }).then((res) => res.data),
      onSuccess: () => {
        toast({
          title: "Cập nhật thông tin sân thành công",
          variant: "success",
        });
      },
      onError: (err: any) => {
        toast({
          title: "Đã xảy ra lỗi trong khi cập nhật sân, vui lòng thử lại",
          description: `${err?.message || "Có lỗi xảy ra, vui lòng thử lại."}`,
          variant: "destructive",
        });
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
        $fetch(`/v1/pitches/${pitchId}/config`, {
          method: "PATCH",
          data,
        }).then((res) => res.data),
      onSuccess: () => {
        toast({
          title: "Cập nhật thông tin sân thành công",
          variant: "success",
        });
      },
      onError: (err: any) => {
        toast({
          title: "Đã xảy ra lỗi trong khi cập nhật sân, vui lòng thử lại",
          description: `${err?.message || "Có lỗi xảy ra, vui lòng thử lại."}`,
          variant: "destructive",
        });
      },
    });
  };

  // Like pitch
  static likePitch = () => {
    return useMutation({
      mutationFn: (pitchId: number | string) =>
        $fetch(`/v1/pitches/like`, {
          method: "POST",
          data: { pitch_id: pitchId },
        }).then((res) => res.data),
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
      onError: (err: any) => {
        toast({
          title:
            err?.response?.status === 401
              ? "Vui lòng đăng nhập để thực hiện hành động này"
              : "Đã xảy ra lỗi trong khi thực hiện hành động",
          description: `${err?.message || "Có lỗi xảy ra, vui lòng thử lại."}`,
          variant: "destructive",
        });
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
        $fetch(`/v1/pitches/subpitches/update-config-price`, {
          method: "POST",
          data,
        }).then((res) => res.data),
      onSuccess: () => {
        toast({
          title: "Cập nhật giá thành công",
          variant: "success",
        });
      },
      onError: (err: any) => {
        toast({
          title:
            err?.response?.status === 401
              ? "Vui lòng đăng nhập để thực hiện hành động này"
              : "Đã xảy ra lỗi trong khi thực hiện hành động",
          description: `${err?.message || "Có lỗi xảy ra, vui lòng thử lại."}`,
          variant: "destructive",
        });
      },
    });
  };

  // Set price special by hours
  static updateSpecialPrice = (price_id: string | number) => {
    return useMutation({
      mutationFn: (data: { price: number }) =>
        $fetch(`/v1/pitches/subpitches/special-price/${price_id}`, {
          method: "PATCH",
          data,
        }).then((res) => res.data),
      onSuccess: () => {
        toast({
          title: "Cập nhật giá thành công",
          variant: "success",
        });
      },
      onError: (err: any) => {
        toast({
          title:
            err?.response?.status === 401
              ? "Vui lòng đăng nhập để thực hiện hành động này"
              : "Đã xảy ra lỗi trong khi thực hiện hành động",
          description: `${err?.message || "Có lỗi xảy ra, vui lòng thử lại."}`,
          variant: "destructive",
        });
      },
    });
  };

  // Delete price special by hours
  static deleteSpecialPrice = (price_id: string | number) => {
    return useMutation({
      mutationFn: () =>
        $fetch(`/v1/pitches/subpitches/special-price/${price_id}`, {
          method: "DELETE",
        }).then((res) => res.data),
      onSuccess: () => {
        toast({
          title: "Đã trả về giá sân trung bình",
          variant: "success",
        });
      },
      onError: (err: any) => {
        toast({
          title:
            err?.response?.status === 401
              ? "Vui lòng đăng nhập để thực hiện hành động này"
              : "Đã xảy ra lỗi trong khi thực hiện hành động",
          description: `${err?.message || "Có lỗi xảy ra, vui lòng thử lại."}`,
          variant: "destructive",
        });
      },
    });
  };
}
