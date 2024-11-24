// app/api/auth/refreshToken.ts

import { NextRequest, NextResponse } from "next/server";
import { cookieResponse } from "@/helper/Tokens"; // Adjust the path as needed
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
		console.log(token)
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
		if (!userId) {
			return NextResponse.json(
				{ message: "Invalid refresh token" },
				{ status: 404 }
			);
		}
		const user = await AuthModel.findById(userId).select("-password");
		if (user?.refreshToken !== token) {
			console.log("not valid")
			const res = NextResponse.json(
				{ message: "Token not valid" },
				{ status: 401 }
			);
			res.cookies.delete("accessToken");
			res.cookies.delete("refreshToken");
			return res;
		}
		const response = await cookieResponse(user);


		return response;
	} catch (error) {
		console.error("Error in refresh token handler:", error);
		return NextResponse.json(
			{ message: "Something went wrong" },
			{ status: 500 }
		);
	}
}
