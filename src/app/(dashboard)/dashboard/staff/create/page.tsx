import { StaffProfileForm } from "@/components/dashboard/staff-profile-form";
import { Separator } from "@/components/ui/separator";

export default function CreateStaffPage() {
  return (
    <div className="w-screen lg:max-w-2xl space-y-6 px-2 md:p-10 pb-16">
      {/* <div>
        <h3 className="text-lg font-medium">Thêm mới nhân viên</h3>
        <p className="text-sm text-muted-foreground">
          Điền các thông tin cần thiết về nhân viên để thêm mới.
        </p>
      </div>
      <Separator /> */}
      <StaffProfileForm />
    </div>
  );
}
