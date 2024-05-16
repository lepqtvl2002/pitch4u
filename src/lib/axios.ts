import axios from "axios";

export const $globalFetch = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export const $fetch = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
    },
    // withCredentials: true,
});

export const setAccessToken = (token: string) => {
    $fetch.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};