import mongoose from "mongoose";
import AuthModel from "@/schema/Auth";
import GenrateTokens from "@/helper/GenrateTokens";
import connectDb from "@/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	await connectDb();
	try {
		const body = await req.json();
		const { email, password, provider="email" } = body;

		// Check if the user already exists
		const existingUser = await AuthModel.findOne({ email, provider });
		if (existingUser) {
			return NextResponse.json({ message: "User already exists" }, { status: 409 });
		}

		// Create new user (password hashing handled by Mongoose middleware)
		const newUser = new AuthModel({
			email,
			password,  // Password will be hashed automatically by the Mongoose middleware
			provider,
		});
		await newUser.save();

		// Generate JWT token
		const { accToken } = await GenrateTokens(newUser._id as string);
		if (!accToken) {
			return NextResponse.json({ message: "Token generation failed" }, { status: 500 });
		}

		// Prepare response and set cookie
		const response = NextResponse.json(
			{ message: "Registration successful" },
			{ status: 201 }
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
		console.error("Error in register handler:", error);
		return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
	}
}
