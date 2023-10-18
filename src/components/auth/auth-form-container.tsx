import Image from "next/image";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function AuthFormContainer({children}: {children: React.ReactNode}) {
  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <a
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Home
      </a>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-main" />
        <a
          href="/"
          className="relative z-20 flex items-center text-lg font-medium"          
        >
          <Image
            src={"/pitch4u-logo.png"}
            alt={"Logo"}
            width={30}
            height={30}
          />
          PITCH4U
        </a>
        <div className={"flex justify-center items-center z-10"}>
          <Image
            src={"/pitch4u-photo01.webp"}
            alt={"Photo1"}
            width={400}
            height={400}
          />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Tôi không biết điều gì quan trọng hơn trong bóng đá. Không
              phải là sự chiến thắng hay thất bại, mà là cách bạn chơi trò
              chơi.&rdquo;
            </p>
            <footer className="text-sm">Pelé</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex h-screen lg:p-8">
        {children}
      </div>
    </div>
  );
}
