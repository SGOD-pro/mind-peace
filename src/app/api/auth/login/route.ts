import AuthModel from "@/schema/Auth";
import { generateTokens } from "@/helper/Tokens";
import connectDb from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { options } from "@/constants";

export async function POST(req: NextRequest) {
	await connectDb();
	try {
		const body = await req.json();
		const { email, password, provider = "email" } = body;

		console.log(email,provider)
		const user = await AuthModel.findOne({ email, provider }).select(
			"-refreshToken"
		);

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
		const { accToken, refreshToken } = await generateTokens(user.id as string);
		if (!accToken) {
			return NextResponse.json(
				{ message: "Token generation failed" },
				{ status: 500 }
			);
		}

		const response = NextResponse.json(
			{ message: "Login successful", data: user, success: true },
			{ status: 200 }
		);

		response.cookies.set("refreshToken", refreshToken, {
			...options,
			maxAge: 60 * 60 * 24 * 7, 
		});
		response.cookies.set("accessToken", accToken, options);

		return response;
	} catch (error) {
		console.error("Error in POST handler:", error);
		return NextResponse.json(
			{ message: "Something went wrong" },
			{ status: 500 }
		);
	}
}

