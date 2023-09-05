"use client";
import {useSession} from "next-auth/react";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {DropdownMenuNav, DropdownMenuProfile} from "@/components/landing/dropdown-menu-custom";

export default function Navbar() {
    const {data: session} = useSession();
    console.log(session);

    return <nav className="w-full mb-16 md:p-4 md:m-0">
        <div className="mx-auto flex justify-between items-center w-full md:justify-between absolute top-0 left-0 md:relative">
            <Link href="/"
                  className="text-xl md:text-2xl font-semibold flex items-center p-4">
                <Image
                    src="/pitch4u-logo.png"
                    alt="App Logo"
                    width={50}
                    height={50}
                    className="dark:invert md:w-20 md:h-20"
                    priority
                />
                <h1>PICTH4U</h1>
            </Link>
            <ul className="md:flex flex-1 items-center md:space-x-0 lg:space-x-8 hidden text-center">
                <li className="flex-1"><Link href="#find-pitch">Tìm sân</Link></li>
                <li className="flex-1"><Link href="#">Đăng ký làm chủ sân</Link></li>
                <li className="flex-1"><Link href="#">Cộng đồng</Link></li>
                <li className="flex-1"><Link href="#">Liên hệ</Link></li>
                {session ? <DropdownMenuProfile name={session.user.name as string}/> :
                    <Link href="/login"><Button>Sign In</Button></Link>}
            </ul>
            <DropdownMenuNav className="md:hidden block px-6"/>
        </div>
    </nav>
}
