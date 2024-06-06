import { User } from "@/server/queries/user-queries";
import { AvatarCustom } from "../ui/avatar-custom";

export function StaffList({ staffs }: { staffs: User[] }) {
  return (
    <div className="space-y-6">
      {staffs?.map((staff) => {
        return (
          <div key={staff.user_id} className="flex items-center">
            <AvatarCustom avatarUrl={staff.avatar} name={staff.fullname} />
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {staff.fullname}
              </p>
              <p className="text-sm text-muted-foreground">{staff.email}</p>
            </div>
            <div className="ml-auto font-medium">
              <p>{staff.phone}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
