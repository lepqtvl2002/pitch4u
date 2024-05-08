"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { $fetch, $globalFetch } from "@/lib/axios";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";

function AuthProviderHelper({ children }: React.PropsWithChildren) {
  const { update, data, status } = useSession();
  const router = useRouter();

  const refreshAccessToken = useCallback(
    async (refreshToken?: string | null) => {
      try {
        const { data } = await $globalFetch("/v1/auth/refresh-tokens", {
          method: "POST",
          data: {
            refresh_token: refreshToken,
          },
        });
        return data;
      } catch (error) {
        toast({
          title: "Phiên đăng nhập hết hạn",
          description: "Vui lòng đăng nhập lại",
          variant: "destructive",
          action: (
            <ToastAction
              onClick={() => {
                const callbackUrl = new URL(window.location.href);
                signOut({
                  redirect: true,
                  callbackUrl: `/login?callbackUrl=${callbackUrl}`,
                });
              }}
              altText={"relogin"}
            >
              Đăng nhập
            </ToastAction>
          ),
        });
      }
    },
    []
  );

  useEffect(() => {
    const requestInterceptor = $fetch.interceptors.request.use(
      (config) => {
        if (data?.accessToken?.token) {
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
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const tokens = await refreshAccessToken(data?.refreshToken?.token);
          if (tokens) {
            await update({
              accessToken: tokens?.access,
              refreshToken: tokens?.refresh,
            });
            console.log("updated tokens", tokens.access.token);
            return Promise.reject(error);
          } else {
            toast({
              title: "Không thể refresh token",
              description: "Đang thử lại...",
              variant: "default",
            });
          }
        } else {
          toast({
            title: "Lỗi khi call API",
            description: "Đang thử lại...",
            variant: "default",
          });
        }
      }
    );

    return () => {
      $fetch.interceptors.response.eject(responseInterceptor);
      $fetch.interceptors.request.eject(requestInterceptor);
    };
  }, [data, refreshAccessToken, router, status, update]);

  return <>{children}</>;
}

export default AuthProviderHelper;
