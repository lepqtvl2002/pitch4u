import UserStatCards from "./stat-cards";
import UserTable from "./data-table";


function UserPage() {
    return (
        <div className={"container py-4 md:py-10"}>
            <div className="grid grid-cols-2 gap-4  md:grid-cols-2">
                {/* <UserStatCards/> */}
            </div>
            <div className="mx-auto py-10">
                <UserTable/>
            </div>
        </div>
    );
}

export default UserPage;