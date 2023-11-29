"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function PitchPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <>Loading...</>;
  if (session?.user.userRole.name === "admin" || "staff") {
    router.push("/dashboard");
  } else {
    router.push("/dashboard/pitch/register");
  }
}
