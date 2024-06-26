import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { IToken } from "@/types/token";
import { $fetch, $globalFetch } from "@/lib/axios";
import { UserRole } from "@/enums/roles";
import { IUser } from "@/types/user";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & User;
    accessToken: IToken | null;
    refreshToken: IToken | null;
    error?: string;
  }

  interface User extends IUser {
    userRole: UserRole;
    userId: string | number;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (url.includes("login?callbackUrl")) {
        const callbackUrl = new URL(url, baseUrl);
        const redirectUrl = callbackUrl.searchParams.get("callbackUrl");
        if (redirectUrl) {
          return redirectUrl;
        }
      } else if (new URL(url).origin === baseUrl && !url.includes("/login"))
        return url;
      return baseUrl;
    },
    async session({ session, token }) {
      session.accessToken = token?.accessToken as IToken;
      session.refreshToken = token?.refreshToken as IToken;

      if (session?.user) {
        return {
          ...session,
          user: {
            ...session.user,
            userId: token?.userId,
            userRole: token?.userRole,
            ...token?.user,
          },
        };
      }
      return session;
    },
    async jwt({ token, user, account, profile, trigger, session }) {
      if (trigger === "update" && session) {
        token.accessToken = session?.accessToken;
        token.refreshToken = session?.refreshToken;
        return token;
      }
      if (account?.provider === "google" && profile) {
        const res = await $globalFetch(`/v1/auth/login-email`, {
          method: "POST",
          data: { token_email: account.access_token },
        });

        const data = res.data;

        token.accessToken = data.tokens.access;
        token.refreshToken = data.tokens.refresh;
        token.userRole = data.user?.role.name;
        token.userId = data.user?.user_id;
        token.user = data.user;

        return token;
      }

      if (user) {
        token.accessToken = user?.access;
        token.refreshToken = user?.refresh;
        token.userRole = user?.role.name;
        token.userId = user?.user_id;
        token.user = user;
      }

      return token;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (credentials === undefined || req.headers == null) return null;

        // const headers = {
        //   "user-agent": req.headers["user-agent"],
        //   "x-real-ip": req.headers["x-real-ip"],
        //   "cf-ipcountry": req.headers["cf-ipcountry"],
        //   "x-browser": req.headers["x-browser"],
        // };

        const { email, password } = credentials;
        try {
          const res = await $fetch("/v1/auth/login", {
            method: "POST",
            data: {
              email,
              password,
            },
          });

          const _user = res?.data?.user;
          const _tokens = res?.data?.tokens;

          if (!_user) {
            return null;
          }

          return {
            ..._user,
            ..._tokens,
          };
        } catch (e: any) {
          console.error('Error in "CredentialsProvider"', e?.data.message || e);
          return null;
        }
      },
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
