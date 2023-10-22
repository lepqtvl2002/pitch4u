import PitchDetailTable from "./data-table";
import PitchDetailStatCards from "./stat-cards";

function PitchDetailPage() {
  return (
    <div className={"container py-4 md:py-10"}>
      <div className="grid grid-cols-2 gap-4  md:grid-cols-2">
        <PitchDetailStatCards />
      </div>
      <div className="mx-auto py-10">
        <PitchDetailTable />
      </div>
    </div>
  );
}

export default PitchDetailPage;
