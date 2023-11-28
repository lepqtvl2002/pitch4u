import PitchDetailTable from "./data-table";
import PitchTimeline from "./timeline";

function PitchDetailPage() {
  return (
    <div className={"h-screen overflow-y-auto no-scrollbar container py-4 md:py-10 mb-10"}>
      <div className="mx-auto">
        <PitchDetailTable />
      </div>
      <PitchTimeline/>
    </div>
  );
}

export default PitchDetailPage;
