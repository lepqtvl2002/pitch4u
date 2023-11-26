import BookingTable from "./data-table";

export default function BookingPage() {
  return (
    <div className={"container py-4 md:py-10"}>
      <div className="grid grid-cols-2 gap-4  md:grid-cols-2">
        {/* <VoucherStatCards /> */}
      </div>
      <div className="mx-auto py-10">
        <BookingTable />
      </div>
    </div>
  );
}
