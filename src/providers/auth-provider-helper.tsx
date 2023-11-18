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
  console.log("session: ", data);
  const refreshAccessToken = useCallback(
    async (refreshToken?: string | null) => {
      console.log("refreshToken: ", refreshToken);
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
          title: "Phiên đăng nhập hết hạn",
          description: "Vui lòng đăng nhập lại, error when refresh token",
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
            description: "Vui lòng đăng nhập lại, have no session",
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

          return Promise.reject(error);
        } else if (error.response?.status === 401 && !originalRequest._retry) {
          try {
            const tokens = await refreshAccessToken(data?.refreshToken?.token);
            if (tokens) {
              await update({
                accessToken: tokens?.access,
                refreshToken: tokens?.refresh,
              });
            } else {
              toast({
                title: "Phiên đăng nhập hết hạn",
                description: "Vui lòng đăng nhập lại, can not refresh token",
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
          } catch (error) {
            console.log(error);
          }
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
