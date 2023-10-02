"use client";
import { ProfileForm } from "@/components/dashboard/profile-form";
import { Separator } from "@/components/ui/separator";
import {useSession} from "next-auth/react";
import {UserUseQuery} from "@/server/queries/user-queries";

export default function SettingsProfilePage() {
    const {data: session} = useSession();
    const {data, isFetching, isError} = UserUseQuery.getProfile();

    if (isFetching) return <>Fetching...</>
    if (isError) return <>Error!</>
    return (
        <div className="flex-1 lg:max-w-2xl space-y-6 p-10 pb-16">
            <div>
                <h3 className="text-xl font-bold">Profile</h3>
                <p className="text-sm text-muted-foreground">
                    Cập nhật thông tin cá nhân của bạn.
                </p>
            </div>
            <Separator/>
            <ProfileForm userProfile={data?.result}/>
        </div>
    )
}