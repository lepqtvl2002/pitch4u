import {type GetServerSidePropsContext} from "next";
import {
    getServerSession,
    type NextAuthOptions,
    type DefaultSession,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {IToken} from "@/types/token.s";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
enum userRole {
    ADMIN = "ADMIN",
    USER = "USER",
    MASTER = "MASTER"
}
type UserRole = userRole.ADMIN | userRole.USER | userRole.MASTER
declare module "next-auth" {
    interface Session extends DefaultSession {
        user: DefaultSession["user"] & User;
    }

    interface User {
        id: string;
        name: string;
        password: string;
        email: string;
        phoneNumber: string;
        accessToken: IToken;
        refreshToken: IToken;
        role: UserRole;
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
    jwt: {
        maxAge: 5000,
    },
    callbacks: {
        session: ({session, token}) => ({
            ...session,
            user: {
                ...session.user,
            },
        }),
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
                email: {label: "Username", type: "email", placeholder: "Username"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials, req) {
                if (credentials === undefined || req.headers == null) return null;

                const headers = {
                    "user-agent": req.headers["user-agent"],
                    "x-real-ip": req.headers["x-real-ip"],
                    "cf-ipcountry": req.headers["cf-ipcountry"],
                    "x-browser": req.headers["x-browser"],
                };

                const {email, password} = credentials;
                const hashedPassword = password;
                try {
                    const a = await new Promise((resolve, reject) => {
                        setTimeout(resolve, 1000);
                    } )
                    const _user = {
                        id: 'asdasdsa',
                        name: "hahaa",
                        username: "sadsadsa",
                        password: "123456",
                        accessToken : {
                            token: "2312w8ysaudhquwiueqweqwe",
                            expiresIn: "dashdsajdjksa",
                        },
                        refreshToken: {
                            token: "2312w8ysaudhquwiueqweqwe",
                            expiresIn: "dashdsajdjksa",
                        },
                        email: "thangas@gmail.com",
                        role:  userRole.USER,
                        phoneNumber: "0123456789"
                    }

                    if (!_user) {
                        return null;
                    }

                    return {
                        ..._user,
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
