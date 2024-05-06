"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { $fetch, $globalFetch } from "@/lib/axios";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { IRefreshReturn } from "@/types/token";

function AuthProviderHelper({ children }: React.PropsWithChildren) {
  const { update, data, status } = useSession();
  const router = useRouter();

  const refreshAccessToken = useCallback(
    async (refreshToken?: string | null) => {
      try {
        const { data } = await $globalFetch.post<IRefreshReturn>(
          "/v1/auth/refresh-tokens",
          {
            refresh_token: refreshToken,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-refresh-token": refreshToken,
            },
          }
        );
        return data;
      } catch (error) {
        toast({
          title: "Lỗi kết nối",
          description: "Vui lòng kiểm tra kết nối mạng của bạn",
          variant: "destructive",
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
          try {
            const tokens = await refreshAccessToken(data?.refreshToken?.token);
            if (tokens) {
              await update({
                accessToken: tokens?.access,
                refreshToken: tokens?.refresh,
              });
              console.log("updated tokens");
            }
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

          return Promise.reject(error);
        } else {
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
