import {Button} from "@/components/ui/button";
import Image from "next/image";
import SearchBar from "@/components/landing/search-bar";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";

export default function Home() {
    return (
        <main className="container flex min-h-screen flex-col items-center justify-between bg-blue-200">
            <Navbar/>
            <section id="general" className="flex flex-col lg:flex-row w-full justify-between  pb-20">
                <div className="flex w-full flex-col space-y-6 lg:p-10 pb-10 z-10">
                    <div className="text-center text-4xl font-bold md:text-6xl lg:text-7xl xl:text-8xl lg:text-start">
                        <h1>SÂN ĐẸP</h1>
                        <h1>ĐỒNG ĐỘI</h1>
                        <h1>ĐỐI THỦ</h1>
                    </div>
                    <span className="text-center text-2xl">Tìm ở đây!!!</span>
                    <div className="flex space-x-10">
                        <a href="#general" className={"w-1/2"}>
                            <Button className={"w-full rounded-full"}>Tải app ngay</Button>
                        </a>
                        <a href="#find-pitch" className={"w-1/2"}>
                            <Button className={"w-full rounded-full"}>Tìm sân</Button>
                        </a>
                    </div>
                </div>
                <div className="w-full p-10 lg:p-0 flex justify-center absolute top-24 left-0 lg:relative lg:top-0">
                    <Image
                        alt="Team"
                        src={"/pitch4u-photo01.webp"}
                        width={500}
                        height={500}
                        className="flex-1 opacity-50 lg:opacity-100 md:p-20 lg:p-0"
                    />
                </div>
            </section>

            <section
                id="find-pitch"
                className=" w-full p-2 md:pl-10 lg:pl-20 flex-col justify-between  py-10 md:py-20 z-10 bg-cyan-200 bg-opacity-50 rounded"
            >
                <h2 className={"pb-6 md:pb-10 text-3xl font-bold"}>Nhanh và dễ dàng</h2>
                <h4 className="text-bold pb-4 md:pb-8 text-sm md:text-xl">
                    Chúng tôi tìm sân đẹp, chất lượng theo yêu cầu và đặt sân nhanh chóng
                    chỉ trong vài bước
                </h4>
                <SearchBar/>
            </section>

            <section className=" flex w-full flex-col items-center justify-between py-10 md:py-20">
                <h2 className={"pb-10 text-center text-3xl font-bold"}>Our Features</h2>
                <div className="flex w-full flex-col justify-around md:flex-row">
                    <div
                        className="card mb-4 rounded-lg bg-white p-4 shadow"
                        style={{
                            borderTopRightRadius: "100%",
                            borderBottomLeftRadius: "100%",
                            borderTopLeftRadius: "0",
                            borderBottomRightRadius: "0",
                        }}
                    >
                        <Image
                            alt="Feature 1"
                            src={"/pitch4u-photo03.webp"}
                            width={200}
                            height={200}
                        />
                        <h3 className="text-xl font-bold">Feature 1</h3>
                        <p>Some content about feature 1</p>
                    </div>
                    <div
                        className="card mb-4 rounded-lg bg-white p-4 shadow"
                        style={{
                            borderTopRightRadius: "100%",
                            borderBottomLeftRadius: "100%",
                            borderTopLeftRadius: "0",
                            borderBottomRightRadius: "0",
                        }}
                    >
                        <Image
                            alt="Feature 2"
                            src={"/pitch4u-photo04.webp"}
                            width={200}
                            height={200}
                        />
                        <h3 className="text-xl font-bold">Feature 2</h3>
                        <p>Some content about feature 2</p>
                    </div>
                    <div
                        className="card mb-4 rounded-lg bg-white p-4 shadow"
                        style={{
                            borderTopRightRadius: "100%",
                            borderBottomLeftRadius: "100%",
                            borderTopLeftRadius: "0",
                            borderBottomRightRadius: "0",
                        }}
                    >
                        <Image
                            alt="Feature 3"
                            src={"/pitch4u-photo05.webp"}
                            width={200}
                            height={200}
                        />
                        <h3 className="text-xl font-bold">Feature 3</h3>
                        <p>Some content about feature 3</p>
                    </div>
                </div>
                <Button className={"min-w-[100px] rounded-full"}>Click Here</Button>
            </section>

            <section className=" flex w-full flex-col justify-between py-10 md:py-20 md:flex-row">
                <div className="flex w-full flex-col items-start space-y-2 md:space-y-8">
                    <h2 className="pb-2 text-3xl font-bold">Heading</h2>
                    <h4 className="text-bold text-xl">Title</h4>
                    <p className="">Description</p>
                    <Button className={"min-w-[100px] rounded-full"}>Click Here</Button>
                </div>
                <div className="flex w-full justify-center">
                    <Image
                        alt="Image"
                        src={"/pitch4u-photo06.webp"}
                        width={400}
                        height={400}
                    />
                </div>
            </section>

            <section className=" flex w-full flex-col-reverse justify-between py-10 md:py-20 md:flex-row">
                <div className=" flex w-full justify-center">
                    <Image
                        alt="Image"
                        src={"/pitch4u-photo07.webp"}
                        width={400}
                        height={400}
                    />
                </div>
                <div className="flex w-full flex-col items-start space-y-2 md:space-y-8">
                    <h2 className="pb-2 text-3xl font-bold">Heading</h2>
                    <h4 className="text-bold text-xl">Title</h4>
                    <p className="">Description</p>
                    <Button className={"min-w-[100px] rounded-full"}>Click Here</Button>
                </div>
            </section>
            <Footer/>
        </main>
    );
}
