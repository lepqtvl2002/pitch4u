"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ImageUseMutation } from "@/server/actions/image-actions";
import { mutatingToast } from "@/lib/quick-toast";
import { PostUseMutation } from "@/server/actions/post-actions";
import { AvatarCustom } from "../ui/avatar-custom";
import { Button } from "../ui/button";
import { User } from "next-auth";
import { Textarea } from "../ui/textarea";

const createFormSchema = z.object({
  text: z.string(),
  hastag: z.array(z.string()).optional(),
  uploadPhotos: z.any().nullable(),
});

export function CreatePostForm({
  user,
  onSuccess,
}: {
  user: User;
  onSuccess: () => void;
}) {
  const schema = createFormSchema;
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const {
    mutateAsync: createPostMutate,
    isLoading,
    isSuccess,
  } = PostUseMutation.createPost();
  const { mutateAsync: uploadImage } = ImageUseMutation.upload();

  async function onSubmit(data: z.infer<typeof schema>) {
    mutatingToast();
    const imageUrls = await Promise.all(
      Array.from(data.uploadPhotos)?.map((file) => uploadImage({ image: file }))
    );
    const images = imageUrls.map((imageUrl) => imageUrl?.result);
    console.log(images);
    await createPostMutate({
      text: data.text,
      images,
    });
    if (isSuccess) {
      onSuccess();
      form.reset({ text: "", uploadPhotos: null });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-2 rounded-xl shadow-lg p-2 md:p-4 bg-white mb-2">
          <div className="flex justify-between items-center gap-2">
            <AvatarCustom avatarUrl={user.image} name={user.name} />
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Textarea
                      placeholder="Bạn đang nghĩ gì?"
                      defaultValue={field.value}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-between">
            <FormLabel
              htmlFor="uploadPhotos"
              className="bg-emerald-300 text-white py-2 px-4 rounded-full cursor-pointer flex items-center"
            >
              Upload ảnh/video
            </FormLabel>
            {form.formState.errors.uploadPhotos && (
              <p className="text-sm text-red-500">
                {form.formState.errors.uploadPhotos?.message?.toString()}
              </p>
            )}

            <Input
              id="uploadPhotos"
              placeholder="Thêm hình ảnh"
              className="hidden"
              type="file"
              multiple
              {...form.register("uploadPhotos")}
            />
            <Button
              disabled={isLoading}
              type="submit"
              className="rounded-full"
              variant="secondary"
            >
              Đăng bài
            </Button>
          </div>
          <div className="flex flex-col items-center space-y-2">
            {form.watch("uploadPhotos")?.length > 0 && (
              <pre className={"inline-flex overflow-auto gap-2 border-muted"}>
                {Array.from(form.getValues("uploadPhotos"))?.map(
                  (uploadPhoto: any, index: number) => (
                    <Image
                      onClick={() => {
                        const currentFileList = form.getValues("uploadPhotos");
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
                      alt={form.getValues("uploadPhotos")}
                      width={1000}
                      height={100}
                      className="w-full border max-h-96"
                    />
                  )
                )}
              </pre>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
