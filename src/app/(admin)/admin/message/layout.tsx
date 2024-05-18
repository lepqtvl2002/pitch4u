"use client";

import { SidebarChats } from "@/components/ui/message-components";

export default function LayoutMessagePageAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen md:h-full">
      <SidebarChats area="admin" />
      {children}
    </div>
  );
}
