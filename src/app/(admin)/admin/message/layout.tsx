"use client";
import { ContainerChats } from "@/components/ui/message-components";

export default function LayoutMessagePageAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ContainerChats area="admin">{children}</ContainerChats>;
}
