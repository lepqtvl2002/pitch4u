"use client";

import { decimalToTimeString, formatMoney } from "@/lib/utils";
import { useState } from "react";
// @ts-ignore
import {
  Bar,
  BarChart,
  CartesianGrid,
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

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AD1457",
  "#7B1FA2",
  "#303F9F",
  "#0288D1",
  "#009688",
  "#FF5722",
];

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
      <PieChart className="h-full">
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

type NumberBookingByTimeFrameDataProps = {
  data: {
    time: number;
    data: { pitch_id: number; pitch_name: string; orders: number }[];
  }[];
};

export function NumberBookingByTimeFrame(
  props: NumberBookingByTimeFrameDataProps
) {
  const [hiddenBars, setHiddenBars] = useState<string[]>([]);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={900}
        data={props.data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          tickFormatter={(time) => decimalToTimeString(time)}
          label={{
            value: "Khung giờ",
            position: "insideBottom",
            offset: -20,
            style: { fill: "#666", margin: "0px" },
          }}
        />
        <YAxis />
        <Tooltip />
        {props.data[0]?.data.map((item, index) => (
          <Bar
            key={item.pitch_id}
            dataKey={`data.${index}.orders`}
            hide={hiddenBars.includes(`data.${index}.orders`) ? true : false}
            stackId="a"
            name={`Sân ${item.pitch_name}`}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
        <Legend
          layout="horizontal"
          align="right"
          verticalAlign="top"
          onClick={(a) => {
            console.log(a);
            if (hiddenBars.includes(a.dataKey)) {
              setHiddenBars(hiddenBars.filter((item) => item !== a.dataKey));
            } else {
              setHiddenBars([...hiddenBars, a.dataKey]);
            }
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
