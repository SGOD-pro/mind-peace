import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
	const accessTokenCookie = request.cookies.get("accessToken");
	const token =
		accessTokenCookie?.value ||
		request.headers.get("Authorization")?.replace("Bearer ", "");

	// Redirect to login if there's no token
	if (!token) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	try {
		// Verify the JWT
		const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
			role: number;
		};

		// Get the path of the request
		const pathname = request.nextUrl.pathname;

		// Role-based route protection
		if (
			(decodedToken.role === 2 && pathname.startsWith("/dashboard/admin")) || 
			(decodedToken.role === 0 && pathname.startsWith("/dashboard/user")) ||  
			(decodedToken.role === 3 && pathname.startsWith("/dashboard/therapist")) 
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
		return NextResponse.redirect(new URL("/login", request.url));
	}
}

export const config = {
	matcher: "/dashboard/:path*",
};
