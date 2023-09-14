// export { default } from "next-auth/middleware"
import { withAuth } from "next-auth/middleware"

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(req) {
        console.log("middleware : ", req.nextauth.token)
    },
    {
        callbacks: {
            authorized: ({req, token}) => {
                // `/admin` requires admin role
                if (req.nextUrl.pathname === "/admin") {
                    return token?.userRole === "ADMIN"
                }
                return !!token
            },
        },
    }
)

export const config = { matcher: ["/dashboard", "/admin"] }