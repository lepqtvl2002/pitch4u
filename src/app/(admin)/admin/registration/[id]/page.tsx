import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { formatDateTimeToddMMyyyyHHmm, formatDateToddMMyyyy } from "@/lib/format-datetime";
import { RegistrationUseQuery } from "@/server/queries/registration-query";
import { useParams } from "next/navigation";

function RegistrationDetail({
  params,
  searchParams,
}: {
  params: {
    id: string | number;
  };
  searchParams: {
    fullname: string;
    phone: string;
    email: string;
    address: string;
    status: string;
    createdAt: string;
  };
}) {
  // const {data, isError, isFetched} = RegistrationUseQuery.getOneById(id as string);

  console.log(params, searchParams);
  return (
    <div className="w-full lg:w-2/3 p-10">
        <h3 className="text-xl font-bold mb-10">Chi tiết hồ sơ đăng ký</h3>
      <div className="grid grid-cols-3 mb-20">
        <Label className="col-span-1">Tên người đăng ký</Label>
        <span className="text-gray-500 col-span-2">
          {searchParams?.fullname}
        </span>
        <Label className="col-span-1">Số điện thoại</Label>
        <span className="text-gray-500 col-span-2">{searchParams?.phone}</span>
        <Label className="col-span-1">Email</Label>
        <span className="text-gray-500 col-span-2">{searchParams?.email}</span>
        <Label className="col-span-1">Địa chỉ</Label>
        <span className="text-gray-500 col-span-2">
          {searchParams?.address}
        </span>
        <Label className="col-span-1">Status</Label>
        <span className="text-gray-500 col-span-2">{searchParams?.status}</span>
        <Label className="col-span-1">Ngày đăng ký</Label>
        <span className="text-gray-500 col-span-2">
          {searchParams?.createdAt && formatDateTimeToddMMyyyyHHmm(searchParams?.createdAt)}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button className="col-span-1 bg-emerald-500 hover:bg-emerald-300">Xác nhận</Button>
        <Button className="col-span-1 bg-red-500 hover:bg-red-300">Từ chối</Button>
        <Button className="col-span-2">Liên hệ để lấy thêm thông tin</Button>
      </div>
    </div>
  );
}

export default RegistrationDetail;
