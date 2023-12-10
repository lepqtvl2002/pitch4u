"use client";

import * as React from "react";
import { UserUseQuery } from "@/server/queries/user-queries";
import { PitchRegisterForm } from "@/components/landing/pitches-register-form";

export default function CreatePitchPage() {
  const { data, isLoading } = UserUseQuery.getProfile();
  if (isLoading) return <>Loading...</>;
  return (
    <div className="p-10">
      <PitchRegisterForm user={data?.result} />
    </div>
  );
}
