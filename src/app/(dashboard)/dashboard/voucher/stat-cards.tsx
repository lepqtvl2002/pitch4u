"use client";
import StatCard from "@/components/dashboard/stat-card";
import { IVoucher } from "@/types/voucher";

function VoucherStatCards({
  data,
  isLoading,
  isError,
}: {
  data: IVoucher[];
  isLoading: boolean;
  isError: boolean;
}) {
  const numberOfVoucher = data?.length;
  const numberOfRunningVoucher = data?.filter(
    (voucher) => voucher.active
  )?.length;
  const numberOfStoppedVoucher = numberOfVoucher - numberOfRunningVoucher;
  const numberOfExpiredVoucher = data?.filter(
    (voucher) =>
      voucher?.expire_date && new Date(voucher.expire_date) < new Date()
  )?.length;
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {isLoading || isError ? (
        <>
          <StatCard.Loading />
          <StatCard.Loading />
          <StatCard.Loading />
          <StatCard.Loading />
        </>
      ) : (
        <>
          <StatCard
            title="Tổng số voucher"
            value={numberOfVoucher}
            icon="ticket"
          />
          <StatCard
            title="Đang chạy"
            value={numberOfRunningVoucher}
            icon="check"
          />
          <StatCard
            title="Đã dừng hoạt động"
            value={numberOfStoppedVoucher}
            icon="close"
          />
          <StatCard
            title="Hết hạn"
            value={numberOfExpiredVoucher}
            icon="close"
          />
        </>
      )}
    </div>
  );
}

export default VoucherStatCards;
