import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";
import Link from "next/link";

export default function CommunityPage() {
  return (
    <main className="bg-emerald-200">
      <div className="container">
        <Navbar />
        <div className="flex">
          <aside className="hidden w-[240px] mr-4 md:flex flex-col space-y-2 p-4 rounded bg-white">
            <Link className="underline" href="#target">
              Mục đích
            </Link>
            <Link className="underline" href="#history">
              Lịch sử
            </Link>
            <Link className="underline" href="#member">
              Thành viên
            </Link>
            <Link className="underline" href="#activity">
              Hoạt động
            </Link>
          </aside>
          <div className="flex-1 space-y-8 bg-white rounded p-6">
            <h2 className="font-bold text-3xl mb-10">
              Giới thiệu về cộng đồng
            </h2>
            <section id="target">
              <h3 className="text-xl font-semibold">Mục đích</h3>
              <p>
                Cộng đồng bóng đá Đà Nẵng được thành lập với mục đích mang đến
                cho người chơi bóng đá ở Đà Nẵng một sân chơi lành mạnh và bổ
                ích. Chúng tôi mong muốn tạo ra một cộng đồng nơi mọi người có
                thể giao lưu, học hỏi, và phát triển cùng nhau.
              </p>
            </section>
            <section id="history">
              <h3 className="text-xl font-semibold">Lịch sử</h3>
              <p>
                Cộng đồng bóng đá Đà Nẵng được thành lập vào năm 2023 bởi một
                nhóm bạn trẻ yêu bóng đá. Chúng tôi đã tổ chức thành công nhiều
                giải đấu và sự kiện, thu hút hàng nghìn người chơi tham gia.
              </p>
            </section>
            <section id="member">
              <h3 className="text-xl font-semibold">Thành viên</h3>
              <p>
                Cộng đồng của chúng tôi bao gồm các chủ sân, người chơi, và các
                nhà tài trợ. Chúng tôi luôn chào đón những thành viên mới tham
                gia vào cộng đồng.
              </p>
            </section>
            <section id="activity">
              <h3 className="text-xl font-semibold">Hoạt động</h3>
              <p>
                Cộng đồng của chúng tôi thường xuyên tổ chức các giải đấu, sự
                kiện, và các hoạt động cộng đồng. Chúng tôi cũng cung cấp các
                dịch vụ hỗ trợ cho người chơi, bao gồm các khóa đào tạo, các
                chương trình thi đấu, và các dịch vụ liên quan đến bóng đá.
              </p>
              <p>
                Tham gia vào cộng đồng, bạn sẽ có cơ hội gặp gỡ giao lưu với
                những người có cùng sở thích, đam mê; có thể tìm ra những người
                bạn, những người đồng đội cùng tham gia những trận đấu lớn nhỏ;
                có thể giao lưu với những đội bóng mạnh và có thể tham gia những
                giải đấu đỉnh cao.
              </p>
            </section>

            <p>
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
