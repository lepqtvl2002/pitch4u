import StaffStatCards from "./stat-cards";
import StaffTable from "./data-table";

export default function StaffPage() {
    return <div className={"container py-4 md:py-10"}>
        <div className="grid grid-cols-2 gap-4  md:grid-cols-2">
            {/* <StaffStatCards /> */}
        </div>
        <div className="mx-auto py-10">
            <StaffTable />
        </div>
    </div>
}