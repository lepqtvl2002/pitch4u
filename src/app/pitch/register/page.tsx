import { Metadata } from "next";

import { PitchRegisterForm } from "@/components/landing/pitches-register-form";

export const metadata: Metadata = {
  title: "Đăng ký làm chủ sân",
  description: "Nộp hồ sơ đăng ký làm chủ sân.",
};

export default function PitchRegisterPage() {
  return (
    <div className="m-auto p-4 md:p-10">
      <PitchRegisterForm />
    </div>
  );
}
