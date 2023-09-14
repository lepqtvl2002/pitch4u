import VoucherTable from "./data-table";
import VoucherStatCards from "./stat-cards";

function VoucherPage() {
    return (
        <div className={"container py-4 md:py-10"}>
            <div className="grid grid-cols-2 gap-4  md:grid-cols-2">
                <VoucherStatCards />
            </div>
            <div className="mx-auto py-10">
                <VoucherTable />
            </div>
        </div>
    );
}

export default VoucherPage;