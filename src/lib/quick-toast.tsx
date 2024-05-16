import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { signOut } from "next-auth/react";

export function mutatingToast() {
  toast({ title: "Đang xử lý", description: "Vui lòng chờ..." });
}

export function successToast({
  actionName,
  description,
}: {
  actionName?: string;
  description?: string;
}) {
  toast({
    variant: "success",
    title: `Thực hiện hành động ${actionName} thành công`,
    description,
  });
}

export function errorToast({
  actionName,
  code,
}: {
  actionName?: string;
  code: number | undefined;
}) {
  let description = "";
  switch (code) {
    case 403:
      description = "Bạn không có quyền";
      break;
    case 404:
      description = "Không tìm thấy dữ liệu";
      break;
    case 401:
      description = "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại";
      break;
    case 429:
      description = "Quá nhiều request";
      break;
    case 500:
      description = "Lỗi server";
      break;
    case undefined:
      description = "Lỗi không xác định";
      break;
    default:
      description = `Đã xảy ra lỗi ${code}`;
      break;
  }
  toast({
    variant: "destructive",
    title: `Không thể thực hiện hành động ${actionName}`,
    description,
  });
}

export function reloginToast() {
  toast({
    title: "Phiên đăng nhập hết hạn",
    description: "Vui lòng đăng nhập lại",
    variant: "destructive",
    action: (
      <ToastAction
        onClick={() => {
          const callbackUrl = new URL(window.location.href);
          signOut({
            redirect: true,
            callbackUrl: `/login?callbackUrl=${callbackUrl}`,
          });
        }}
        altText={"relogin"}
      >
        Đăng nhập
      </ToastAction>
    ),
  });
}
