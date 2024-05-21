import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";
import Link from "next/link";

const contents = [
  {
    id: "target",
    title: "Mục đích",
    content:
      "Cộng đồng bóng đá Đà Nẵng được thành lập với mục đích mang đến cho người chơi bóng đá ở Đà Nẵng một sân chơi lành mạnh và bổ ích. Chúng tôi mong muốn tạo ra một cộng đồng nơi mọi người có thể giao lưu, học hỏi, và phát triển cùng nhau.",
  },
  {
    id: "history",
    title: "Lịch sử",
    content:
      "Cộng đồng bóng đá Đà Nẵng được thành lập vào năm 2023 bởi một nhóm bạn trẻ yêu bóng đá. Chúng tôi đã tổ chức thành công nhiều giải đấu và sự kiện, thu hút hàng nghìn người chơi tham gia.",
  },
  {
    id: "member",
    title: "Thành viên",
    content:
      "Cộng đồng của chúng tôi bao gồm các chủ sân, người chơi, và các nhà tài trợ. Chúng tôi luôn chào đón những thành viên mới tham gia vào cộng đồng",
  },
  {
    id: "activity",
    title: "Hoạt động",
    content:
      "Cộng đồng của chúng tôi thường xuyên tổ chức các giải đấu, sự kiện, và các hoạt động cộng đồng. Chúng tôi cũng cung cấp các dịch vụ hỗ trợ cho người chơi, bao gồm các khóa đào tạo, các chương trình thi đấu, và các dịch vụ liên quan đến bóng đá. \nTham gia vào cộng đồng, bạn sẽ có cơ hội gặp gỡ giao lưu với những người có cùng sở thích, đam mê; có thể tìm ra những người bạn, những người đồng đội cùng tham gia những trận đấu lớn nhỏ; có thể giao lưu với những đội bóng mạnh và có thể tham gia những giải đấu đỉnh cao.",
  },
];

export default function CommunityPage() {
  return (
    <main>
      <Navbar />
      <div className="px-2 md:container">
        <div className="flex text-justify">
          <aside className="hidden w-[240px] mr-4 md:flex flex-col space-y-2 p-2 rounded bg-white">
            <ul className="list-disc space-y-2 pl-6 pt-10">
              {contents.map((content, index) => (
                <li key={index}>
                  <Link className="underline" href={`#${content}`}>
                    {content.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
          <div className="flex-1 bg-white rounded p-2 pt-6 md:p-6">
            <h2 className="font-bold text-3xl mb-10">
              Giới thiệu về cộng đồng
            </h2>
            {contents.map((content, index) => (
              <section key={index} id={content.id} className=" pt-4 md:pt-10">
                <h3 className="text-xl font-semibold">{content.title}</h3>
                <p className="indent-8">{content.content}</p>
              </section>
            ))}
            <p className="mt-10">
              Hãy tham gia cộng đồng của chúng tôi ngay hôm nay để tận hưởng
              những trải nghiệm bóng đá tuyệt vời!
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
