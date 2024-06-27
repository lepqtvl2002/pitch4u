"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import GoogleMapReact, { ClickEventValue } from "google-map-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PitchUseMutation } from "@/server/actions/pitch-actions";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Label } from "../ui/label";
import { ImageUseMutation } from "@/server/actions/image-actions";
import { AvatarCustom } from "../ui/avatar-custom";
import { useState } from "react";
import { IPitch } from "@/types/pitch";
import { mutatingToast } from "@/lib/quick-toast";
import { CameraIcon, ImageIcon, PlusIcon, XIcon } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const createFormSchema = z.object({
  name: z.string().min(2, {
    message: "Tên phải chứa tối thiểu 3 ký tự.",
  }),
  address: z.string(),
  thumbnail: z
    .any()
    .refine((files) => files?.length == 1, "Chỉ được chọn một file")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Kích thước file không được vượt quá ${MAX_FILE_SIZE / 1000}KB`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Chỉ nhận file .jpg, .jpeg, .png and .webp "
    ),
  uploadPhotos: z.any().nullable(),
  services: z.array(z.string()),
});

const updateFormSchema = z.object({
  name: z.string().min(2, {
    message: "Tên phải chứa tối thiểu 3 ký tự.",
  }),
  address: z.string(),
  thumbnail: z
    .any()
    .nullable()
    .optional()
    .refine((files) => files?.length <= 1, "Chỉ được chọn một file")
    .refine(
      (files) => files?.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE,
      `Kích thước file không được vượt quá ${MAX_FILE_SIZE / 1000}KB`
    )
    .refine(
      (files) =>
        files?.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Chỉ nhận file .jpg, .jpeg, .png and .webp "
    ),
  uploadPhotos: z.any().nullable(),
  services: z.array(z.string()).optional(),
});

type FormProps = {
  pitch?: IPitch;
};
type MarkerProps = {
  lat: number;
  lng: number;
};
const Marker = (props: MarkerProps) => (
  <Image width={30} height={30} src={"/assets/marker-icon.png"} alt="marker" />
);

export function EditPitchForm({ pitch }: FormProps) {
  const schema = pitch ? updateFormSchema : createFormSchema;
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: pitch?.name,
      address: pitch?.address,
      services: pitch?.services,
    },
    mode: "onChange",
  });
  const serviceArray = useFieldArray({
    control: form.control,
    name: "services",
  });

  const { mutateAsync: updatePitchMutate, isLoading } =
    PitchUseMutation.updatePitch(pitch?.pitch_id as unknown as string);
  const { mutateAsync: uploadImage } = ImageUseMutation.upload();
  const [markerPos, setMarkerPos] = useState({
    lat: pitch?.lat || 16.0544068,
    lng: pitch?.long || 108.1655063,
  });

  const [pitchImages, setPitchImages] = useState(pitch?.images || []);

  async function onSubmit(data: z.infer<typeof schema>) {
    mutatingToast();
    const logoUrl = data?.thumbnail[0]
      ? await uploadImage({ image: data.thumbnail[0] })
      : null;
    const imageUrls = await Promise.all(
      Array.from(data.uploadPhotos)?.map((file) => uploadImage({ image: file }))
    );
    const { thumbnail, uploadPhotos, ...values } = data;
    let sendValues: Record<string, any> = {};
    sendValues = logoUrl ? { ...values, logo: logoUrl?.result } : values;
    const images = [
      ...pitchImages,
      ...imageUrls.map((imageUrl) => imageUrl?.result),
    ];

    sendValues["lat"] = markerPos.lat;
    sendValues["long"] = markerPos.lng;
    await updatePitchMutate({ ...sendValues, images });
  }
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
  //https://www.google.com/maps/place/%C4%90%C3%A0+N%E1%BA%B5ng,+H%E1%BA%A3i+Ch%C3%A2u,+%C4%90%C3%A0+N%E1%BA%B5ng,+Vi%E1%BB%87t+Nam/@16.0472473,108.1655063,13z/data=!3m1!4b1!4m6!3m5!1s0x314219c792252a13:0xfc14e3a044436487!8m2!3d16.0544068!4d108.2021667!16s%2Fg%2F11bc5hq_qy?entry=ttu
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Logo */}
        <div className="grid gap-2">
          <div>
            <Label htmlFor="thumbnail">Logo sân</Label>
            <p className="text-sm text-muted-foreground">
              Hình ảnh tượng trưng cho sân
            </p>
            {form.formState.errors.thumbnail && (
              <p className="text-sm text-red-500">
                {form.formState.errors.thumbnail?.message?.toString()}
              </p>
            )}
          </div>
          <div className="flex flex-col items-center space-y-2">
            {form.watch("thumbnail")?.length > 0 && (
              <pre className={"my-2 border-muted px-2 py-1"}>
                <AvatarCustom
                  avatarUrl={URL.createObjectURL(
                    form.getValues("thumbnail")[0]
                  )}
                  name={form.getValues("name")}
                  className="w-60 h-60 border"
                />
              </pre>
            )}
            {pitch?.logo && !(form.watch("thumbnail")?.length > 0) && (
              <pre className="my-2 border-muted px-2 py-1">
                <AvatarCustom
                  avatarUrl={pitch?.logo}
                  name={form.getValues("name")}
                  className="w-60 h-60 border"
                />
              </pre>
            )}
            <Input
              id="thumbnail"
              placeholder="Thay đổi logo"
              className="hidden"
              type="file"
              {...form.register("thumbnail")}
            />
            <Label
              htmlFor="thumbnail"
              className={buttonVariants({ variant: "outline" })}
            >
              Chọn Logo <CameraIcon className="ml-2" />
            </Label>
          </div>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên sân</FormLabel>
              <FormControl>
                <Input
                  placeholder="Tên sân của bạn"
                  defaultValue={field.value}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Đây là tên hiển thị công khai của bạn.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa chỉ</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Nhập địa chỉ sân"
                  defaultValue={field.value}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="xl:w-[1000px] h-screen pb-10 xl:m-10">
          <FormLabel>Địa chỉ trên Google map</FormLabel>
          <FormDescription>
            Hãy chọn chính xác địa chỉ sân của bạn trên bản đồ để người dùng có
            thể dễ dàng tìm kiếm.
          </FormDescription>
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
          <div className="space-x-2">
            <FormLabel>Lat:</FormLabel>
            <span>{markerPos.lat}</span>
            <FormLabel>Long:</FormLabel>
            <span>{markerPos.lng}</span>
          </div>
        </div>
        {/* Images */}
        <div className="grid gap-2 pt-10">
          <div>
            <Label htmlFor="uploadPhotos">Hình ảnh về sân</Label>
            <p className="text-sm text-muted-foreground">
              Thêm hình ảnh để mọi người biết thêm về sân
            </p>
            {form.formState.errors.uploadPhotos && (
              <p className="text-sm text-red-500">
                {form.formState.errors.uploadPhotos?.message?.toString()}
              </p>
            )}
          </div>
          <div className="flex flex-col items-center space-y-2">
            <ScrollArea className="w-full">
              <div className="flex gap-2 py-2">
                {pitchImages?.map((imageUrl: any, index: number) => (
                  <Image
                    key={index}
                    src={imageUrl}
                    alt={imageUrl}
                    width={2000}
                    height={1000}
                    className="w-full border"
                    onClick={() => {
                      setPitchImages(
                        pitchImages.filter((url, i) => url !== imageUrl)
                      );
                    }}
                  />
                ))}
                {form.watch("uploadPhotos")?.length > 0 &&
                  Array.from(form.getValues("uploadPhotos"))?.map(
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

                          form.setValue("uploadPhotos", newFileList.files);
                        }}
                        key={index}
                        src={URL.createObjectURL(uploadPhoto)}
                        alt={form.getValues("name")}
                        width={1000}
                        height={100}
                        className="w-full border"
                      />
                    )
                  )}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>

            <Input
              id="uploadPhotos"
              className="hidden"
              type="file"
              multiple
              {...form.register("uploadPhotos")}
            />
            <Label
              htmlFor="uploadPhotos"
              className={buttonVariants({ variant: "outline" })}
            >
              Thêm hình ảnh về sân <ImageIcon className="ml-2" />
            </Label>
          </div>
        </div>

        {/* Services */}
        <div className="grid gap-4">
          <FormLabel>Dịch vụ</FormLabel>
          {serviceArray.fields.map((field, index) => (
            <div className="flex gap-2" key={field.id}>
              <FormField
                control={form.control}
                name={`services.${index}`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Dịch vụ"
                        defaultValue={field.value}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                onClick={() => serviceArray.remove(index)}
                type="button"
                size="icon"
              >
                <XIcon />
              </Button>
            </div>
          ))}
          <Button
            onClick={() => serviceArray.append("")}
            type="button"
            variant="secondary"
          >
            Thêm dịch vụ <PlusIcon className="ml-2" />
          </Button>
        </div>

        <Button disabled={isLoading} type="submit">
          Cập nhật thông tin
        </Button>
      </form>
    </Form>
  );
}
