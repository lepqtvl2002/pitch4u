"use client";

import { formatMoney } from "@/lib/utils";
// @ts-ignore
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function RevenueOverview({
  data,
}: {
  data: { month: number; revenue: number }[];
}) {
  data = data.sort((a, b) => a.month - b.month);
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
  data = data.sort(
    (a, b) => Number(new Date(a.date)) - Number(new Date(b.date))
  );
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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const renderCustomizedLabelLine = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  fill,
  percent,
  name,
  index,
}: any) => {
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke="black"
        fill="none"
      />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${name}`}</text>
    </g>
  );
};
export function RevenueOverviewByPitch({
  data,
}: {
  data: { name: string | Date; value: number }[];
}) {
  // data = data.sort((a, b) => b.value - a.value);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={600} height={600}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={140}
          fill="#8884d8"
          labelLine={renderCustomizedLabelLine}
          label={renderCustomizedLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function RevenueChart({
  data,
  typeTime,
}: {
  data: { time: number; revenue: number }[];
  typeTime: "year" | "month";
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={300}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis
          dataKey="time"
          tickFormatter={(time) => `${typeTime === "year" ? time + 1 : time}`}
        />
        <YAxis tickFormatter={(volume) => `${volume.toLocaleString()}`} />
        <Tooltip
          labelFormatter={(time) =>
            `${typeTime === "year" ? "Tháng" : "Ngày"} ${
              typeTime === "year" ? time + 1 : time
            }`
          }
          formatter={(data) => `${data.toLocaleString()}`}
        />
        <Legend />
        <Line
          type="monotone"
          name="Doanh thu"
          dataKey="revenue"
          stroke="#82ca9d"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
