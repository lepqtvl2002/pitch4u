import { ProfileForm } from "@/components/dashboard/profile-form"
import { Separator } from "@/components/ui/separator"
import { UserUseQuery } from "@/server/queries/user-queries"

export default function SettingsProfilePage() {
    const {data, isFetching, isError} = UserUseQuery.getProfile();
    if (isFetching) return <div>Loading...</div>
    if (isError) return <div>Error</div>
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Profile</h3>
                <p className="text-sm text-muted-foreground">
                    This is how others will see you on the site.
                </p>
            </div>
            <Separator />
            <ProfileForm userProfile={data.result} />
        </div>
    )
}