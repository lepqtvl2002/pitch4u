import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";

export default function TermsOfUsePage() {
  return (
    <div className="flex-1 bg-white rounded p-4 md:p-6">
      <h2 className="font-bold text-3xl mb-10">Điều khoản sử dụng</h2>
      <p className="indent-8">
        Với việc sử dụng các thông tin, dịch vụ, sản phẩm trên website
        Pitch4u.vn, đồng nghĩa với việc bạn đã chấp nhận hoàn toàn các quy định
        sử dụng website dưới đây. Mời bạn vui lòng đọc kỹ các quy định sử dụng
        website dưới đây trước khi quyết định sử dụng thông tin, dịch vụ, sản
        phẩm của chúng tôi.
      </p>
      <section id="register-and-login" className=" pt-4 md:pt-10">
        <h3 className="text-xl font-semibold">
          Đăng ký sử dụng và đăng nhập tài khoản
        </h3>
        <p className="indent-8">
          Khi đăng ký sử dụng tài khoản trên Pitch4u, bạn cần cung cấp cho
          website các thông tin cá nhân chính xác, đầy đủ và mới nhất. Khi chọn
          mật khẩu cho tài khoản truy nhập, hãy chọn mật khẩu theo cách mà không
          ai có thể dễ dàng đoán được. Sau khi đăng ký, bạn chịu trách nhiệm bảo
          quản mật khẩu và không nên tiết lộ mật khẩu cho bất cứ ai hoặc ủy
          quyền, cho phép bất cứ người nào sử dụng vào bất cứ mục đích nào.
          Pitch4u sẽ luôn coi việc truy nhập và sử dụng các dịch vụ trên trang
          web bằng tên truy nhập và mật khẩu của một người nào đó như là việc
          truy nhập và sử dụng các dịch vụ bởi chính khách hàng đó, bất kể tên
          truy nhập và mật khẩu có thể được sử dụng bởi người khác mà chủ sở hữu
          không biết hoặc không cho phép. Nếu phát hiện ra bất cứ người nào biết
          mật khẩu hoặc sử dụng mật khẩu của mình để truy nhập và sử dụng các
          dịch vụ trên trang web, bạn cần thông báo ngay lập tức cho chúng tôi
          và thay đổi mật khẩu hoặc yêu cầu website hỗ trợ cài đặt mật khẩu mới.
        </p>
      </section>
      <section id="collect-and-use-information" className=" pt-4 md:pt-10">
        <h3 className="text-xl font-semibold">
          Quyền thu thập và sử dụng thông tin
        </h3>
        <p className="indent-8">
          Khi bạn truy cập và sử dụng trang web, Pitch4u có thể thu thập và lưu
          trữ các thông tin như các số liệu thống kê quá trình truy cập, các
          thông tin cá nhân cung cấp cho Pitch4u khi đăng ký… Các thông tin cá
          nhân khách hàng cung cấp bao gồm họ tên, số điện thoại, địa chỉ email,
          địa chỉ chỗ ở… Chúng tôi có thể sử dụng các thông tin này vào việc lập
          kế hoạch, nghiên cứu, thiết kế và tuyên truyền các dịch vụ hoặc cung
          cấp thông tin cho các cơ quan pháp luật theo yêu cầu của Luật pháp
          hoặc của Toà án.
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
          Chúng tôi chỉ tập hợp lại các thông tin cá nhân trong phạm vi phù hợp
          và cần thiết cho mục đích phục vụ đúng đắn của chúng tôi. Và chúng tôi
          duy trì các biện pháp thích hợp nhằm bảo đảm tính an toàn, nguyên vẹn,
          độ chính xác, và tính bảo mật những thông tin mà bạn đã cung cấp.
          Ngoài ra, chúng tôi cũng có những biện pháp thích hợp để đảm bảo rằng
          bên thứ ba cũng sử dụng các biện pháp bảo đảm an toàn cho các thông
          tin mà chúng tôi cung cấp cho họ nếu có.
        </p>
      </section>
      <section id="content-on-website" className=" pt-4 md:pt-10">
        <h3 className="text-xl font-semibold">
          Quy định về nội dung thông tin trên website
        </h3>
        <p className="indent-8">
          Người sử dụng chịu trách nhiệm về bất cứ nội dung thông tin gửi lên
          hoặc truyền đi qua trang web của Pitch4u và không được phép hoặc cho
          phép người khác tạo ra bất cứ sự khó chịu, phiền toái, quấy rầy nào
          đối với Pitch4u cũng như đối với bất kỳ khách hàng hoặc người sử dụng
          khác. Bạn cam kết sử dụng trang web trong chừng mực phù hợp với tất cả
          các luật và quy định hiện hành và đồng ý không sử dụng trang web để
          gửi lên, truyền đi, phân tán, liên kết các nội dung mà:
        </p>
        <ul className="list-disc pl-6">
          <li>Chứa các thông tin quảng cáo</li>
          <li>Vi phạm các luật, các quy định của Chính phủ Việt Nam.</li>
          <li>
            Vi phạm các quy định về bản quyền, nhãn hiệu, sở hữu trí tuệ, quyền
            sở hữu cá nhân.
          </li>
          <li>Chứa các thông tin có tính khiêu dâm, kích động, phỉ báng.</li>
          <li>
            Phá hoại tính an toàn, tính đồng nhất, các giao diện của trang web.
          </li>
        </ul>
        <p className="indent-8">
          Bất cứ vi phạm nào đối với các quy định trên, Pitch4u sẽ huỷ bỏ quyền
          sử dụng website của người vi phạm. Đồng thời tuỳ theo mức độ vi phạm
          mà người sử dụng sẽ phải chịu trách nhiệm trước pháp luật.
        </p>
        <p className="indent-8">
          Pitch4u.vn là website/app chia sẻ cộng đồng, Pitch4u giữ quyền thông
          tin trên website, tất cả các thông tin bao gồm: thông tin địa điểm,
          các bình luận, các hình ảnh... và thông tin khác liên quan đến địa
          điểm và thành viên đều thuộc quyền sở hữu của Pitch4u, và tất cả các
          thông tin này sẽ không `&quot;`Bị xóa/Được xóa `&quot;` vì bất cứ lý
          do nào! Các trường hợp có thể được xóa bỏ khỏi hệ thống bao gồm các
          nội dung không liên quan hay nội dung rác do ban quản trị quy định!
        </p>
      </section>

      <section id="reject" className=" pt-4 md:pt-10">
        <h3 className="text-xl font-semibold">Tuyên bố từ chối</h3>
        <p className="indent-8">
          Pitch4u có các biện pháp bảo mật cho trang web và các dịch vụ cung
          cấp. Tuy nhiên, Pitch4u không thể đảm bảo tuyệt đối trang web khỏi các
          hành động phá hoại hoặc các loại virus từ Internet.
        </p>
        <p className="indent-8">
          Pitch4u không có bất cứ bảo đảm nào hoặc tuyên bố nào về tính chính
          xác hay hoàn thiện của bất kỳ thông tin nào trên website này. Định kỳ
          Pitch4u sẽ bổ sung, thay đổi, cải tiến hoặc cập nhật các tính năng và
          thông tin trên website này mà không cần báo trước. Trong bất kỳ trường
          hợp nào, Pitch4u sẽ không chịu trách nhiệm về bất cứ mất mát, thiệt
          hại, trách nhiệm mang lại do việc sử dụng thông tin từ website này,
          cũng như bất kỳ lỗi, thiếu sót, gián đoạn hoặc chậm trễ về các thông
          tin.
        </p>
        <p className="indent-8">
          Việc sử dụng thông tin tại web site này là hoàn toàn tùy thuộc vào rủi
          ro riêng của người sử dụng. Trong bất kỳ trường hợp nào, Pitch4u hoặc
          các đại diện của mình sẽ không chịu trách nhiệm đối với bất kỳ thiệt
          hại trực tiếp, gián tiếp, ngẫu nhiên, đặc biệt hoặc tất yếu nào.
        </p>
        <p className="indent-8">
          Trang web của Pitch4u bao gồm các đường liên kết đến các trang web
          khác không thuộc quyền sở hữu hoặc kiểm soát của Pitch4u hoặc chứa các
          thông tin do các bên thứ ba cung cấp. Do vậy, Pitch4u không chịu trách
          nhiệm về các lỗi hoặc thiếu sót trong thông tin trích dẫn và các nội
          dung, quyền riêng tư, tính bảo mật của các trang web liên kết đến cũng
          như các thiệt hại nếu có khi bạn truy nhập, sử dụng các trang web đó.
        </p>
      </section>
      <section id="changes" className=" pt-4 md:pt-10">
        <h3 className="text-xl font-semibold">
          Các thay đổi trên website Pitch4u
        </h3>
        <p className="indent-8">
          Chúng tôi có toàn quyền bổ sung, sửa đổi hay xóa bỏ bất kỳ thông tin
          nào cũng như thay đổi giao diện, sự trình bày, thành phần hoặc chức
          năng, nội dung của trang web này bao gồm bất kỳ khoản mục nào vào bất
          kì lúc nào mà không cần báo trước.
        </p>
      </section>
      <section id="rule-change" className=" pt-4 md:pt-10">
        <h3 className="text-xl font-semibold">Thay đổi quy định</h3>
        <p className="indent-8">
          Chúng tôi có toàn quyền thay đổi quy định mà không cần báo trước. Với
          việc tiếp tục sử dụng Pitch4u sau những sửa đổi đó, bạn mặc nhiên đồng
          ý chấp hành các sửa đổi trong quy định.
        </p>
      </section>

      <section
        id="regulations-on-unacceptable-actions"
        className=" pt-4 md:pt-10"
      >
        <h3 className="text-xl font-semibold">
          Quy định về các hành động không được phép
        </h3>
        <ul className="list-disc pl-6">
          <li>
            Bạn không được quyền xâm phạm, xâm nhập, tiếp cận, sử dụng hay tìm
            cách xâm phạm, xâm nhập, tiếp cận hoặc sử dụng bất kỳ phần nào trong
            máy chủ của chúng tôi, và/ hoặc bất kỳ khu vực dữ liệu nào nếu không
            được chúng tôi cho phép.
          </li>
          <li>
            Bạn không được quyền hoặc có các hành động nhằm hạn chế hoặc cấm
            đoán bất kỳ người dùng nào khác sử dụng các tiện ích trên trang
            Pitch4u.
          </li>
          <li>
            Bạn không được quyền gửi lên hoặc truyền phát bất kỳ thông tin bất
            hợp pháp, lừa gạt, bôi nhọ, sỉ nhục, tục tĩu, khiêu dâm, xúc phạm,
            đe dọa, lăng mạ, thù hận, kích động… hoặc trái với chuẩn mực đạo đức
            chung của xã hội dưới bất kì hình thức nào, bao gồm cả việc truyền
            bá hay khuyến khích những hành vi có thể cấu thành tội phạm hay vi
            phạm bất cứ điều khoản nào của luật pháp địa phương, quốc gia hay
            quốc tế. Chúng tôi tôn trọng quyền tự do ngôn luận, nhưng cũng bảo
            lưu việc có toàn quyền lược bớt, hoặc xoá bỏ một phần hoặc toàn bộ
            nội dung nào các bạn đưa lên, bất kể việc vi phạm đó là rõ ràng hay
            chỉ là hàm ý.
          </li>
          <li>
            Bạn không được phép gửi hoặc truyền bất kỳ thông điệp nào mang tính
            quảng cáo, mời gọi, thư dây chuyền, cơ hội đầu tư hay bất kỳ dạng
            liên lạc có mục đích thương mại nào mà người dùng không mong muốn,
            thư rác hay tin nhắn rác.
          </li>
          <li>
            Bạn không được gửi hoặc truyền bất kỳ thông tin nào không thuộc
            quyền sở hữu của bạn trừ khi đó là thông tin được cung cấp miễn phí,
            không gửi bất kỳ thông tin nào có chứa bất kỳ loại virus, Trojan, bọ
            hay các thành phần nguy hại nào.
          </li>
          <li>
            Bạn sẽ không gửi, xuất bản, truyền, tái sản xuất, phân phát hoặc
            khai thác bằng bất cứ hình thức nào với bất cứ thông tin nào có được
            từ Pitch4u vào mục đích thương mại; hoặc tải lên, gửi, xuất bản,
            truyền, tái sản xuất hoặc phân phối dưới bất cứ hình thức nào những
            nội dung được bảo vệ bởi luật bản quyền và luật sở hữu trí tuệ của
            Pitch4u hoặc tạo ra các biến thể của các nội dung đó mà không có sự
            đồng ý bằng văn bản của chủ nhân hoặc người giữ bản quyền.
          </li>
        </ul>
      </section>
      <section id="regulations-on-images" className=" pt-4 md:pt-10">
        <h3 className="text-xl font-semibold">
          Quy định về hình ảnh trên nền tảng
        </h3>
        <ul className="list-disc pl-6">
          <li>
            Không sử dụng hình ảnh có hàm ý kích động bạo lực, dâm ô, đồi trụy,
            tội ác, tệ nạn xã hội, mê tín dị đoan, phá hoại thuần phong, mỹ tục
            của dân tộc.
          </li>
          <li>
            Không sử dụng hình ảnh hoặc hình ảnh mô tả có tính xúc phạm các danh
            nhân, anh hùng dân tộc, lãnh đạo của các cơ quan tổ chức quốc tế.
          </li>
          <li>
            Không sử dụng hình ảnh có chứa dấu hiệu trùng hoặc tương tự đến mức
            gây nhầm lẫn với biểu tượng, cờ, huy hiệu, tên viết tắt, tên đầy đủ
            của cơ quan nhà nước, tổ chức chính trị, tổ chức chính trị - xã hội,
            tổ chức chính trị xã hội - nghề nghiệp, tổ chức xã hội, tổ chức xã
            hội - nghề nghiệp của Việt Nam và tổ chức quốc tế mà xúc phạm đến uy
            tín của các tổ chức này.
          </li>
          <li>
            Không sử dụng các hình ảnh liên quan tới tôn giáo mà gây kích động,
            chia rẽ khối đại đoàn kết dân tộc.
          </li>
          <li>
            Không sử dụng ảnh của tội phạm, khủng bố, phát xít, và ảnh hoặc hình
            ảnh mô tả các cá nhân, tổ chức chống lại Nhà nước, Chính phủ, Đảng
            phái, Tôn Giáo mà gây phương hại đến an ninh quốc gia, trật tự an
            toàn xã hội.
          </li>
          <li>
            Không sử dụng ảnh xúc phạm uy tín của tổ chức, danh dự và nhân phẩm
            của cá nhân khác.
          </li>
          <li>
            Không sử dụng hình ảnh có chứa các từ/cụm từ, logo, dấu hiệu trùng
            hoặc tương tự gây nhầm lẫn với các nền tảng trong hệ sinh thái
            PITCH4U thuộc quyền quản lý của PITCH4U khi chưa có sự đồng ý bằng
            văn bản của PITCH4U.
          </li>
          <li>Không sử dụng hình ảnh vi phạm các quyền sở hữu trí tuệ.</li>
          <li>
            Tài khoản vi phạm quy định về hình đại diện sẽ bị khoá và/hoặc xóa
            vĩnh viễn mà không cần thông báo.
          </li>
        </ul>
      </section>

      <section id="information-is-prohibited" className=" pt-4 md:pt-10">
        <h3 className="text-xl font-semibold">
          Các thông tin cấm chia sẻ, trao đổi trên nền tảng Pitch4u
        </h3>
        <ul className="list-disc pl-6">
          <li>
            Tuyên truyền chiến tranh, khủng bố, xúi giục, lôi kéo, kích động
            người khác phạm tội.
          </li>
          <li>
            Thông tin giả mạo, kích động bạo lực, dâm ô, đồi trụy, tội ác, tệ
            nạn xã hội, mê tín dị đoan, phá hoại thuần phong, mỹ tục của dân
            tộc.
          </li>
          <li>
            Quảng cáo, tuyên truyền, mua bán động vật, hàng hóa, dịch vụ bị cấm;
            truyền bá tác phẩm báo chí, văn học, nghệ thuật, xuất bản phẩm bị
            cấm.
          </li>
          <li>Thông tin vi phạm quyền sở hữu trí tuệ.</li>
          <li>
            Các Thông tin khác vi phạm tới quyền và lợi ích hợp pháp của cá
            nhân, tổ chức.
          </li>
        </ul>
      </section>

      <section id="other-prohibited-acts" className=" pt-4 md:pt-10">
        <h3 className="text-xl font-semibold">Các hành vi bị cấm khác</h3>
        <ul className="list-disc pl-6">
          <li>
            Cản trở trái phép việc cung cấp và truy cập thông tin hợp pháp, việc
            cung cấp và sử dụng các dịch vụ hợp pháp trên Internet của tổ chức,
            cá nhân.
          </li>
          <li>
            Sử dụng trái phép mật khẩu, khoá mật mã của các tổ chức, cá nhân;
            thông tin riêng, thông tin cá nhân và tài nguyên Internet.
          </li>
          <li>
            Tạo đường dẫn trái phép đối với tên miền hợp pháp của tổ chức, cá
            nhân. Tạo, cài đặt, phát tán các phần mềm độc hại, vi rút máy tính;
            xâm nhập trái phép, chiếm quyền điều khiển hệ thống thông tin, tạo
            lập công cụ tấn công trên Internet.
          </li>
          <li>
            Sử dụng bất kỳ chương trình, công cụ hay hình thức nào khác để can
            thiệp vào dịch vụ của Pitch4u.
          </li>
          <li>
            Phát tán, truyền bá hay cổ vũ cho bất kỳ hoạt động nào nhằm can
            thiệp, phá hoại hay xâm nhập vào dữ liệu của dịch vụ cung cấp hoặc
            hệ thống máy chủ.
          </li>
          <li>
            Đăng nhập trái phép hoặc tìm cách đăng nhập trái phép hoặc gây thiệt
            hại cho hệ thống máy chủ.
          </li>
          <li>
            Quấy rối, chửi bới, làm phiền hay có bất kỳ hành vi thiếu văn hoá
            nào đối với người sử dụng khác.
          </li>
          <li>
            Hành vi, thái độ làm tổn hại đến uy tín của Pitch4u và/hoặc các dịch
            vụ của Pitch4u dưới bất kỳ hình thức hoặc phương thức nào.
          </li>
          <li>
            Quảng bá bất kỳ sản phẩm/dịch vụ dưới bất kỳ hình thức nào mà không
            tuân thủ theo thỏa thuận cung cấp và sử dụng dịch vụ và chính sách
            quảng cáo của Pitch4u.
          </li>
          <li>Đánh bạc và tổ chức đánh bạc trên nền tảng Pitch4u.</li>
          <li>
            Các hành vi cấm khác theo quy định của pháp luật trong từng lĩnh
            vực.
          </li>
        </ul>
      </section>

      <section id="access-level" className=" pt-4 md:pt-10">
        <h3 className="text-xl font-semibold">Cấp truy cập</h3>
        <p className="indent-8">
          Chúng tôi có toàn quyền, vào mọi lúc, cấm hoặc từ chối truy cập của
          bạn vào Pitch4u hoặc bất kỳ phần nào của website ngay lập tức và không
          cần báo trước nếu chúng tôi cho rằng bạn đã vi phạm bất cứ điều khoản
          nào trong bản Quy định này, hoặc việc cấm truy cập xuất phát từ nhận
          định của chúng tôi, khi chúng tôi cho rằng từ chối đó phù hợp và cần
          thiết trong thẩm quyền của chúng tôi.
        </p>
      </section>
      <section id="third-party-information" className=" pt-4 md:pt-10">
        <h3 className="text-xl font-semibold">Thông tin của bên thứ ba</h3>
        <p className="indent-8">
          Thông tin được cung cấp tại Pitch4u có thể chứa thông tin từ bên thứ
          ba hoặc được chọn lọc từ các nguồn khác. Chúng tôi không chấp nhận bất
          cứ trách nhiệm nào về các thông tin mà chúng tôi đăng tải, bạn sẽ sử
          dụng hoặc đặt niềm tin vào những thông tin đó với hiểu biết, trách
          nhiệm và nguy cơ của riêng bạn.
        </p>
      </section>
      <section id="indemnify" className=" pt-4 md:pt-10">
        <h3 className="text-xl font-semibold">Bồi thường</h3>
        <p className="indent-8">
          Bạn đồng ý bồi hoàn những nghĩa vụ pháp lý, tố tụng, tổn thất, chi phí
          (bao gồm cả án phí không giới hạn) có liên quan tới hoặc phát sinh từ
          sự vi phạm của bạn đối với bất kỳ điều khoản nào trong Quy định sử
          dụng của Pitch4u. Chúng tôi có thể, trong trường hợp xét thấy cần
          thiết, hoặc theo quy định của pháp luật tham gia tố tụng trước các
          khiếu kiện hoặc đàm phán để dàn xếp.
        </p>
      </section>
      <section id="regulations-on-images" className=" pt-4 md:pt-10">
        <h3 className="text-xl font-semibold">
          Quyền sở hữu trí tuệ và các quyền khác
        </h3>
        <ul className="list-disc pl-6">
          <li>
            Tất cả quyền sở hữu trí tuệ tồn tại trong website Pitch4u đều thuộc
            về Pitch4u. Trừ khi có sự đồng ý của Pitch4u, bạn không được phép
            tải lên, gửi, xuất bản, tái sản xuất, truyền hoặc phân phát bằng bất
            cứ hình thức nào thành phần nào của website Pitch4u hoặc tạo ra
            những bản sửa đổi của nội dung cung cấp trong website Pitch4u.
          </li>
          <li>
            Tại các khu vực được phép đăng tải bài viết, bạn có thể chia sẻ
            thông tin được phép dưới các định dạng chúng tôi mặc định và bạn
            phải tự chịu trách nhiệm đối với các nội dung, thông tin, hình ảnh
            và bất kỳ sự chia sẻ nào khác của bạn với cá nhân người sử dụng hoặc
            nhóm người sử dụng.
          </li>
          <li>
            Chúng tôi bảo lưu quyền xử lý các thông tin đăng tải cho phù hợp với
            thuần phong mỹ tục, các quy tắc đạo đức và các quy tắc đảm bảo an
            ninh quốc gia, và có toàn quyền cho phép hoặc không cho phép bài
            viết của bạn xuất hiện hay tồn tại trên diễn đàn hoặc tại các khu
            vực được phép chia sẻ thông tin.
          </li>
          <li>
            Chúng tôi có toàn quyền, bao gồm quyền tác giả, thương hiệu, bí mật
            kinh doanh và các quyền sở hữu khác, nội dung của website, và hàng
            hóa hoặc dịch vụ được cung cấp mà chúng tôi có trong website
            Pitch4u. Sử dụng quyền và sở hữu của chúng tôi cần phải được chúng
            tôi cho phép trước bằng văn bản.
          </li>
          <li>
            Bạn đồng ý để chúng tôi tự do sử dụng, tiết lộ, áp dụng và sửa đổi
            bất kỳ ý tưởng, khái niệm, cách thức, đề xuất, gợi ý, bình luận hoặc
            hình thức thông báo nào khác mà bạn cung cấp cho chúng tôi có liên
            quan tới Pitch4u một cách hoàn toàn miễn phí.
          </li>
        </ul>
      </section>
      <section id="provide-information" className=" pt-4 md:pt-10">
        <h3 className="text-xl font-semibold">
          Cung cấp nội dung trên Pitch4u
        </h3>
        <p className="indent-8">
          Bạn đồng ý trao cho chúng tôi toàn bộ quyền và cấp phép (bao gồm cả
          các quyền về tinh thần hay các quyền cần thiết khác) để sử dụng, trưng
          bày, tái sản xuất, chỉnh sửa, xuất bản, cung cấp, xúc tiến, dịch và
          tạo ra các phiên bản tổ hợp khác, một phần hoặc toàn bộ, trên phạm vi
          toàn cầu mà không đòi hỏi thù lao. Sự cấp phép này được áp dụng với
          bất cứ dạng thức, phương tiện, công nghệ nào đã được biết đến hoặc
          phát triển sau này; bạn cần lưu ý rằng, các bài viết (post) trên diễn
          đàn, hoặc tại các khu vực được phép có thể tiếp tục nằm trên website
          của chúng tôi ngay cả khi tài khoản của bạn đã bị xóa vì bất kỳ lý do
          gì.
        </p>
      </section>
      <section
        id="limitation-of-liability-and-warranties"
        className=" pt-4 md:pt-10"
      >
        <h3 className="text-xl font-semibold">
          Giới hạn trách nhiệm pháp lý và bảo đảm
        </h3>
        <ul className="list-disc pl-6">
          <li>
            Tất cả thông tin chỉ dành cho việc tham khảo tổng quát của bạn.
            Pitch4u không nhận bất cứ trách nhiệm nào về những thông tin đó.
          </li>
          <li>
            Việc truy cập và sử dụng website Pitch4u do bạn hoàn toàn tự chịu
            trách nhiệm và được cung cấp như hiện có. Pitch4u chỉ dành cho mục
            đích sử dụng cá nhân và chúng tôi không đại diện cho hoặc bảo đảm về
            bất cứ điều gì, được phát ngôn cụ thể hay hàm ý cho bất cứ mục đích
            cụ thể nào.
          </li>
          <li>
            Bạn hành xử và tin tưởng hoàn toàn vào kỹ năng và khả năng đánh giá
            của chính bạn đối với việc sử dụng và cách hiểu đối với thông tin
            bạn có được tại Pitch4u. Bạn chịu trách nhiệm đảm bảo rằng việc sử
            dụng thông tin của bạn tuân thủ tất cả các yêu cầu của pháp luật
            hiện hành.
          </li>
          <li>
            Giới hạn nghĩa vụ pháp lý trong Quy định sẽ được áp dụng với quy mô
            đầy đủ nhất được pháp luật hiện hành cho phép.
          </li>
        </ul>
      </section>
      <section id="applicable-law" className=" pt-4 md:pt-10">
        <h3 className="text-xl font-semibold">Luật áp dụng</h3>
        <p className="indent-8">
          Bạn đồng ý rằng bản Quy định sử dụng và bất kỳ bất đồng nào phát sinh
          từ việc bạn sử dụng website này hoặc các sản phẩm và dịch vụ của chúng
          tôi sẽ được giải quyết theo luật pháp hiện hành của Nước Cộng hoà Xã
          hội Chủ nghĩa Việt Nam. Thông qua việc đăng ký hoặc sử dụng website và
          dịch vụ của chúng tôi, bạn mặc nhiên đồng ý và tuân thủ toàn bộ các
          quy định của Luật pháp Việt Nam
        </p>
      </section>

      <p className="mt-10">
        Hãy tham gia cộng đồng của chúng tôi ngay hôm nay để tận hưởng những
        trải nghiệm bóng đá tuyệt vời!
      </p>
    </div>
  );
}
