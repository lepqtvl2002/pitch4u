"use client";
import { signIn, useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";
import { $fetch, $globalFetch } from "@/lib/axios";
import { errorToast } from "@/lib/quick-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { requestUrl } from "@/config/request-urls";

function AuthProviderHelper({ children }: React.PropsWithChildren) {
  const { update, data: session } = useSession();
  const router = useRouter();

  const fetchAccessToken = useCallback(
    async (refreshToken: string) => {
      try {
        const res = await $globalFetch.post(requestUrl.refreshToken, {
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
        if (axios.isAxiosError(error)) {
          // Handle Axios error
          errorToast({
            actionName: "Refresh Access Token",
            code: error.response?.status,
          });
          signIn();
        } else {
          // Handle general errors
          console.log("An error occurred while refreshing access token");
        }
      }
    },
    [update, session]
  );

  useEffect(() => {
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
  }, [fetchAccessToken, router, session, update]);

  return <>{children}</>;
}

export default AuthProviderHelper;
