import {ThemeProvider} from "@/providers/theme-provider";
import TeamSwitcher from "@/components/dashboard/team-switcher";
import {MainNav} from "@/components/dashboard/main-nav";
import {Search} from "@/components/dashboard/search";
import {UserNav} from "@/components/dashboard/user-nav";
import {ModeToggle} from "@/components/theme-button";

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="hidden flex-col md:flex">

                <div className="border-b">
                    <div className="flex h-16 items-center px-4">
                        <TeamSwitcher/>
                        <MainNav className="mx-6"/>
                        <div className="ml-auto flex items-center space-x-4">
                            <Search/>
                            <UserNav/>
                            <ModeToggle/>
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </ThemeProvider>
    );
}
