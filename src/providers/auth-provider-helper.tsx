"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";
import { $fetch, $globalFetch } from "@/lib/axios";
import { errorToast } from "@/lib/quick-toast";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { requestUrl } from "@/config/request-urls";

function AuthProviderHelper({ children }: React.PropsWithChildren) {
  const { update, data: session } = useSession();
  const router = useRouter();

  const fetchAccessToken = useCallback(async () => {
    try {
      const res = await $globalFetch.post(requestUrl.refreshToken, {
        refresh_token: session?.refreshToken?.token,
      });
      if (res.data) {
        await update({
          ...session,
          accessToken: res.data.access,
          refreshToken: res.data.refresh,
        });
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
        // signOut();
      }
    }
  }, [session, update]);

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
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          // signIn();
          console.log("401 error");
          console.log(session);
          await fetchAccessToken();
        } else {
          errorToast({ actionName: "Call API", code: error.response?.status });
        }
      }
    );

    return () => {
      $fetch.interceptors.response.eject(responseInterceptor);
      $fetch.interceptors.request.eject(requestInterceptor);
    };
  }, [router]);

  return <>{children}</>;
}

export default AuthProviderHelper;
