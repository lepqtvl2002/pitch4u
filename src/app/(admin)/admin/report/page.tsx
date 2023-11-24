import ReportTable from "./data-table";
import ReportStatCards from "./stat-cards";

export default function ReportPage() {
  return (
    <div className={"container py-4 md:py-10"}>
      {/* <div className="grid grid-cols-2 gap-4  md:grid-cols-2">
        <ReportStatCards />
      </div> */}
      <div className="mx-auto py-10">
        <ReportTable />
      </div>
    </div>
  );
}
