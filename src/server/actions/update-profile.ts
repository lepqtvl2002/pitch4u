"use server";

import { $fetch } from "@/lib/axios";

export async function updateProfile(formData : FormData) {
    console.log(formData);
    try {
        const res = await $fetch('/v1/users/profile', 
        {
            method: 'PATCH',
            data: formData
        })

        console.log(res);
    } catch (e) {
        return {
            error : "Error"
        }
    }
}