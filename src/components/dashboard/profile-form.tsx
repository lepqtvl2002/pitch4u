"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useFieldArray, useForm} from "react-hook-form";
import * as z from "zod";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {toast} from "@/components/ui/use-toast";
import {UserUseMutation} from "@/server/actions/user-actions";

const profileFormSchema = z.object({
    fullname: z.string().min(2, {
        message: "Tên phải chứa tối thiểu 3 ký tự.",
    }),
    gender: z.string().optional(),
    phone: z.string().max(12).min(9),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

type FormProps = {
    userProfile?: any,
};

export function ProfileForm({userProfile}: FormProps) {
    console.log(userProfile);
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues : {
            gender: userProfile?.gender,
            fullname: userProfile?.fullname,
            phone: userProfile?.phone
        },
        // mode: "onChange",
    });
    const {mutateAsync} = UserUseMutation.updateProfile();

    async function onSubmit(data: ProfileFormValues) {
        try {
            const result = await mutateAsync(data);
            console.log(result);
            if (result) {
                toast({
                    title: "You submitted the following values:",
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(data, null, 2)}
              </code>
            </pre>
                    ),
                });
            }
        } catch (error) {
            toast({
                title: "You submitted the following values:",
                variant: "destructive",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
                ),
            });
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="fullname"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Tên đầy đủ</FormLabel>
                            <FormControl>
                                <Input placeholder="Tên của bạn" defaultValue={field.value} {...field} />
                            </FormControl>
                            <FormDescription>
                                Đây là tên hiển thị công khai của bạn. Nó có thể là tên thật của
                                bạn hoặc một bút danh. Bạn chỉ có thể thay đổi tên này một lần
                                mỗi 30 ngày.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="gender"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Giới tính</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Giới tính của bạn"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value={"male"}>Nam</SelectItem>
                                    <SelectItem value={"female"}>Nữ</SelectItem>
                                    <SelectItem value={"other"}>Khác</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Số điện thoại</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Nhập số điện vủa bạn"
                                    defaultValue={field.value}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit">Cập nhật thông tin</Button>
            </form>
        </Form>
    );
}
