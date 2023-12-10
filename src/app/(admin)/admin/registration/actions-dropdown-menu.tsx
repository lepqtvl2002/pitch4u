import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { mutatingToast } from "@/lib/quick-toast";
import { RegistrationUseMutation } from "@/server/actions/registration-actions";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";

function ActionsDropdownMenu({
  link,
  id,
  refetch,
}: {
  id: string | number;
  link: string;
  refetch?: any;
}) {
  const { mutateAsync: approveMutate } = RegistrationUseMutation.approve();
  const { mutateAsync: denyMutate } = RegistrationUseMutation.deny();
  async function handleApprove() {
    try {
      const res = await approveMutate({ registration_id: id });
      if (res.status === 200) {
        toast({
          title: "Thành công",
          description: "Đã chấp nhận hồ sơ đăng ký",
          variant: "success",
        });
        if (refetch) refetch();
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

  async function handleDenyRegistration() {
    mutatingToast();
    await denyMutate({ registration_id: id, deny_reason: "some thing wrong" });
    if (refetch) refetch();
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
        <DropdownMenuItem
          className="bg-green-500 text-white"
          onClick={handleApprove}
        >
          Chấp nhận
        </DropdownMenuItem>
        <DropdownMenuItem
          className="bg-red-500 text-white"
          onClick={handleDenyRegistration}
        >
          Từ chối
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ActionsDropdownMenu;
