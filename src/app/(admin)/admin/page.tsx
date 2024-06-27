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
import CardStatDashboard from "@/components/card-stats-dashboard";
import StatCard from "@/components/dashboard/stat-card";
import { SelectPitch } from "@/components/dashboard/pitch-picker";
import YearPicker from "@/components/dashboard/year-picker";
import TopPitches from "@/components/dashboard/top-pitches";

type All = {
  revenue: number;
  orders: number;
  registrations: number;
  pitches: number;
};
type MonthOverview = {
  revenue: number;
  orders: number;
  registrations: number;
  pitches: number;
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
  const { data, isLoading } = StatisticUseQuery.getSystemStats(params);

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
              icon="history"
              title="Số lượt đăng ký sân"
              value={data?.result.all.registrations.toLocaleString() || "0"}
            />
            <StatCard
              icon="history"
              title="Số sân trong hệ thống"
              value={data?.result.all.pitches.toLocaleString() || "0"}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Biểu đồ thống kê doanh thu theo tháng trong năm {year}
                </CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                {isLoading ? (
                  <div className="flex gap-2">
                    {new Array(12).fill(0).map((_, index) => (
                      <Skeleton key={index} className="w-1/12 h-60" />
                    ))}
                  </div>
                ) : (
                  <RevenueOverview data={data?.result.revenueByMonths || []} />
                )}
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Top những sân có doanh thu cao nhất</CardTitle>
                <CardDescription>
                  Những sân có doanh thu cao nhất trong hệ thống.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TopPitches />
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
                title={`Số lượt đăng ký trong tháng ${Number(month) + 1}`}
                value={data?.result.thisMonthOverview.registrations.toLocaleString()}
                miniIcon="user"
                description={`${compareAmount(
                  data?.result.thisMonthOverview.registrations,
                  data?.result.lastMonthOverview.registrations
                )} so với tháng trước đó`}
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
                    <Skeleton className="w-1/12 h-60" />
                    <Skeleton className="w-1/12 h-60" />
                    <Skeleton className="w-1/12 h-60" />
                    <Skeleton className="w-1/12 h-60" />
                    <Skeleton className="w-1/12 h-60" />
                    <Skeleton className="w-1/12 h-60" />
                    <Skeleton className="w-1/12 h-60" />
                    <Skeleton className="w-1/12 h-60" />
                    <Skeleton className="w-1/12 h-60" />
                    <Skeleton className="w-1/12 h-60" />
                    <Skeleton className="w-1/12 h-60" />
                    <Skeleton className="w-1/12 h-60" />
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
      </Tabs>
    </div>
  );
}
