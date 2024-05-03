"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "../ui/use-toast";
import { PitchUseMutation } from "@/server/actions/pitch-actions";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { mutatingToast } from "@/lib/quick-toast";
import Image from "next/image";
import { ImageUseMutation } from "@/server/actions/image-actions";
import GoogleMapReact, { ClickEventValue } from "google-map-react";
import { IPitch } from "@/types/pitch";
import { UserProfile } from "@/server/queries/user-queries";
import { enumPitchTypesArray } from "@/enums/enumPitchTypes";
import { PitchUseQuery } from "@/server/queries/pitch-queries";

const formSchema = z.object({
  card_id: z.string(),
  fullname: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  address: z.string().min(2),
  phone: z.string().min(9).max(15),
  pitch_name: z.string().min(2).max(50),
  pitch_address: z.string().min(2),
  uploadPhotos: z.any().nullable(),
});
type MarkerProps = {
  lat: number;
  lng: number;
};
const Marker = (props: MarkerProps) => (
  <Image width={30} height={30} src={"/assets/marker-icon.png"} alt="marker" />
);
type RegisterFormProps = {
  pitch?: IPitch;
  user?: UserProfile;
};
export function PitchRegisterForm({
  pitch,
  user,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & RegisterFormProps) {
  const { data: session } = useSession();
  const [loading, setLoading] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [pitchType, setPitchType] = React.useState("soccer");
  const { mutateAsync } = PitchUseMutation.pitchRegister();
  const { data: pitchTypes, isLoading: isLoadingPitchTypes } =
    PitchUseQuery.getPitchTypes();
  const router = useRouter();
  const [markerPos, setMarkerPos] = React.useState({
    lat: 16.0544068,
    lng: 108.1655063,
  });

  function goNextStep() {
    setStep((pre) => pre + 1);
  }

  function goPrevStep() {
    setStep((pre) => pre - 1);
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: user?.fullname,
      email: user?.email,
      phone: user?.phone,
    },
    mode: "onChange",
  });
  const mapDefaultProps = {
    center: {
      lat: 16.0544068,
      lng: 108.1655063,
    },
    zoom: 11,
  };
  const handleMark = (event: ClickEventValue) => {
    setMarkerPos({ lat: event.lat, lng: event.lng });
  };
  const { mutateAsync: uploadImage } = ImageUseMutation.upload();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      mutatingToast();
      const { uploadPhotos, ...sendValues } = values;
      const uploadImageUrls = await Promise.all(
        Array.from(uploadPhotos)?.map((file) => uploadImage({ image: file }))
      );
      await mutateAsync({
        ...sendValues,
        long: markerPos.lng,
        lat: markerPos.lat,
        proofs: uploadImageUrls.map((e: any) => e?.result),
        type: pitchType,
      });

      localStorage.setItem(
        "REGISTER",
        JSON.stringify({ user_id: session?.user?.id })
      );
      router.push("/pitch/register-success");
    } catch (error: any) {
      toast({
        title: "Đăng ký thất bại",
        variant: "destructive",
        description:
          "Đăng ký thất bại, đã có lỗi xảy ra, vui lòng thử lại sau.",
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex justify-around">
        {[1, 2, 3].map((number, index) => (
          <Button
            variant={step === number ? "default" : "outline"}
            key={index}
            className="w-10 h-10 rounded-full"
            onClick={() => setStep(number)}
          >
            {index + 1}
          </Button>
        ))}
      </div>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Đăng ký làm chủ sân
        </h1>
        <p className="text-sm text-muted-foreground">
          {step === 3
            ? "Nếu bạn có nhiều hơn một sân, đừng lo lắng, bạn có thể đăng ký thêm sân sau khi hồ sơ được duyệt."
            : "Điền thông tin cần thiết vào bên dưới để đăng ký làm chủ sân"}
        </p>
      </div>
      <div className={cn("grid gap-6", className)} {...props}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-8">
              <div className="grid gap-2">
                {step === 1 && (
                  <>
                    <FormField
                      control={form.control}
                      name="fullname"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              id="fullname"
                              type="text"
                              placeholder="Tên chủ sân"
                              autoComplete="name"
                              disabled={loading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              id="email"
                              placeholder="Địa chỉ email"
                              type="email"
                              autoCapitalize="none"
                              autoComplete="email"
                              autoCorrect="off"
                              disabled={loading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="card_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              id="card_id"
                              placeholder="CCCD/CMND"
                              type="text"
                              autoCorrect="off"
                              disabled={loading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              id="address"
                              placeholder="Địa chỉ của chủ sân"
                              type="address"
                              autoCapitalize="none"
                              autoComplete="address"
                              autoCorrect="off"
                              disabled={loading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              id="phone"
                              type="text"
                              placeholder="Số điện thoại chủ sân"
                              autoComplete="phone"
                              disabled={loading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                {step === 2 && (
                  <>
                    <FormLabel>Loại sân</FormLabel>
                    <Select onValueChange={setPitchType}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={pitchType} />
                      </SelectTrigger>
                      <SelectContent>
                        {isLoadingPitchTypes ? (
                          <SelectItem value="soccer">Loading</SelectItem>
                        ) : (
                          enumPitchTypesArray.map((type) => (
                            <SelectItem
                              key={type}
                              value={type}
                              disabled={
                                pitchTypes &&
                                !(type.toUpperCase() in pitchTypes?.result)
                              }
                            >
                              {type}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>

                    <FormField
                      control={form.control}
                      name="pitch_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              id="pitch_name"
                              placeholder="Tên sân bóng"
                              autoCorrect="off"
                              disabled={loading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pitch_address"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              id="pitch_address"
                              type="text"
                              placeholder="Địa chỉ sân"
                              autoComplete="address"
                              disabled={loading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="relative h-screen pb-10 mb-10">
                      <FormLabel>Địa chỉ trên Google map</FormLabel>
                      <FormDescription>
                        Hãy chọn chính xác địa chỉ sân bóng của bạn trên bản đồ
                        để người dùng có thể dễ dàng tìm kiếm.
                      </FormDescription>
                      <div className="space-x-2">
                        <FormLabel>Lat:</FormLabel>
                        <span>{markerPos.lat}</span>
                        <FormLabel>Long:</FormLabel>
                        <span>{markerPos.lng}</span>
                      </div>
                      <GoogleMapReact
                        bootstrapURLKeys={{
                          key: "AIzaSyDFaXNvUSNlqQoqlNBgCgppWcSeYxb5kDM",
                        }}
                        defaultCenter={mapDefaultProps.center}
                        defaultZoom={mapDefaultProps.zoom}
                        onClick={handleMark}
                      >
                        <Marker lat={markerPos.lat} lng={markerPos.lng} />
                      </GoogleMapReact>
                    </div>
                  </>
                )}
              </div>
              {step === 3 && (
                <>
                  {/* Images */}
                  <div className="grid gap-2">
                    <div className="grid gap-2">
                      <FormLabel htmlFor="uploadPhotos">
                        Hình ảnh minh chứng
                      </FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Thêm hình ảnh để xác minh chủ sở hữu của sân này. Nếu
                        đây là lần đầu tiên đăng ký sân của bạn, vui lòng cung
                        cấp thêm hình ảnh CCCD/CMND để quá trình xác minh được
                        diễn ra nhanh hơn.
                      </p>
                      <Input
                        id="uploadPhotos"
                        placeholder="Thêm hình ảnh"
                        type="file"
                        multiple
                        {...form.register("uploadPhotos")}
                      />
                      {form.formState.errors.uploadPhotos && (
                        <p className="text-sm text-red-500">
                          {form.formState.errors.uploadPhotos?.message?.toString()}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      {form.watch("uploadPhotos")?.length > 0 && (
                        <pre className={"overflow-auto gap-2 border-muted"}>
                          {Array.from(form.getValues("uploadPhotos"))?.map(
                            (uploadPhoto: any, index: number) => (
                              <Image
                                onClick={() => {
                                  const currentFileList =
                                    form.getValues("uploadPhotos");
                                  // Remove the file at the specified index
                                  const updatedFileList = Array.from(
                                    currentFileList
                                  ).filter((file, i) => i !== index);

                                  // Create a new FileList with the updated files
                                  const newFileList = new DataTransfer();
                                  updatedFileList.forEach((file: any) => {
                                    newFileList.items.add(file);
                                  });

                                  form.setValue(
                                    "uploadPhotos",
                                    newFileList.files
                                  );
                                }}
                                key={index}
                                src={URL.createObjectURL(uploadPhoto)}
                                alt={form.getValues("fullname") + index}
                                width={1000}
                                height={100}
                                className="w-full border"
                              />
                            )
                          )}
                        </pre>
                      )}
                    </div>
                  </div>
                </>
              )}

              <div className="grid gap-2">
                {step === 1 ? (
                  <Button
                    disabled={
                      !form.getValues().email ||
                      !form.getValues().fullname ||
                      !form.getValues().address ||
                      !form.getValues().phone ||
                      !form.getValues().card_id
                    }
                    type="button"
                    onClick={goNextStep}
                  >
                    Tiếp tục
                  </Button>
                ) : step === 2 ? (
                  <Button
                    disabled={
                      !form.getValues().pitch_name ||
                      !form.getValues().pitch_address
                    }
                    type="button"
                    onClick={goNextStep}
                  >
                    Tiếp tục
                  </Button>
                ) : (
                  <Button
                    disabled={
                      loading ||
                      Object.values(form.getValues()).some((value) => !value)
                    }
                    type="submit"
                  >
                    {loading && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Đăng ký ngay
                  </Button>
                )}
                {step > 1 ? (
                  <Button
                    variant="outline"
                    disabled={loading}
                    type="button"
                    onClick={goPrevStep}
                  >
                    Quay lại
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      window.location.href = "/";
                    }}
                    variant="outline"
                    disabled={loading}
                    type="button"
                  >
                    Trở về trang chủ
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </div>
      <p
        className={cn(
          "px-8 text-center text-sm text-muted-foreground hidden",
          step === 1 && "block"
        )}
      >
        Bằng cách nhấp vào tiếp tục, bạn đồng ý với{" "}
        <Link
          href="/terms-of-use"
          className="underline underline-offset-4 hover:text-primary"
        >
          Điều khoản dịch vụ
        </Link>{" "}
        và{" "}
        <Link
          href="/privacy-policy"
          className="underline underline-offset-4 hover:text-primary"
        >
          Chính sách quyền riêng tư
        </Link>{" "}
        của chúng tôi.
      </p>
    </div>
  );
}
