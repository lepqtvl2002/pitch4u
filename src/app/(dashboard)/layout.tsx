import { ThemeProvider } from "@/providers/theme-provider";
import { MainNav } from "@/components/dashboard/main-nav";
import DashboardSidebar from "@/components/dashboard/sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { notFound } from "next/navigation";
import { dashboardConfig, dashboardConfigOperator } from "@/config/site";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const navItems =
    session?.user?.userRole?.name === "admin"
      ? dashboardConfigOperator.sidebarNav
      : dashboardConfig.sidebarNav;

  if (!session?.user) {
    return notFound();
  }

  if (session?.user.userRole.name === "staff") {
    window.location.href = "/dashboard/pitch";
  }
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="relative grid flex-1 md:grid-cols-[auto_1fr]">
        <div className="hidden md:block">
          <DashboardSidebar user={session?.user} items={navItems} />
        </div>
        <div className="flex-col md:flex border-l">
          <MainNav className="px-6 h-12 md:h-16 border-b" navItems={navItems} />
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
}
