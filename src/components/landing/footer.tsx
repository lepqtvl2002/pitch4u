import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Facebook, Twitter } from "lucide-react";
import { mainFooterConfig } from "@/config/site";
import Link from "next/link";

export default function Footer({
  className,
  ...props
}: {
  className?: string;
}) {
  return (
    <footer
      className={cn(
        "flex flex-col md:flex-row justify-between w-full py-20",
        className
      )}
      {...props}
    >
      <div className="w-full flex flex-col md:w-1/2 mb-10">
        <h2 className="text-3xl mb-4 font-semibold">Liên hệ với chúng tôi</h2>
        {mainFooterConfig.map((ele) => (
          <Link className="underline" key={ele.href} href={ele.href}>
            {ele.title}
          </Link>
        ))}
      </div>
      <div className="w-full md:w-1/2 text-sm md:text-md">
        <div className="flex w-full pb-10 space-x-4">
          <div className="md:w-1/2 text-lg">
            <h4 className="pb-2 text-sm font-bold mb-4">Chi nhánh chính</h4>
            <p className="">54, Nguyễn Lương Bằng,</p>
            <p className="">Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng</p>
            <p className="">(123) 456 7890</p>
          </div>
          <div className="md:w-1/2 text-lg flex flex-col">
            <h4 className="pb-2 text-sm font-bold mb-4">Social media</h4>
            <Link className="flex underline" href="/">
              <Facebook className="mr-2" />
              Facebook
            </Link>
            <Link className="flex underline" href="/">
              <Twitter className="mr-2" />
              Twitter
            </Link>
          </div>
        </div>
        <div className="mb-10">
          <p className="font-bold">Email:</p>
          <p className="text-lg">example@example.com</p>
          <p className="font-bold">Phone:</p>
          <p className="text-lg">012-345-6789</p>
        </div>

        <p className="font-bold pb-2">Tải app ngay thôi</p>
        <div className="pr-4">
          <div className="flex justify-end space-x-10">
            <div className="flex flex-col justify-around h-32">
              <Link href="/" className="p-2 bg-white rounded shadow">
                <Image
                  src="/logo-play-store.png"
                  alt="logo-play-store"
                  width={100}
                  height={80}
                />
              </Link>
              <Link href="/" className="p-2 bg-white rounded shadow">
                <Image
                  src="/logo-app-store.png"
                  alt="logo-app-store"
                  width={100}
                  height={80}
                />
              </Link>
            </div>
            <Image
              src="/test-qr-code.jpg"
              alt="qr-code"
              width={200}
              height={200}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
