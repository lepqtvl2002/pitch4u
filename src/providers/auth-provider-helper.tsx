"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { $fetch, $globalFetch } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { REQUEST_URLS_CURRENT } from "@/config/request-urls";
import { useMutation } from "@tanstack/react-query";

function AuthProviderHelper({ children }: React.PropsWithChildren) {
  const { update, data: session } = useSession();
  const { mutateAsync: refreshTokenMutate } = useMutation({
    mutationFn: (refreshToken: string) =>
      $globalFetch
        .post(REQUEST_URLS_CURRENT.REFRESH_TOKEN, {
          refresh_token: refreshToken,
        })
        .then((res) => res.data),
  });
  const router = useRouter();

  useEffect(() => {
    const fetchAccessToken = async (refreshToken: string) => {
      try {
        const tokens = await refreshTokenMutate(refreshToken);
        if (tokens && session) {
          //update server session
          await update({
            ...session,
            accessToken: tokens.access,
            refreshToken: tokens.refresh,
          });
          //update client session at the same time
          session.accessToken = tokens.access;
          session.refreshToken = tokens.refresh;
        } else {
          await signOut();
          await signIn();
        }
      } catch (error) {
        await signOut();
        await signIn();
      }
    };

    if (session?.error === "RefreshAccessTokenError") {
      signOut();
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
        if (error.response?.status === 401 && !prevRequest._retry) {
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
  }, [refreshTokenMutate, router, session, update]);

  return <>{children}</>;
}

export default AuthProviderHelper;
