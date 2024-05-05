import BookingTable from "./data-table";
import BookingStatCards from "./stat-cards";

export default function BookingPage() {
  return (
    <div className="px-2 md:container py-4 md:py-10 max-w-7xl">
      <BookingStatCards />
      <div className="md:mx-auto py-10">
        <BookingTable />
      </div>
    </div>
  );
}
