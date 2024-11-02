import mongoose from "mongoose";
import AuthModel from "@/schema/Auth";
import GenrateTokens,{cookieResponse} from "@/helper/GenrateTokens";
import connectDb from "@/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	await connectDb();
	try {
		const body = await req.json();
		const { email, password, provider="email" } = body;

		// Check if the user already exists
		const existingUser = await AuthModel.findOne({ email, provider });
			
			if (existingUser&&provider==="email") {
				return NextResponse.json({ message: "User already exists" }, { status: 409 });
			}
			else if (existingUser&&provider==="google") {
				return cookieResponse(existingUser as any);
			}
			// Create new user (password hashing handled by Mongoose middleware)
			const newUser = new AuthModel({
				email,
				password,  // Password will be hashed automatically by the Mongoose middleware
				provider,
			});
			await newUser.save();

		return cookieResponse(newUser as any);

	} catch (error) {
		console.error("Error in register handler:", error);
		return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
	}
}
