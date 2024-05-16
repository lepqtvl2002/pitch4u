"use client";
import StatCard from "@/components/dashboard/stat-card";
import UserRoles from "@/enums/roles";
import { StatisticUseQuery } from "@/server/queries/statistic-queries";
import { useSession } from "next-auth/react";

export default function BookingStatCards() {
  const { data: session, status } = useSession();
  const { data, isError, isLoading } =
    status === "authenticated" && session.user.userRole === UserRoles.Admin
      ? StatisticUseQuery.getPitchStats()
      : {
          data: undefined,
          isError: false,
          isLoading: true,
        };

  if (isError) return <h3>Error</h3>;
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {isLoading ? (
        <>
          <StatCard.Loading />
          <StatCard.Loading />
          <StatCard.Loading />
        </>
      ) : (
        <>
          <StatCard
            title="Số sân đang quản lý"
            value={data?.result.pitches.length}
            icon="managerPitch"
          />
          <StatCard
            title="Tổng doanh thu"
            value={data?.result.all.revenue.toLocaleString()}
            icon="dollar"
          />
          <StatCard
            title="Tổng số lượt đặt sân"
            value={data?.result.all.orders}
            icon="check"
          />
        </>
      )}
    </div>
  );
}
