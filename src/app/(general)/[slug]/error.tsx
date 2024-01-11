"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="m-2">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-red-500 mb-4">
          Rất tiếc, đã có lỗi bất ngờ xảy ra!
        </h2>
        <p className="text-gray-600">
          Chúng tôi rất xin lỗi về sự bất tiện này. Vui lòng thử lại hoặc liên
          hệ để nhận hỗ trợ từ phía chúng tôi.
        </p>
        <div className="mt-10">
          <p className="font-semibold text-red-400">
            {error.name} : {error.message}
          </p>
        </div>
        <div className="mt-10 flex justify-between">
          <Button onClick={() => reset()}>Thử lại</Button>
          <Button variant="outline" onClick={() => router.replace("/")}>
            Trở về trang chủ
          </Button>
        </div>
      </div>
    </div>
  );
}
