"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import SoccerPitchTypes from "@/enums/soccerPitchTypes";
import { PitchUseMutation } from "@/server/actions/pitch-actions";
import { useRouter } from "next/navigation";
import { Icons } from "../icons";
import { PitchUseQuery } from "@/server/queries/pitch-queries";
import { useEffect, useState } from "react";
import { subPitchTypeToString } from "@/lib/convert";

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Tên phải chứa tối thiểu 3 ký tự.",
  }),
  price: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Vui lòng nhập số.",
  }),
  type: z.nativeEnum(SoccerPitchTypes).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

type FormProps = {
  pitch_id: string | number;
  subPitchProfile?: any;
  pitchType?: string | null;
};

export function SubPitchForm({ pitch_id, pitchType }: FormProps) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    // mode: "onChange",
  });
  const { mutateAsync, isLoading } = PitchUseMutation.addSubPitch();
  const router = useRouter();
  const { data, isLoading: isLoadingSubPitchTypes } = pitchType
    ? PitchUseQuery.getSubPitchTypes({
        pitchType,
      })
    : { data: { result: [] }, isLoading: false };

  const [subPitchTypes, setSubPitchTypes] = useState(
    data ? Object.values(data.result) : []
  );

  useEffect(() => {
    if (data) {
      console.log(data);
      setSubPitchTypes(Object.values(data.result));
    }
  }, [data]);

  async function onSubmit(data: ProfileFormValues) {
    try {
      const result = await mutateAsync({
        ...data,
        pitch_id,
        price: Number(data.price),
      });
      if (result) {
        toast({
          title: "Tạo thành công",
          description: `Đã thêm thành công sân ${data.name}.`,
          variant: "success",
        });
        router.push(`/dashboard/pitch/${pitch_id}`);
      }
    } catch (error) {
      toast({
        title: "Hành động thất bại",
        variant: "destructive",
        description: "Đã có lỗi xảy ra, vui lòng thử lại.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên sân</FormLabel>
              <FormControl>
                <Input
                  placeholder="Tên sân"
                  defaultValue={field.value}
                  {...field}
                />
              </FormControl>
              <FormDescription>Đây là tên sân con của bạn.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {pitchType && (subPitchTypes.length > 0) && (
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loại sân</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Loại sân sử dụng" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isLoadingSubPitchTypes ? (
                      <>Loading...</>
                    ) : (
                      subPitchTypes?.map((type, index) => (
                        <SelectItem key={index} value={type}>
                          {subPitchTypeToString({
                            subPitchType: type,
                            pitchType,
                          })}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Nếu bạn muốn đa dạng việc sử dụng, hãy sử dụng dịch vụ nâng
                  cao.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giá sân</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Nhập giá sân"
                  defaultValue={field.value}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Hãy nhập giá sân trong một giờ sử dụng.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}{" "}
          Tạo mới sân
        </Button>
      </form>
    </Form>
  );
}
