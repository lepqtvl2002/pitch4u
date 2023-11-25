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

  if (!session?.user) {
    return notFound();
  }
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="relative grid flex-1 md:grid-cols-[auto_1fr]">
        <DashboardSidebar
          user={session?.user}
          items={
            session.user?.userRole?.name === "admin"
              ? dashboardConfigOperator.sidebarNav
              : dashboardConfig.sidebarNav
          }
        />
        <div className="flex-col md:flex border-l">
          <MainNav className="px-6 h-10 md:h-16 border-b" />
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
}
