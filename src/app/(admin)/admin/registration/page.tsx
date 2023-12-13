import RegistrationTable from "./data-table";
import RegistrationStatCards from "./stat-cards";

function RegistrationPage() {
  return (
    <div className={"container py-4 md:py-10"}>
      <div className="grid grid-cols-2 gap-4  md:grid-cols-2">
        {/* <RegistrationStatCards /> */}
      </div>
      <div className="mx-auto py-10">
        <RegistrationTable />
      </div>
    </div>
  );
}

export default RegistrationPage;
