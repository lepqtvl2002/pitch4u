import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-emerald-200">
      <div className="md:container text-justify">
        <Navbar />
        <div className="flex">
          <aside className="hidden w-[240px] mr-4 md:flex p-2 pl-6 pt-10 space-y-2 rounded bg-white">
            <ul className="list-disc space-y-2">
              <li>
                <Link href="#gather-information">Tập hợp thông tin</Link>
              </li>
              <li>
                <Link href="#how-to-use-information">
                  Cách thức sử dụng thông tin
                </Link>
              </li>
              <li>
                <Link href="#ensuring-the-security-of-collected-information">
                  Đảm bảo an toàn với các thông tin thu thập được
                </Link>
              </li>
              <li>
                <Link href="#cookies">Cookies</Link>
              </li>
              <li>
                <Link href="#link-to-other-website">
                  Liên kết các Website khác
                </Link>
              </li>
              <li>
                <Link href="#modify-and-delete-account-information">
                  Sửa đổi và xoá thông tin tài khoản
                </Link>
              </li>
              <li>
                <Link href="#terms-change">Điều khoản thay đổi</Link>
              </li>
            </ul>
          </aside>
          <div className="flex-1 bg-white rounded p-6">
            <h2 className="font-bold text-3xl mb-10">Chính sách bảo mật</h2>
            <p className="indent-8">
              Pitch4u.vn tôn trọng những thông tin cá nhân của bạn. Chúng tôi
              hiểu rằng bạn cần biết chúng tôi quản lý những thông tin cá nhân
              tập hợp được từ Pitch4u.vn như thế nào. Hãy đọc và tìm hiểu về
              những quy định bảo mật thông tin sau đây. Việc bạn truy cập, đăng
              ký, sử dụng Pitch4u.vn có nghĩa rằng bạn đồng ý và chấp nhận ràng
              buộc bởi các điều khoản của bản quy định bảo mật của chúng tôi.
            </p>
            <section id="gather-information" className=" pt-4 md:pt-10">
              <h3 className="text-xl font-semibold">Tập hợp thông tin</h3>
              <p className="indent-8">
                Thông tin cá nhân: Pitch4u.vn chỉ yêu cầu các thông tin cá nhân
                của bạn như: tên, email, số điện thoại và một số thông tin không
                bắt buộc khác khi bạn muốn tương tác với một số nội dung trên
                website. Các thông tin cá nhân này sử dụng để Pitch4u.vn và chủ
                địa điểm cho thuê sân bãi nhận diện và liên hệ với bạn khi cần.
              </p>
            </section>
            <section id="how-to-use-information" className=" pt-4 md:pt-10">
              <h3 className="text-xl font-semibold">
                Cách thức sử dụng thông tin
              </h3>
              <p className="indent-8">
                Thông thường, chúng tôi sử dụng các thông tin bạn cung cấp chỉ
                để liên hệ, hồi đáp những câu hỏi hay thực hiện các yêu cầu của
                bạn. Thông tin cá nhân của bạn sẽ không bị chia sẻ với bất kỳ
                bên thứ ba nào khi chưa có sự đồng ý của bạn. Nhưng chúng tôi có
                thể chia sẻ thông tin cho bên đối tác khi bạn đồng ý. Dữ liệu
                khách hàng của Pitch4u.vn có thể được chuyển nhượng cho người kế
                thừa hay người được chỉ định để quản lý công ty khi công ty bị
                sát nhập, bị mua lại hoặc phá sản.
              </p>
            </section>
            <section
              id="ensuring-the-security-of-collected-information"
              className=" pt-4 md:pt-10"
            >
              <h3 className="text-xl font-semibold">
                Bảo đảm an toàn đối với các thông tin thu thập được
              </h3>
              <p className="indent-8">
                Chúng tôi chỉ tập hợp lại các thông tin cá nhân trong phạm vi
                phù hợp và cần thiết cho mục đích phục vụ đúng đắn của chúng
                tôi. Và chúng tôi duy trì các biện pháp thích hợp nhằm bảo đảm
                tính an toàn, nguyên vẹn, độ chính xác, và tính bảo mật những
                thông tin mà bạn đã cung cấp. Ngoài ra, chúng tôi cũng có những
                biện pháp thích hợp để đảm bảo rằng bên thứ ba cũng sử dụng các
                biện pháp bảo đảm an toàn cho các thông tin mà chúng tôi cung
                cấp cho họ nếu có.
              </p>
            </section>
            <section id="cookies" className=" pt-4 md:pt-10">
              <h3 className="text-xl font-semibold">Cookies</h3>
              <p className="indent-8">
                Cookies là những file nhỏ được download để ghi chép các hoạt
                động trong một Website. Chúng tôi sử dụng cookies để ghi chép
                các hoạt động của nguời sử dụng hay mục đích của người sử dụng
                không muốn xem cùng nội dung quảng cáo được lặp đi lặp lại nhiều
                lần. Ngoài ra, chúng tôi cũng sử dụng cookies để đáp ứng các yêu
                cầu của người sử dụng và các mục đích khác.
              </p>
            </section>

            <section id="link-to-other-website" className=" pt-4 md:pt-10">
              <h3 className="text-xl font-semibold">
                Liên kết các Website khác
              </h3>
              <p className="indent-8">
                Nếu bạn nhấn đường liên kết sang Website thứ ba, bao gồm cả
                trang quảng cáo, bạn sẽ rời trang Pitch4u.vn và sẽ đến trang Web
                bạn đã chọn. Chúng tôi không thể kiểm soát các hoạt động của bên
                thứ ba và không chịu trách nhiệm về sự an toàn hay bất kể những
                nội dung gì có trong Website đó.
              </p>
            </section>
            <section
              id="modify-and-delete-account-information"
              className=" pt-4 md:pt-10"
            >
              <h3 className="text-xl font-semibold">
                Sửa đổi và xoá thông tin tài khoản
              </h3>
              <p className="indent-8">
                Bạn có thể sửa đổi, cập nhật thông tin tài khoản của bạn bất cứ
                lúc nào. Cho dù, bạn tự xoá các thông tin đó đi nhưng chúng tôi
                có thể phục hồi những thông tin đó từ cơ sở dữ liệu của chúng
                tôi để giải quyết các tranh chấp, thi hành bản thoả thuận người
                sử dụng, hay vì các yêu cầu kỹ thuật, pháp lý liên quan đến sự
                an toàn và những hoạt động của trang website chúng tôi.
              </p>
            </section>
            <section id="terms-change" className=" pt-4 md:pt-10">
              <h3 className="text-xl font-semibold">Điều khoản thay đổi</h3>
              <p className="indent-8">
                Chúng tôi có quyền thay đổi nội dung của các điều khoản này. Xin
                thường xuyên xác nhận để biết về các điều khoản thay đổi trong
                bản quy định bảo mật của chúng tôi. Thêm vào đó chúng tôi sẽ
                thông báo cho bạn bằng email khi có những thay đổi quan trọng về
                cách sử dụng liên quan các thông tin cá nhân của bạn. Trong
                trường hợp bạn từ chối các điều khoản thay đổi có trong
                Pitch4u.vn, xin liên hệ chúng tôi theo địa chỉ email
                sporta.hotro@gmail.vn. Khi bạn tiếp tục sử dụng trang web này,
                có nghĩa là bạn đồng ý và chấp nhận bị ràng buộc với các thay
                đổi trong bản quy định bảo mật trực tuyến này.
              </p>
            </section>

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
