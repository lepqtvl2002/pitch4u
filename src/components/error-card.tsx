import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { HomeIcon, ReloadIcon } from "@radix-ui/react-icons";

export default function ErrorCard({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  return (
    <div className="m-2 w-full h-full">
      <Card className="m-auto max-w-md w-full bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-red-500 mb-4">
            Rất tiếc, đã có lỗi bất ngờ xảy ra!
          </CardTitle>
          <CardDescription className="text-gray-600">
            Chúng tôi rất xin lỗi về sự bất tiện này. Vui lòng thử lại hoặc liên
            hệ để nhận hỗ trợ từ phía chúng tôi.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Thông tin lỗi:</p>
          <p className="font-semibold text-red-400">
            {error.name} : {error.message}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className="gap-2" onClick={() => reset()}>
            Thử lại <ReloadIcon />
          </Button>
          <Button
            className="gap-2"
            variant="outline"
            onClick={() => router.replace("/")}
          >
            Trở về trang chủ <HomeIcon />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
