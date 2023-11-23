import { toast } from "@/components/ui/use-toast";
import { $fetch } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export class ReportUseMutation {
  static getReportReasons = () => {
    return useQuery({
      queryKey: ["report-reasons"],
      queryFn: () => $fetch("/v1/reports/reasons").then((res) => res.data),
    });
  };
  static reportPitch = () => {
    return useMutation({
      mutationFn: (data: {
        pitch_id: number | string;
        reason: string;
        description: string;
        attaches?: any[];
      }) =>
        $fetch("/v1/reports", {
          method: "POST",
          data: { ...data, type: "pitch" },
        }),
      onSuccess: () => {
        toast({
          title: "Xác nhận tố cáo thành công",
          description: "Chúng tôi sẽ kiểm tra và xử lý sớm nhất có thể",
          variant: "success",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Đã xảy ra lỗi trong khi thực hiện hành động",
          description: `${
            error?.message || "Đã có lỗi xảy ra, vui lòng thử lại"
          }`,
          variant: "destructive",
        });
      },
    });
  };
  static reportUser = () => {
    return useMutation({
      mutationFn: (data: {
        user_id: number | string;
        reason: string;
        description: string;
        attaches?: any[];
      }) =>
        $fetch("/v1/reports", {
          method: "POST",
          data: { ...data, type: "user" },
        }),
      onSuccess: () => {
        toast({
          title: "Xác nhận tố cáo thành công",
          description: "Chúng tôi sẽ kiểm tra và xử lý sớm nhất có thể",
          variant: "success",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Đã xảy ra lỗi trong khi thực hiện hành động",
          description: `${
            error?.message || "Đã có lỗi xảy ra, vui lòng thử lại"
          }`,
          variant: "destructive",
        });
      },
    });
  };
}
