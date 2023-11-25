import { $fetch } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export class ReportUseQuery {
  static getReportReasons = () => {
    return useQuery({
      queryKey: ["report-reasons"],
      queryFn: () => $fetch("/v1/reports/reasons").then((res) => res.data),
    });
  };
  static getReports = (query: Record<string, any>) => {
    return useQuery({
      queryKey: ["reports", query],
      queryFn: () => $fetch("/v1/reports", query).then((res) => res.data),
    });
  };
}
