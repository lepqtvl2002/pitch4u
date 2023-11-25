import { toast } from "@/components/ui/use-toast";

export function mutatingToast() {
    toast({ title: "Đang xử lý", description: "Vui lòng chờ..." });
}