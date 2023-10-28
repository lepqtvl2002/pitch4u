"use client";
import { ProfileForm } from "@/components/dashboard/profile-form";
import { Separator } from "@/components/ui/separator";
import { UserUseQuery } from "@/server/queries/user-queries";
import { ResetPasswordForm } from "@/components/dashboard/reset-password-form";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SettingsProfilePage() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isFetching, isError } = UserUseQuery.getProfile();

  if (isFetching) return <>Fetching...</>;
  if (isError) return <>Error!</>;
  return (
    <div className="flex-1 lg:max-w-2xl space-y-6 p-10 pb-16">
      <div>
        <h3 className="text-xl font-bold">Profile</h3>
        <p className="text-sm text-muted-foreground">
          Cập nhật thông tin cá nhân của bạn.
        </p>
      </div>
      <Separator />
      <ProfileForm userProfile={data?.result} />
      <Button variant="outline" onClick={() => setIsOpen((prev) => !prev)} className="flex">
        Đặt lại mật khẩu
        {!isOpen ? <ChevronDown /> : <ChevronUp />}
      </Button>
      {isOpen && <ResetPasswordForm />}
    </div>
  );
}
