import connectDb from "@/db";
import AuthModel from "@/models/Auth";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	await connectDb();
	try {
		const token = req.cookies.get("accessToken")?.value;
		if (!token) {
			return NextResponse.json(
				{ message: "Token not found", success: false },
				{ status: 401 }
			);
		}
		const decodedToken = jwt.verify(
			token,
			process.env.ACCESS_TOKEN!
		) as JwtPayload;
		await AuthModel.findByIdAndUpdate(
			decodedToken?._id,
			{
				$unset: {
					refreshToken: 1,
				},
			}
		);
		const res = NextResponse.json(
			{ success: true, message: "Logged out successfully" },
			{ status: 200 }
		);
		res.cookies.delete("accessToken");
		res.cookies.delete("refreshToken");
		return res;
	} catch (error) {
		console.log(error);
		return NextResponse.json({ success: false }, { status: 500 });
	}
}
