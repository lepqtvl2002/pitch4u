// export { default } from "next-auth/middleware"
import { withAuth } from "next-auth/middleware";

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
          return token?.userRole?.name === "super_admin";
        }
        if (req.nextUrl.pathname.startsWith("/dashboard")) {
          return (
            token?.userRole?.name === "admin" ||
            token?.userRole?.name === "staff"
          );
        }
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/pitch/register", "/personal/:path*"],
};
