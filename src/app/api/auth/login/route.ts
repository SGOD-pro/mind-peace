import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import AuthModel from "@/schema/Auth";
import GenrateTokens, { cookieResponse } from "@/helper/GenrateTokens";
import connectDb from "@/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	await connectDb();
	try {
		const body = await req.json();
		const { email, password, provider } = body;

		const user = await AuthModel.findOne({ email, provider }).select(
			"-password -refreshToken"
		);
		
		if (!user) {
			return NextResponse.json({ message: "User not found" }, { status: 404 });
		}

		if (user.provider === "google") {
			return cookieResponse(user as any);
		}

		const isPasswordValid = await user.isPasswordCorrect(password);
		if (!isPasswordValid) {
			return NextResponse.json(
				{ message: "Invalid credentials" },
				{ status: 401 }
			);
		}

		return cookieResponse(user as any);
	} catch (error) {
		console.error("Error in POST handler:", error);
		return NextResponse.json(
			{ message: "Something went wrong" },
			{ status: 500 }
		);
	}
}
