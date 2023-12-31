"use client";
import StatCard from "@/components/dashboard/stat-card";
import { StatisticUseQuery } from "@/server/queries/statistic-queries";

export default function BookingStatCards() {
  const { data, isError, isLoading } = StatisticUseQuery.getPitchStats();

  if (isLoading)
    return (
      <div className="grid grid-cols-3 gap-4 md:grid-cols-3">
        <StatCard.Loading />
        <StatCard.Loading />
        <StatCard.Loading />
      </div>
    );
  if (isError) return <h3>Error</h3>;
  return (
    <div className="grid grid-cols-3 gap-4 md:grid-cols-3">
      <StatCard
        title="Số sân đang quản lý"
        value={data.result.pitches.length}
        icon="managerPitch"
      />
      <StatCard
        title="Tổng doanh thu"
        value={data.result.all.revenue.toLocaleString()}
        icon="dollar"
      />
      <StatCard
        title="Tổng số lượt đặt sân"
        value={data.result.all.orders}
        icon="check"
      />
    </div>
  );
}
