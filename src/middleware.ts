import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
    const accessTokenCookie = request.cookies.get("accessToken");
    const token =
        accessTokenCookie?.value ||
        request.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return NextResponse.redirect(new URL("/404", request.url));
    }

    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.ACCESS_TOKEN!));
        const pathname = request.nextUrl.pathname;

        if (
            (payload.role === 2 && pathname.startsWith("/dashboard/admin")) ||
            (payload.role === 0 && pathname.startsWith("/dashboard/user")) ||
            (payload.role === 1 && pathname.startsWith("/dashboard/therapist"))
            //|| (payload.role && pathname.startsWith("/therapist/book"))
        ) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL("/not-authorized", request.url));
        }
    } catch (error) {
        console.error("Token verification failed:", error);
        return NextResponse.redirect(new URL("/404", request.url));
    }
}

export const config = {
    matcher: ["/dashboard/:path*"],
    // matcher: ["/dashboard/:path*","/therapist/book/:path*"],
};
