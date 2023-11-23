import { useMutation } from "@tanstack/react-query";
import { $fetch, $globalFetch } from "@/lib/axios";
import { toast } from "@/components/ui/use-toast";

interface PitchInfo {
  card_id: string;
  fullname: string;
  email: string;
  phone: string;
  address: string;
  pitch_name?: string;
  pitch_address?: string;
  lat: number;
  long: number;
}
export class PitchUseMutation {
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
  static bookingPitch = () => {
    return useMutation({
      mutationFn: (data: Record<string, any>) =>
        $fetch(`/v1/booking`, {
          method: "POST",
          data,
        }).then((res) => res.data),
      onSuccess: () => {
        toast({ title: "Đặt sân thành công", variant: "success" });
      },
      onError: (err: any) => {
        toast({
          title: "Đã xảy ra lỗi trong khi đặt sân, vui lòng thử lại",
          description: `${err?.message || "loi gi ko biet"}`,
          variant: "destructive",
        });
      },
    });
  };

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

  static likePitch = (pitchId: number | string) => {
    return useMutation({
      mutationFn: () =>
        $fetch(`/v1/pitches/like`, {
          method: "POST",
          data: { pitch_id: pitchId },
        }).then((res) => res.data),
      onSuccess: () => {
        toast({
          title: "Sân đã được thêm vào danh sách yêu thích",
          variant: "success",
        });
      },
      onError: (err: any) => {
        toast({
          title: "Đã xảy ra lỗi trong khi thực hiện hành động",
          description: `${err?.message || "Có lỗi xảy ra, vui lòng thử lại."}`,
          variant: "destructive",
        });
      },
    });
  };
}
