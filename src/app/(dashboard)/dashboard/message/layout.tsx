"use client";

import { ContainerChats } from "@/components/ui/message-components";

export default function LayoutMessagePage({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ContainerChats area="dashboard">{children}</ContainerChats>;
}
