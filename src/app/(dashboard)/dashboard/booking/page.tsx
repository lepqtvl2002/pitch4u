import BookingTable from "./data-table";

export default function BookingPage() {
  return (
    <div className={"w-full py-4 md:py-10"}>
      <div className="grid grid-cols-2 gap-4  md:grid-cols-2">
        {/* <VoucherStatCards /> */}
      </div>
      <div className="mx-auto w-11/12">
        <BookingTable />
      </div>
    </div>
  );
}
