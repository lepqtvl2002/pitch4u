import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { PitchRegisterForm } from "@/components/landing/pitches-register-form";
import AuthFormContainer from "@/components/auth/auth-form-container";

export const metadata: Metadata = {
  title: "Đăng ký làm chủ sân",
  description: "Nộp hồ sơ đăng ký làm chủ sân.",
};

export default function PitchRegisterPage() {
  return (
    <AuthFormContainer>
      <PitchRegisterForm />
    </AuthFormContainer>
  );
}
