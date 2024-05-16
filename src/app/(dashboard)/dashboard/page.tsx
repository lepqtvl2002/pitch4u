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
  RevenueOverviewByPitch,
} from "@/components/dashboard/revenue-overview";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import MonthPicker from "@/components/dashboard/month-picker";
import { RecentOrder } from "@/components/dashboard/recent-orders";
import CardStatDashboard from "@/components/card-stats-dashboard";
import StatCard from "@/components/dashboard/stat-card";
import { SelectPitch } from "@/components/dashboard/pitch-picker";
import YearPicker from "@/components/dashboard/year-picker";
import { useSession } from "next-auth/react";
import UserRoles from "@/enums/roles";
import { redirect } from "next/navigation";
import { errorToast } from "@/lib/quick-toast";
import { AxiosError } from "axios";

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
  {
    name: "Doanh thu theo sân",
    value: "revenueByPitch",
  },
  // {
  //   name: "Thông báo",
  //   value: "notifications",
  // },
];

const fakeData = {
  result: {
    all: { revenue: 0, orders: 0 },
    thisMonthOverview: { revenue: 0, orders: 0 },
    lastMonthOverview: { revenue: 0, orders: 0 },
    staffs: [],
    pitches: [],
    revenueByMonths: [],
    revenueByDates: [],
  },
};

export default function DashboardPage() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [pitchId, setPitchId] = useState<number | undefined>();
  const params = pitchId ? { pitch_id: pitchId, month, year } : { month, year };
  const { data: session, status } = useSession();
  const { data, isLoading, error } =
    status === "authenticated" && session.user.userRole === UserRoles.Admin
      ? StatisticUseQuery.getPitchStats(params)
      : {
          data: fakeData,
          isLoading: false,
          error: null,
        };

  const { data: topPitches } =
    status === "authenticated" && session.user.userRole === UserRoles.Admin
      ? StatisticUseQuery.getTopPitchesByRevenue({
          limit: 20,
        })
      : {
          data: { result: { data: [] } },
        };

  if (session?.user.userRole !== UserRoles.Staff) {
    redirect("/dashboard/booking");
  }

  if (error) {
    errorToast({
      actionName: "Lấy dữ liệu thống kê",
      code: (error as AxiosError).response?.status,
    });
  }
  return (
    <div className="flex-1 space-y-4 px-2 md:px-4 py-2">
      <Tabs defaultValue="overview" className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
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
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
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
            <Card className="col-span-4 md:col-span-3">
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
          <div className="grid grid-cols-1 gap-2 lg:gap-x-4 lg:grid-cols-4">
            <div className="grid gap-2">
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
            <Card className="col-span-1 lg:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Biểu đồ thống kê doanh thu theo ngày trong tháng{" "}
                  {Number(month) + 1}
                </CardTitle>
              </CardHeader>
              <CardContent className="md:pl-2">
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
        {/* Revenue by pitch */}
        <TabsContent value="revenueByPitch" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Biểu đồ thống kê doanh thu theo từng sân
                </CardTitle>
              </CardHeader>
              <CardContent className="pl-2 h-96">
                {isLoading ? (
                  <div className="flex gap-2">Loading...</div>
                ) : (
                  <RevenueOverviewByPitch
                    data={
                      topPitches?.result.data.map((pitch) => ({
                        name: pitch.pitch.name,
                        value: pitch.revenue,
                      })) || []
                    }
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
