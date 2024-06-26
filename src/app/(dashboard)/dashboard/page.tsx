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
import {
  NumberBookingByTimeFrame,
  RevenueChart,
  RevenueOverviewByPitch,
} from "@/components/dashboard/revenue-overview";
import { useState } from "react";
import MonthPicker from "@/components/dashboard/month-picker";
import { RecentOrder } from "@/components/dashboard/recent-orders";
import StatCard from "@/components/dashboard/stat-card";
import { SelectMyPitch } from "@/components/dashboard/pitch-picker";
import YearPicker from "@/components/dashboard/year-picker";
import { errorToastWithCode } from "@/lib/quick-toast";
import { AxiosError } from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StaffList } from "@/components/dashboard/staff-list";
import { timeFrameToString } from "@/lib/format-datetime";

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
];

interface InputData {
  result: {
    pitch_id: number;
    pitch_name: string;
    frame: {
      time: string;
      orders: number;
    }[];
  }[];
}

interface TransformedData {
  time: number;
  data: { pitch_id: number; pitch_name: string; orders: number }[];
}

function transformData(input: InputData): TransformedData[] {
  let transformed: TransformedData[] = [];

  input.result.forEach((pitch) => {
    pitch.frame.forEach((frame) => {
      const existingTime = transformed.find(
        (t) => t.time === JSON.parse(frame.time)?.at(0)
      );
      if (existingTime) {
        existingTime.data.push({
          pitch_id: pitch.pitch_id,
          pitch_name: pitch.pitch_name,
          orders: frame.orders,
        });
      } else {
        transformed.push({
          time: JSON.parse(frame.time)?.at(0),
          data: [
            {
              pitch_id: pitch.pitch_id,
              pitch_name: pitch.pitch_name,
              orders: frame.orders,
            },
          ],
        });
      }
    });
  });

  transformed = transformed.sort((a, b) => (a.time > b.time ? 1 : -1));

  return transformed;
}

export default function DashboardPage() {
  const [typeTime, setTypeTime] = useState<"month" | "year">("month");
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [pitchId, setPitchId] = useState<number | undefined>();
  const params = pitchId ? { pitch_id: pitchId, month, year } : { month, year };
  const { data, isLoading, error } = StatisticUseQuery.getPitchStats(params);

  const { data: topPitches } = StatisticUseQuery.getPitchesByRevenue({
    limit: 20,
  });

  const {
    data: numberBookingByTimeFrame,
    isLoading: isLoadingNumberBookingByTimeFrame,
  } = StatisticUseQuery.getNumberBookingByTimeFrame();

  if (error) {
    errorToastWithCode({
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
          <div className="flex items-center gap-2 max-w-1/2">
            Sân <SelectMyPitch pitchId={pitchId} setPitchId={setPitchId} />
          </div>
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
                <CardTitle className="flex items-center justify-between flex-wrap">
                  <span>Biểu đồ thống kê tổng quan theo</span>
                  <Select
                    onValueChange={(value) =>
                      setTypeTime(value as "month" | "year")
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={`Tháng`} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">Tháng</SelectItem>
                      <SelectItem value="year">Năm</SelectItem>
                    </SelectContent>
                  </Select>
                </CardTitle>
                <div className="flex gap-2 justify-end">
                  {typeTime === "month" && (
                    <MonthPicker
                      selectedMonth={month}
                      setSelectedMonth={setMonth}
                    />
                  )}
                  <YearPicker selectedYear={year} setSelectedYear={setYear} />
                </div>
              </CardHeader>
              <CardContent className="h-96">
                <RevenueChart
                  typeTime={typeTime}
                  data={
                    typeTime === "year"
                      ? data?.result.revenueByMonths.map((e) => ({
                          time: e.month,
                          revenue: e.revenue,
                        })) || []
                      : data?.result.revenueByDates.map((e) => ({
                          time: new Date(e.date).getDate(),
                          revenue: e.revenue,
                        })) || []
                  }
                />
              </CardContent>
            </Card>
            <Card className="col-span-4 md:col-span-3">
              <CardHeader>
                <CardTitle>Danh sách nhân viên</CardTitle>
                <CardDescription>
                  Có {data?.result.staffs.length.toLocaleString() || "0"} đang
                  làm việc tại đây.
                </CardDescription>
              </CardHeader>
              <CardContent className="max-h-96 overflow-y-auto">
                <StaffList staffs={data?.result.staffs ?? []} />
              </CardContent>
            </Card>

            <Card className="col-span-4">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Biểu đồ thống kê số lượt đặt sân theo khung giờ
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 md:h-[600px] ">
                {isLoadingNumberBookingByTimeFrame ? (
                  <div className="flex gap-2">Loading...</div>
                ) : (
                  <NumberBookingByTimeFrame
                    data={
                      numberBookingByTimeFrame
                        ? transformData(numberBookingByTimeFrame)
                        : []
                    }
                  />
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
            <Card className="col-span-4 md:col-span-7">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Biểu đồ thống kê doanh thu theo từng sân
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 h-96">
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
