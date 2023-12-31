import BookingTable from "./data-table";
import BookingStatCards from "./stat-cards";

export default function BookingPage() {
  return (
    <div className="container py-4 md:py-10 max-w-7xl">
        <BookingStatCards />
      <div className="mx-auto py-10 max-w-screen-2xl">
        <BookingTable />
      </div>
    </div>
  );
}
