import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(req) {
        console.log(req.nextauth.token)
        const token = req.nextauth.token
        const pathname = req.nextUrl.pathname
        console.log(token?.role)
        if (token?.role !== "Admin" && pathname === "/about") {
            console.log(req.nextUrl.pathname)
            return NextResponse.redirect(new URL("/?message=not allow", req.nextUrl))
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
)

export const config = { matcher: ["/about"] }