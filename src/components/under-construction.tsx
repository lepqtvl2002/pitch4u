import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Image from "next/image";

export default function UnderConstruction() {
  const router = useRouter();
  return (
    <center className="w-full h-full p-10">
      <div className="flex flex-col items-center gap-4">
        <span className="text-xl font-medium">
          Đang trong quá trình phát triển
        </span>
        <Image
          src={"/under-construction.jpg"}
          alt="under construction"
          width={1000}
          height={1000}
          className="w-full h-auto"
        />
        <Button
          onClick={() => {
            router.back();
          }}
        >
          Trở lại
        </Button>
      </div>
    </center>
  );
}
