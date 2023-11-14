import PitchDetailTable from "./data-table";
import PitchTimeline from "./timeline";

function PitchDetailPage() {
  return (
    <div className={"container py-4 md:py-10"}>
      <div className="mx-auto">
        {/* <PitchDetailTable /> */}
      </div>
      <PitchTimeline/>
    </div>
  );
}

export default PitchDetailPage;
