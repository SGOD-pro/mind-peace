import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
    const accessTokenCookie = request.cookies.get("accessToken");
    const token =
        accessTokenCookie?.value ||
        request.headers.get("Authorization")?.replace("Bearer ", "");

    // Redirect to login if there's no token
    if (!token) {
        return NextResponse.redirect(new URL("/404", request.url));
    }

    try {
        // Verify the JWT
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET!));

        // Get the path of the request
        const pathname = request.nextUrl.pathname;

        // Role-based route protection
        console.log(payload.role);
        if (
            (payload.role === 2 && pathname.startsWith("/dashboard/admin")) ||
            (payload.role === 0 && pathname.startsWith("/dashboard/user")) ||
            (payload.role === 3 && pathname.startsWith("/dashboard/therapist"))
        ) {
            return NextResponse.next();
        } else {
            // Redirect unauthorized access to a not-found or unauthorized page
            return NextResponse.redirect(new URL("/not-authorized", request.url));
        }
    } catch (error) {
        // Handle token verification error
        console.error("Token verification failed:", error);

        // Redirect to login if the token is invalid or has been tampered with
        return NextResponse.redirect(new URL("/404", request.url));
    }
}

export const config = {
    matcher: "/dashboard/:path*",
};
