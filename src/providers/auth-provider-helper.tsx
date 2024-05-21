"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { $fetch } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { REQUEST_URLS_CURRENT } from "@/config/request-urls";

function AuthProviderHelper({ children }: React.PropsWithChildren) {
  const { update, data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchAccessToken = async (refreshToken: string) => {
      try {
        const res = await $fetch.post(REQUEST_URLS_CURRENT.REFRESH_TOKEN, {
          refresh_token: refreshToken,
        });
        if (res.data && session) {
          //update server session
          const a = await update({
            ...session,
            accessToken: res.data.access,
            refreshToken: res.data.refresh,
          });
          //update client session at the same time
          session.accessToken = res.data.access;
          session.refreshToken = res.data.refresh;
          console.log("Access token refreshed", a);
        } else {
          await signIn();
        }
      } catch (error) {
        await signIn();
      }
    };

    if (session?.error === "RefreshAccessTokenError") {
      signIn();
    }

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
      async (error) => {
        const prevRequest = error?.config;
        if (error.response?.status === 401 && !prevRequest?.sent) {
          prevRequest._retry = true;
          if (session?.refreshToken?.token) {
            await fetchAccessToken(session?.refreshToken?.token);
            prevRequest.headers[
              "Authorization"
            ] = `Bearer ${session?.accessToken?.token}`;
            return $fetch(prevRequest);
          }
        } else if (error.response?.status === 429) {
          const retryAfter = error.response.headers["retry-after"] || 60;
          await new Promise((resolve) =>
            setTimeout(resolve, retryAfter * 1000)
          );
          return $fetch(prevRequest);
        } else {
          console.log(
            "An error occurred while calling API",
            error.response?.status,
            error.message
          );
          return Promise.reject(error);
        }
      }
    );

    return () => {
      $fetch.interceptors.response.eject(responseInterceptor);
      $fetch.interceptors.request.eject(requestInterceptor);
    };
  }, [router, session, update]);

  return <>{children}</>;
}

export default AuthProviderHelper;
