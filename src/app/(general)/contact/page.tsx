import { ContactForm } from "@/components/landing/contact-form";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function ContactPage() {
  return (
    <div className="px-2 md:container">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col bg-white px-4 md:px-8 pb-4 rounded">
          <h3 className="text-3xl font-bold mt-6 mb-10">Form liên hệ</h3>
          <span className="text-gray-500">
            Điền vào form thông tin bạn cần hỗ trợ, chúng tôi sẽ phản hồi sớm
            nhất có thể.
          </span>
          <Separator className="my-3" />
          <ContactForm />
        </div>
        <div className="lg:col-span-2 p-6 bg-white rounded">
          <h3 className="text-3xl mb-10 font-bold">
            Thông tin liên hệ của chúng tôi:
          </h3>
          <div className="text-lg">
            <Label className="font-semibold">Địa chỉ: </Label>
            <span>
              54 Nguyễn Lương Bằng, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng
            </span>
          </div>
          <div className="text-lg">
            <Label className="font-semibold">Số điện thoại: </Label>
            <span>012 345 6789</span>
          </div>
          <div className="text-lg">
            <Label className="font-semibold">Email: </Label>
            <span>pitch4u@gmail.com</span>
          </div>
          <div className="text-lg">
            <Label className="font-semibold">Facebook: </Label>
            <span>www.facebook.com/pitch4u</span>
          </div>

          <p className="mt-20 italic text-xl">
            Hãy liên hệ ngay với chúng tôi để biết thêm thông tin.
          </p>
        </div>
      </div>
    </div>
  );
}
