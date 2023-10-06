"use client";
import StatCard from "@/components/dashboard/stat-card";
// import { VoucherApi } from "@hooks/use-voucher-query";

function RegistrationStatCards() {
  // const { isLoading, isError, data: rawData } = VoucherApi.getStats();
  if (true)
    return (
      <>
        <StatCard.Loading />
        <StatCard.Loading />
      </>
    );
  // if (isError) return <h3>Error</h3>;
  // return (
  //   <>
  //     <StatCard
  //       title="Đang chạy"
  //       value={rawData.numberOfRunningVoucher}
  //       icon="radio"
  //     />
  //     <StatCard
  //       title="Đã hết hạn"
  //       value={rawData.numberOfExpiredVoucher}
  //       icon="check"
  //     />
  //   </>
  // );
}

export default RegistrationStatCards;