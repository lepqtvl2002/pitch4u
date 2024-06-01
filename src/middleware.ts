// export { default } from "next-auth/middleware"
import { withAuth } from "next-auth/middleware";
import UserRoles from "./enums/roles";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // console.log("middleware : ", req.nextauth.token)
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // `/admin` requires super admin role
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return token?.userRole === UserRoles.SuperAdmin;
        }
        if (req.nextUrl.pathname.startsWith("/dashboard")) {
          if (req.nextUrl.pathname.includes("staff")) {
            return token?.userRole === UserRoles.Admin;
          }
          return (
            token?.userRole === UserRoles.Admin ||
            token?.userRole === UserRoles.Staff
          );
        }
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/pitch/register",
    "/personal/:path*",
  ],
};
