import { Button } from "@/components/ui/button";
import Image from "next/image";
import SearchBar from "@/app/(general)/[slug]/components/search-bar";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import Link from "next/link";
import { ArrowDownIcon } from "lucide-react";

export default async function Home() {
  return (
    <main className="scroll-smooth bg-white">
      <Navbar />
      <div className="md:container px-2 flex min-h-screen flex-col items-center justify-between">
        <section
          id="general"
          className=" flex flex-col lg:flex-row w-full justify-between pb-20"
        >
          <div className="flex w-full flex-col space-y-6 lg:p-10 pb-10 z-10">
            <div className="text-center text-4xl font-bold md:text-6xl lg:text-7xl xl:text-8xl lg:text-start space-y-2">
              <h1>SÂN ĐẸP</h1>
              <h1>ĐỒNG ĐỘI</h1>
              <h1>ĐỐI THỦ</h1>
            </div>
            <span className="text-center text-2xl">Tìm ở đây!!!</span>
            <div className="flex space-x-10">
              <Link href="#general" className={"w-1/2 scroll-link"}>
                <Button
                  className={
                    "w-full md:h-16 md:text-xl rounded-full bg-emerald-500"
                  }
                >
                  Tải app ngay
                </Button>
              </Link>
              <Link href="#find-pitch" className={"w-1/2 scroll-link"}>
                <Button
                  variant="outline"
                  className={
                    "w-full md:h-16 md:text-xl rounded-full bg-emerald-100 text-emerald-500"
                  }
                >
                  Tìm sân <ArrowDownIcon className="ml-2 animate-bounce" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-full p-10 lg:p-0 flex justify-center absolute top-24 left-0 lg:relative lg:top-0">
            <Image
              alt="Team"
              src={"/pitch4u-photo01.webp"}
              width={500}
              height={500}
              loading={"lazy"}
              className="flex-1 opacity-50 lg:opacity-100 md:p-20 lg:p-0"
            />
          </div>
        </section>

        <section
          id="find-pitch"
          className="w-full relative p-2 md:pl-10 lg:pl-20 flex-col justify-betweenpy-10 md:py-20 z-10 bg-gradient-to-l from-emerald-300/50 from-60% rounded-2xl"
        >
          <h2 className="pb-6 md:pb-10 text-3xl font-semibold">
            Nhanh và dễ dàng
          </h2>
          <h4 className="text-bold pb-4 md:pb-8 text-sm md:text-xl">
            Chúng tôi tìm sân đẹp, chất lượng theo yêu cầu và đặt sân nhanh
            chóng chỉ trong vài bước
          </h4>
          <SearchBar />
          <Image
            src="/pitch4u-photo02.png"
            alt="bong-bay-vao-luoi"
            width={600}
            height={600}
            className="absolute right-0 top-28 lg:top-0 -z-10"
          />
        </section>

        <section
          id="community"
          className="z-10 flex w-full flex-col items-center justify-between md:space-y-10 py-10 md:py-20"
        >
          <h2 className="pb-10 font-semibold text-center text-3xl">
            Giao lưu gắn kết
          </h2>
          <div className="w-full px-4 md:px-10 lg:px-20 grid grid-cols-1 md:grid-cols-3 md:gap-4 lg:gap-10 xl:gap-32 rounded-none">
            <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-red-300 flex flex-col items-center justify-end space-y-8 pb-6 mb-4 h-80 bg-white p-4 shadow-xl rounded-tr-[100px] rounded-bl-[100px]">
              <Image
                alt="Feature 1"
                src={"/pitch4u-photo03.webp"}
                width={200}
                height={160}
              />
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-bold">Tìm đồng đội</h3>
                <p className="break-words px-4 text-sm mt-2">
                  Tìm cho mình những đồng đội và tạo nên những trận đấu tuyệt
                  vời.
                </p>
              </div>
            </div>
            <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-yellow-300 flex flex-col items-center justify-end space-y-8 pb-6 mb-4 h-80 bg-white p-4 shadow-xl rounded-tr-[100px] rounded-bl-[100px]">
              <Image
                alt="Feature 2"
                src={"/pitch4u-photo04.webp"}
                width={200}
                height={160}
              />
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-bold">Tìm đối thủ</h3>
                <p className="break-words px-4 text-sm mt-2">
                  Một trận đấu hấp dẫn làm sao thiếu một đối thủ đáng gờm?
                </p>
              </div>
            </div>
            <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-emerald-300 flex flex-col items-center justify-end space-y-8 pb-6 mb-4 h-80 bg-white p-4 shadow-xl rounded-tr-[100px] rounded-bl-[100px]">
              <Image
                alt="Feature 3"
                src={"/pitch4u-photo05.webp"}
                width={200}
                height={160}
              />
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-bold">Tham gia cộng đồng</h3>
                <p className="break-words px-4 text-sm mt-2">
                  Cùng nhau tạo nên cộng đồng bóng đá tuyệt vời
                </p>
              </div>
            </div>
          </div>
          <Link href="/community">
            <Button
              variant="ghost"
              className="min-w-[100px] rounded-full bg-emerald-500 font-bold"
            >
              Tham gia ngay
            </Button>
          </Link>
        </section>

        <section
          id="register-master"
          className="flex w-full flex-col justify-between py-10 md:py-20 md:flex-row space-y-2 bg-gradient-to-r from-emerald-300/50 from-60% rounded-2xl"
        >
          <div className="flex w-full md:pl-10 h-full flex-col justify-center items-center md:items-start space-y-2 md:space-y-8">
            <h2 className="pb-2 text-3xl font-semibold">Đăng ký làm chủ sân</h2>
            <p className="md:pb-28">
              Tham gia với vai trò một chủ sân, bạn sẽ được cung cấp các công cụ
              để quản lý sân bóng một cách hiệu quả
            </p>
            <Link href="/pitch/register">
              <Button
                variant="ghost"
                className="min-w-[100px] rounded-full font-bold bg-zinc-50"
              >
                Đăng ký ngay
              </Button>
            </Link>
          </div>
          <div className="flex w-full overflow-hidden justify-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110">
            <Image
              alt="Image"
              src={"/pitch4u-photo06.webp"}
              width={300}
              height={300}
            />
          </div>
        </section>

        <section
          id={"contact"}
          className="flex w-full flex-col-reverse justify-between py-10 md:py-20 md:flex-row"
        >
          <div className=" flex w-full justify-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110">
            <Image
              alt="Image"
              src={"/pitch4u-photo07.webp"}
              width={400}
              height={400}
              loading={"lazy"}
            />
          </div>
          <div className="flex w-full md:pr-10 flex-col items-start space-y-2 md:space-y-8">
            <h2 className="pb-2 text-3xl font-semibold">Hỗ trợ tận tình</h2>
            <p>
              Đội ngữ hỗ trợ tận tình, sẵn sàng giải đáp mọi thắc mắc của bạn.
            </p>
            <p className="pb-10">Liên hệ để có nhiều thông tin hơn</p>
            <h2 className="pb-2 text-xl font-bold">
              Các chi nhánh của chúng tôi
            </h2>
            <div>
              <p className="">54, Nguyễn Lương Bằng,</p>
              <p className="">Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng</p>
              <p className="">(123) 456 7890</p>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </main>
  );
}
