"use client";
import { Button } from "@/components/ui/button";
import { roleSlugToString } from "@/lib/utils";
import { LayoutDashboardIcon, PlusIcon, StepBackIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function PitchPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <>Loading...</>;

  return (
    <center className="h-screen flex flex-col">
      <div className="m-auto">
        <div className="flex flex-col gap-4 p-4">
          <h2 className="text-2xl font-medium">
            Chào mừng bạn đến với trang đăng ký sân
          </h2>
          <h4>
            Bạn đang tham gia hệ thống với vai trò là{" "}
            <span className="font-semibold text-emerald-500">
              {roleSlugToString(session?.user.userRole.name ?? "user")}
            </span>
          </h4>
          {session?.user.userRole.name !== "admin" && (
            <span className="text-muted-foreground italic">
              Nếu bạn muốn tham gia với vai trò của chủ sân, hãy thực hiện đăng
              ký sân ở bên dưới
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 p-4">
          <Button
            onClick={() => router.push("/pitch/register")}
            className="bg-emerald-500 hover:bg-emerald-300"
          >
            <PlusIcon /> Đăng ký sân bóng
          </Button>
          {(session?.user.userRole.name === "admin" ||
            session?.user.userRole.name === "staff") && (
            <Button className="gap-2" onClick={() => router.push("/dashboard")}>
              <LayoutDashboardIcon /> Đi tới bảng điều khiển
            </Button>
          )}
          <Button onClick={() => router.back()} variant="outline">
            <StepBackIcon /> Trở về
          </Button>
        </div>
      </div>
    </center>
  );
}
