"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { $fetch } from "@/lib/axios";
import { errorToast } from "@/lib/quick-toast";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

function AuthProviderHelper({ children }: React.PropsWithChildren) {
  const { update, data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const requestInterceptor = $fetch.interceptors.request.use(
      (config) => {
        if (session?.accessToken?.token) {
          config.headers.Authorization = `Bearer ${session?.accessToken?.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    const responseInterceptor = $fetch.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.response?.config;
        {
          errorToast({ actionName: "Call API", code: error.response?.status });
        }
      }
    );

    return () => {
      $fetch.interceptors.response.eject(responseInterceptor);
      $fetch.interceptors.request.eject(requestInterceptor);
    };
  }, [
    router,
    session?.accessToken?.token,
    session?.refreshToken?.token,
    update,
  ]);

  return <>{children}</>;
}

export default AuthProviderHelper;
