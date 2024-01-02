"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatisticUseQuery } from "@/server/queries/statistic-queries";
import { compareAmount, comparePercent } from "@/lib/utils";
import {
  RevenueOverview,
  RevenueOverviewByDate,
} from "@/components/dashboard/revenue-overview";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import MonthPicker from "@/components/dashboard/month-picker";
import { toast } from "@/components/ui/use-toast";
import { RecentOrder } from "@/components/dashboard/recent-orders";
import CardStatDashboard from "@/components/card-stats-dashboard";
import StatCard from "@/components/dashboard/stat-card";
import { SelectPitch } from "@/components/dashboard/pitch-picker";
import YearPicker from "@/components/dashboard/year-picker";

type All = {
  revenue: number;
  orders: number;
};
type MonthOverview = {
  revenue: number;
  orders: number;
};

type RevenueByMonth = {
  month: number;
  revenue: number;
};

type RevenueByDate = {
  date: Date | string;
  revenue: number;
};

type Pitch = {
  pitch_id: number;
  name: string;
  slug: string;
  address: string;
  logo: null | string; // Logo can be either null or a string
  user_id: number;
  long: null | number; // Longitude can be either null or a number
  lat: null | number; // Latitude can be either null or a number
};

type Result = {
  all: All;
  thisMonthOverview: MonthOverview;
  lastMonthOverview: MonthOverview;
  staffs: any[];
  pitches: Pitch[];
  revenueByMonths: RevenueByMonth[];
  revenueByDates: RevenueByDate[];
};

export type Data = {
  result: Result;
};

const TabItems = [
  {
    name: "Tổng quan",
    value: "overview",
  },
  {
    name: "Chi tiết",
    value: "detail",
  },
  // {
  //   name: "Báo cáo",
  //   value: "reports",
  // },
  // {
  //   name: "Thông báo",
  //   value: "notifications",
  // },
];

export default function DashboardPage() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [pitchId, setPitchId] = useState<number | undefined>();
  const params = pitchId ? { pitch_id: pitchId, month, year } : { month, year };
  const { data, isLoading, isError } = StatisticUseQuery.getPitchStats(params);

  if (isError) {
    toast({
      title: "Đã xảy ra lỗi khi tải dữ liệu trong tháng này",
      description: "Vui lòng thử lại",
      variant: "destructive",
    });
  }
  return (
    <div className="flex-1 space-y-4 px-4 py-2">
      <Tabs defaultValue="overview" className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <TabsList>
            {TabItems.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab?.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="max-w-1/2">
            <SelectPitch pitchId={pitchId} setPitchId={setPitchId} />
          </div>
          <YearPicker selectedYear={year} setSelectedYear={setYear} />
        </div>
        {/* Overview */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon="dollar"
              title="Tổng doanh thu"
              value={
                data?.result.all.revenue.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                }) || "0"
              }
            />
            <StatCard
              icon="history"
              title="Tổng số lượt đặt sân"
              value={data?.result.all.orders.toLocaleString() || "0"}
            />
            <StatCard
              icon="managerPitch"
              title="Số sân hiện tại"
              value={data?.result.pitches.length.toLocaleString() || "0"}
            />
            <StatCard
              icon="user"
              title="Số nhân viên hiện tại"
              value={data?.result.staffs.length.toLocaleString() || "0"}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Biểu đồ thống kê doanh thu theo tháng
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
                ) : (
                  <RevenueOverview data={data?.result.revenueByMonths || []} />
                )}
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Những lượt đặt sân gần nhất</CardTitle>
                <CardDescription>
                  Bạn đã có {data?.result.thisMonthOverview.orders || 0} lượt
                  đặt trong tháng này.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentOrder pitchId={pitchId} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        {/* Detail */}
        <TabsContent value="detail" className="space-y-4">
          <div className="flex items-center gap-2 justify-end">
            <MonthPicker selectedMonth={month} setSelectedMonth={setMonth} />
          </div>
          <div className="grid gap-4 lg:grid-cols-4">
            <div className="col-span-4 lg:col-span-1 grid grid-cols-3 lg:grid-cols-1 gap-2">
              <CardStatDashboard
                title={`Doanh thu trong tháng ${Number(month) + 1}`}
                value={data?.result.thisMonthOverview.revenue.toLocaleString()}
                miniIcon="dollar"
                description={`${comparePercent(
                  data?.result.thisMonthOverview.revenue,
                  data?.result.lastMonthOverview.revenue
                )}
                % so với tháng trước đó`}
              />
              <CardStatDashboard
                title={`Số lượt đặt sân trong tháng ${Number(month) + 1}`}
                value={data?.result.thisMonthOverview.orders.toLocaleString()}
                miniIcon="history"
                description={`${compareAmount(
                  data?.result.thisMonthOverview.orders,
                  data?.result.lastMonthOverview.orders
                )} so với tháng trước đó`}
              />
              <CardStatDashboard
                title={`Số nhân viên`}
                value={data?.result.staffs.length.toLocaleString()}
                miniIcon="user"
                description={`${
                  data?.result.staffs.length || 0
                } nhân viên dưới quyền quản lý`}
              />
            </div>
            <Card className="col-span-4 lg:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Biểu đồ thống kê doanh thu theo ngày trong tháng{" "}
                  {Number(month) + 1}
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
                ) : (
                  <RevenueOverviewByDate
                    data={data?.result.revenueByDates || []}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        {/* <TabsContent value="analist" className="space-y-4">
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
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
