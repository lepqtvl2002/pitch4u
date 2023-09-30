"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { $fetch } from "@/lib/axios";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";

function AuthProviderHelper({ children }: React.PropsWithChildren) {
    const { update, data, status } = useSession();
    const router = useRouter();

    // useEffect(() => {
    //   if (status === "unauthenticated") {
    //     router.push("/login");
    //   }
    // }, [status, router]);

    // const refreshAccessToken = useCallback(
    //   async (refreshToken?: string | null) => {
    //     try {
    //       const { data } = await $globalFetch.post<IRefreshReturn>(
    //         "/auth/refresh-token",
    //         {
    //           refreshToken,
    //         },
    //         {
    //           headers: {
    //             "Content-Type": "application/json",
    //             "x-refresh-token": refreshToken,
    //           },
    //           withCredentials: true,
    //         }
    //       );
    //       return data;
    //     } catch (error) {
    //       console.log(error);
    //       throw error;
    //     }
    //   },
    //   []
    // );

    useEffect(() => {
        const requestInterceptor = $fetch.interceptors.request.use(
            (config) => {
                if (data?.accessToken?.token) {
                    console.log("The token is attached: ", data?.accessToken?.token);
                    config.headers.Authorization = `Bearer ${data?.accessToken?.token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
        const responseInterceptor = $fetch.interceptors.response.use(
            (response) => response,
            async (error: any) => {
                const originalRequest = error.config;
                if (
                    status === "unauthenticated" &&
                    error.response.status === 401 &&
                    !originalRequest._retry
                ) {
                    originalRequest._retry = true;
                    toast({
                        title: "Phiên đăng nhập hết hạn",
                        description: "Vui lòng đăng nhập lại",
                        variant: "destructive",
                        action: (
                            <ToastAction
                                onClick={() => {
                                    signOut()
                                        .then(() => {
                                            router.push("/login");
                                        })
                                        .catch(console.error);
                                }}
                                altText={"relogin"}
                            >
                                Đăng nhập
                            </ToastAction>
                        ),
                    });

                    return Promise.reject(error);
                }
            }
        );

        return () => {
            $fetch.interceptors.response.eject(responseInterceptor);
            $fetch.interceptors.request.eject(requestInterceptor);
        };
    }, [data, router, status, update]);

    return <>{children}</>;
}

export default AuthProviderHelper;
