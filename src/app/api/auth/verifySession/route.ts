// app/api/auth/refreshToken.ts

import { NextRequest, NextResponse } from "next/server";
import { generateTokens } from "@/helper/GenrateTokens"; // Adjust the path as needed
import connectDb from "@/db";
import jwt, { JwtPayload } from "jsonwebtoken";
import AuthModel from "@/schema/Auth";
import { options } from "@/constants";
interface DecodedToken extends JwtPayload {
	_id: string; // or whatever fields you expect in your token
	exp?: number; // optional: expiration time if you're including it in your token
	iat?: number; // optional: issued at time if you're including it in your token
}

export async function POST(req: NextRequest) {
	await connectDb();
	try {
		const token = req.cookies.get("refreshToken")?.value;

		if (!token) {
			return NextResponse.json(
				{ message: "Refresh token missing" },
				{ status: 401 }
			);
		}
		const decodedToken = (await jwt.verify(
			token,
			process.env.REFRESH_TOKEN!
		)) as DecodedToken;

		const userId = decodedToken?._id;
		const user = await AuthModel.findById(userId).select(
			"-password -refreshToken"
		);
		if (!userId) {
			return NextResponse.json(
				{ message: "Invalid refresh token" },
				{ status: 401 }
			);
		}
		if (user?.refreshToken !== token) {
			return NextResponse.json(
				{ message: "Invalid refresh token" },
				{ status: 401 }
			);
		}
		const { accToken, refreshToken } = await generateTokens(userId);

		if (!accToken || !refreshToken) {
			return NextResponse.json(
				{ message: "Token generation failed" },
				{ status: 500 }
			);
		}

		const response = NextResponse.json(
			{ message: "Token refreshed successfully", success: true, data: user },
			{ status: 200 }
		);

		// Set new access and refresh tokens in cookies
		response.cookies.set("accessToken", accToken, options);

		response.cookies.set("refreshToken", refreshToken, options);

		return response;
	} catch (error) {
		console.error("Error in refresh token handler:", error);
		return NextResponse.json(
			{ message: "Something went wrong" },
			{ status: 500 }
		);
	}
}
