import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
export default function MessagePage() {
  return (
    <div className={"flex-1 h-full relative"}>
      <div
        className={
          "flex justify-between items-center p-2 border-b border-b-gray-300 shadow"
        }
      >
        <div className={"flex items-center space-x-2"}>
          <Skeleton className="w-10 h-10 rounded-full" />
        </div>

        <Button variant={"ghost"}>
          <MoreHorizontal />
        </Button>
      </div>
      <div className="w-full h-full text-center pt-20">
        <span className="m-auto">Qua trái và tìm kiếm cuộc trò chuyện nào</span>
      </div>
    </div>
  );
}
