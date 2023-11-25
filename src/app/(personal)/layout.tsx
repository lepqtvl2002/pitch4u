import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { SidebarNav } from "./components/sidebar-nav";
import Navbar from "@/components/landing/navbar";
import { personalNavConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Cá nhân",
  description: "Lưu giữ thông tin cá nhân của bạn.",
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="px-2 md:px-0 pb-16">
        <div className="md:container">
          <Navbar />
        </div>
        <Separator className="mb-6" />
        <div className="md:container flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="md:-mx-4 lg:w-1/5">
            <SidebarNav items={personalNavConfig.sidebarNav || []} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
