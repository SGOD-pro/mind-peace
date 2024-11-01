import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import AuthModel from "@/schema/Auth";
import GenrateTokens from "@/helper/GenrateTokens";
import connectDb from "@/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	await connectDb();
	try {
		const body = await req.json();
		const { email, password, provider } = body;

		const user = await AuthModel.findOne({ email, provider });
		if (!user) {
			return NextResponse.json({ message: "User not found" }, { status: 404 });
		}

		const isPasswordValid = await user.isPasswordCorrect(password);
		if (!isPasswordValid) {
			return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
		}

		const { accToken } = await GenrateTokens(user._id as string);
		if (!accToken) {
			return NextResponse.json({ message: "Token generation failed" }, { status: 500 });
		}

		const response = NextResponse.json(
			{ message: "Fetched..." },
			{ status: 200 }
		);

		// Set secure HTTP-only cookie with token
		response.cookies.set("accessToken", accToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production", // Secure only in production
			maxAge: 60 * 60 * 24, // 1-day expiration, adjust as needed
			path: "/",
		});

		return response;

	} catch (error) {
		console.error("Error in POST handler:", error);
		return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
	}
}
