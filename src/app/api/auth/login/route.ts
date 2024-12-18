import AuthModel from "@/models/Auth";
import { generateTokens,cookieResponse } from "@/helper/Tokens";
import connectDb from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { options } from "@/constants";

export async function POST(req: NextRequest) {
	await connectDb();
	try {
		const body = await req.json();
		const { email, password, provider = "email" } = body;
		const user = await AuthModel.findOne({ email, provider });

		if (!user) {
			return NextResponse.json({ message: "User not found" }, { status: 404 });
		}

		if (user.provider === "email") {
			const isPasswordValid = await user.isPasswordCorrect(password);
			if (!isPasswordValid) {
				return NextResponse.json(
					{ message: "Invalid credentials", success: false },
					{ status: 401 }
				);
			}
		}
		const response = await cookieResponse(user);
		return response;
	} catch (error) {
		console.error("Error in POST handler:", error);
		return NextResponse.json(
			{ message: "Something went wrong" },
			{ status: 500 }
		);
	}
}

