import { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import AuthFormContainer from "@/components/auth/auth-form-container";

export const metadata: Metadata = {
  title: "Đăng ký thành công",
  description: "Hồ sơ của bạn đang được xét duyệt, vui lòng đợi.",
};

export default function PitchRegisterSuccessPage() {
  return (
    <AuthFormContainer>
      <div className="flex flex-col justify-center items-center m-auto">
        <span className="text-emerald-500 text-3xl text-center">
          Đăng ký thành công
        </span>
        <p className="text-center mb-32">
          Đang duyệt tài khoản của bạn, vui lòng đợi
        </p>
        <Link href="/">
          <Button
            className="w-64 text-emerald-500 border-main"
            variant={"outline"}
          >
            Quay lại trang chủ
          </Button>
        </Link>
      </div>
    </AuthFormContainer>
  );
}
