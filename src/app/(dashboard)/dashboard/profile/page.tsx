"use client";
import { ProfileForm } from "@/components/dashboard/profile-form";
import { ResetPasswordForm } from "@/components/dashboard/reset-password-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserUseQuery } from "@/server/queries/user-queries";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function SettingsProfilePage() {
  const { data, isFetching, isError } = UserUseQuery.getProfile();
  const [isOpen, setIsOpen] = useState(false);
  if (isFetching) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  return (
    <div className="flex-1 lg:max-w-2xl space-y-6 p-10 pb-16">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm userProfile={data.result} />
      <Button
        variant="outline"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex"
      >
        Đặt lại mật khẩu
        {!isOpen ? <ChevronDown /> : <ChevronUp />}
      </Button>
      {isOpen && <ResetPasswordForm />}
    </div>
  );
}
