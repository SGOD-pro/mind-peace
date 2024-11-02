import { NextResponse } from "next/server";
import AuthModel from "@/schema/Auth";

export const generateTokens = async (
	userId: string
): Promise<{ accToken: string; refreshToken: string }> => {
	try {
		const user = await AuthModel.findById(userId);
		if (!user) {
			throw new Error("User not found");
		}
		const accToken = user.generateAccessToken();
		const refreshToken = user.generateRefreshToken();
		user.refreshToken = refreshToken;
		await user.save({ validateBeforeSave: false });
		return { accToken, refreshToken };
	} catch (error) {
		throw new Error("Something went wrong during token generation");
	}
};

export async function cookieResponse(user: any) {
	const { accToken } = await generateTokens(user._id);
	if (!accToken) {
		return NextResponse.json(
			{ message: "Token generation failed" },
			{ status: 500 }
		);
	}

	const response = NextResponse.json(
		{ message: "Registration successful", data: user,success:true },
		{ status: 201 }
	);

	// Set cookie on the response and return it
	response.cookies.set("accessToken", accToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		maxAge: 60 * 60 * 24, // 1 day in seconds
		path: "/",
	});

	return response;
}
