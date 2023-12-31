import PitchStatCards from "./stat-cards";
import PitchTable from "./data-table";

export default function PitchPage() {
    return <div className="px-2 md:container py-4 md:py-10">
        <PitchStatCards />
        <div className="mx-auto py-10">
            <PitchTable />
        </div>
    </div>
}