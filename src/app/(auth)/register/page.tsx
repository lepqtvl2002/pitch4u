import { Metadata } from "next"
import { UserAuthForm } from "@/components/auth/user-auth-form"
import AuthFormContainer from "@/components/auth/auth-form-container"

export const metadata: Metadata = {
    title: "Đăng ký tài khoản",
    description: "Authentication forms built using the components.",
}

export default function RegisterPage() {
    return (
        <AuthFormContainer>
            <UserAuthForm type={"register"} />
        </AuthFormContainer>
    )
}