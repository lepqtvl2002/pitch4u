import { Metadata } from "next";
import { UserAuthForm } from "@/components/auth/user-auth-form";
import AuthFormContainer from "@/components/auth/auth-form-container";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Authentication forms built using the components.",
};

export default function LoginPage() {
  return (
    <AuthFormContainer>
        <UserAuthForm type={"login"} />
    </AuthFormContainer>
  );
}
