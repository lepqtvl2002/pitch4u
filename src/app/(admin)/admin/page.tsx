"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker";
import { Overview } from "@/components/dashboard/overview";
import { RecentSales } from "@/components/dashboard/recent-sales";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { StatisticUseQuery } from "@/server/queries/statistic-queries";
import { toast } from "@/components/ui/use-toast";
import { compareAmount, comparePercent, formatMoney } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  RevenueOverview,
  RevenueOverviewByDate,
} from "@/components/dashboard/revenue-overview";
import MonthPicker from "@/components/dashboard/month-picker";

const TabItems = [
  {
    name: "Tổng quan",
    value: "overview",
  },
  {
    name: "Phân tích",
    value: "analytics",
  },
  {
    name: "Báo cáo",
    value: "reports",
  },
  {
    name: "Thông báo",
    value: "notifications",
  },
];
type GeneralInformation = {
  revenue: number;
  orders: number;
  pitches: number;
  registrations: number;
};

type RevenueByMonth = {
  month: number;
  revenue: number;
};

type RevenueByDate = {
  date: string | Date;
  revenue: number;
};

type Result = {
  all: GeneralInformation;
  thisMonthOverview: GeneralInformation;
  lastMonthOverview: GeneralInformation;
  revenueByMonths: RevenueByMonth[];
  revenueByDates: RevenueByDate[];
  staff: any[];
};

export type Data = {
  result: Result;
};

export default function DashboardPage() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [chartTimeline, setChartTimeline] = useState<"month" | "date">("month");
  const { data, isLoading, isError } = StatisticUseQuery.getSystemStats({
    month,
  });
  if (isError) {
    toast({
      title: "Đã có lỗi xảy ra khi tải dữ liệu",
      description: "Vui lòng đảm báo kết nối và thử lại",
      variant: "destructive",
    });
  }
  return (
    <div className="flex-1 space-y-4 px-4 py-2">
      <Tabs defaultValue="overview" className="space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <TabsList>
            {TabItems.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab?.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="flex items-center space-x-2">
            <MonthPicker selectedMonth={month} setSelectedMonth={setMonth} />
          </div>
        </div>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tổng doanh thu
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatMoney(data?.result.thisMonthOverview.revenue || 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {comparePercent(
                    data?.result.thisMonthOverview.revenue,
                    data?.result.lastMonthOverview.revenue
                  )}
                  % so với tháng trước đó
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Lượt đặt sân trên ứng dụng
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data?.result.thisMonthOverview.orders || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  {compareAmount(
                    data?.result.thisMonthOverview.orders,
                    data?.result.lastMonthOverview.orders
                  )}{" "}
                  so với tháng trước đó
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Số sân hiện tại
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data?.result.all.pitches || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  {`Có thêm ${data?.result.thisMonthOverview.pitches} sân mới trong tháng này`}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Lượt đăng ký sân mới
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data?.result.thisMonthOverview.registrations || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  {compareAmount(
                    data?.result.thisMonthOverview.registrations,
                    data?.result.lastMonthOverview.registrations
                  )}{" "}
                  so với tháng trước đó
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Biểu đồ thống kê doanh thu
                  <Select
                    onValueChange={(value: "month" | "date") =>
                      setChartTimeline(value)
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Tháng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">Tháng</SelectItem>
                      <SelectItem value="day">Ngày</SelectItem>
                    </SelectContent>
                  </Select>
                </CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                {isLoading ? (
                  <div className="flex gap-2">
                    <Skeleton className="w-1/5 h-60" />
                    <Skeleton className="w-1/5 h-60" />
                    <Skeleton className="w-1/5 h-60" />
                    <Skeleton className="w-1/5 h-60" />
                    <Skeleton className="w-1/5 h-60" />
                  </div>
                ) : chartTimeline === "month" ? (
                  <RevenueOverview data={data?.result.revenueByMonths || []} />
                ) : (
                  <RevenueOverviewByDate
                    data={data?.result.revenueByDates || []}
                  />
                )}
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>
                  Những sân bóng có doanh thu cao nhất trong tháng này
                </CardTitle>
                <CardDescription>
                  Bạn đã có {data?.result.thisMonthOverview.orders || 0} lượt
                  đặt trong tháng này.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Subscriptions
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Now
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">
                  +201 since last hour
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                  You made 265 sales this month.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
