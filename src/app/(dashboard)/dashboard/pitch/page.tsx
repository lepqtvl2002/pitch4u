import PitchStatCards from "./stat-cards";
import PitchTable from "./data-table";

export default function PitchPage() {
    return <div className={"container py-4 md:py-10"}>
        <div className="grid grid-cols-2 gap-4  md:grid-cols-2">
            {/* <PitchStatCards /> */}
        </div>
        <div className="mx-auto py-10">
            <PitchTable />
        </div>
    </div>
}