"use client";

import { formatMoney } from "@/lib/utils";
// @ts-ignore
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export function RevenueOverview({
  data,
}: {
  data: { month: number; revenue: number }[];
}) {
    data = data.sort((a, b) => a.month - b.month)
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="month"
          tickFormatter={(month) => `${month + 1}`}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(revenue) => formatMoney(revenue)}
        />
        <Bar dataKey="revenue" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function RevenueOverviewByDate({
  data,
}: {
  data: { date: string | Date; revenue: number }[];
}) {
    data = data.sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)))
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="date"
          tickFormatter={(date) => `${new Date(date).getDate()}`}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(revenue) => formatMoney(revenue)}
        />
        <Bar dataKey="revenue" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
