import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { RegistrationUseMutation } from "@/server/actions/registration-actions";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";

function ActionsDropdownMenu({
  link,
  id,
}: {
  id: string | number;
  link: string;
}) {
  const { mutateAsync } = RegistrationUseMutation.approve();
  async function handleApprove() {
    try {
      const res = await mutateAsync({ registration_id: id });
      if (res.status === 200) {
        toast({
          title: "Thành công",
          description: "Đã chấp nhận hồ sơ đăng ký",
          variant: "success",
        });
      } else {
        toast({
          title: "Thất bại",
          description: "Đã có lỗi xảy ra",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Đã có lỗi xảy ra",
        description: "Vui lòng thử lại sau.",
        variant: "destructive",
      });
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={link}>Xem chi tiết</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleApprove}>Chấp nhận</DropdownMenuItem>
        <DropdownMenuItem>Từ chối</DropdownMenuItem>
        <DropdownMenuItem>Xóa</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ActionsDropdownMenu;
