import { $fetch } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export class ReportUseQuery {
  static getReportReasons = () => {
    return useQuery({
      queryKey: ["report-reasons"],
      queryFn: () => $fetch("/v1/reports/reasons").then((res) => res.data),
    });
  };
  static getReports = (params: Record<string, any>) => {
    return useQuery({
      queryKey: ["reports", params],
      queryFn: () =>
        $fetch("/v1/reports", { method: "GET", params }).then(
          (res) => res.data
        ),
    });
  };
}
