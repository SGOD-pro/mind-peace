import connectDb from "@/db";
import AuthModel from "@/schema/Auth";
import { NextRequest, NextResponse } from "next/server";
import { cookieResponse } from "@/helper/Tokens";

export async function POST(req: NextRequest) {
	await connectDb();
	try {
		const body = await req.json();
		const { email, password, provider = "email",avatar } = body;

		// Check if the user already exists
		const existingUser = await AuthModel.findOne({ email, provider });

		if (existingUser && provider === "email") {
			return NextResponse.json(
				{ message: "User already exists" },
				{ status: 409 }
			);
		} else if (existingUser && provider === "google") {
			const res = await cookieResponse(existingUser);
			return res;
		}
		const newUser = new AuthModel({
			email,
			password,
			provider,
			avatar,
		});
		await newUser.save();

		const res = await cookieResponse(newUser);
		return res;
	} catch (error) {
		console.error("Error in register handler:", error);
		return NextResponse.json(
			{ message: "Something went wrong" },
			{ status: 500 }
		);
	}
}
