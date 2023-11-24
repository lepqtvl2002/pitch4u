import AuthFormContainer from "@/components/auth/auth-form-container";
import { OTPForm } from "@/components/auth/otp-input-form";

export default function RegisterPage() {
  return (
    <AuthFormContainer>
      <OTPForm />
    </AuthFormContainer>
  );
}
