import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenuNav,
  DropdownMenuProfile,
} from "@/components/landing/dropdown-menu-custom";
import { cn } from "@/lib/utils";
import { publicNavbarConfig } from "@/config/site";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";

export default async function Navbar({
  className,
  ...props
}: {
  className?: string;
}) {
  const session = await getServerSession(authOptions);
  return (
    <nav className={cn("w-full md:px-4 md:m-0", className)} {...props}>
      <div className="mx-auto flex justify-between items-center w-full h-fit md:justify-between">
        <div className="flex">
          <a
            href="/"
            className="text-xl md:text-2xl font-semibold flex items-center p-2 md:p-4"
          >
            <Image
              src="/pitch4u-logo.svg"
              alt="App Logo"
              width={50}
              height={50}
              className="dark:invert md:w-20 md:h-20"
              priority
            />
            <h1>PITCH4U</h1>
          </a>
          <ul className="md:flex items-center w-auto hidden text-center">
            {publicNavbarConfig.mainNav.map((item) => (
              <li key={item.title} className="h-full px-3">
                <Link
                  href={item.href}
                  className="flex text-center items-center h-full"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {session?.user ? (
          <DropdownMenuProfile user={session?.user} className={"flex"} />
        ) : (
          <div className="hidden md:flex gap-2 w-fit">
            <Button>
              <Link className="w-max" href={"/login"}>Đăng nhập</Link>
            </Button>
            <Button variant="ghost" className="border border-primary">
              <Link className="w-max" href={"/register"}>Đăng ký</Link>
            </Button>
          </div>
        )}
        <DropdownMenuNav
          user={session?.user}
          className="md:hidden block px-6 bg-transparent border-none hover:bg-gray-200 text-primary"
        />
      </div>
    </nav>
  );
}
