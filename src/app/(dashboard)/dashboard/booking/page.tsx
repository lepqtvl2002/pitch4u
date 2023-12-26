import BookingTable from "./data-table";

export default function BookingPage() {
  return (
    <div className="container py-4 md:py-10 max-w-7xl">
      <div className="grid grid-cols-2 gap-4  md:grid-cols-2">
        {/* <PitchStatCards /> */}
      </div>
      <div className="mx-auto py-10 max-w-screen-2xl">
        <BookingTable />
      </div>
    </div>
  );
}
