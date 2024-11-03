import { NextResponse } from "next/server";
import AuthModel from "@/schema/Auth";
import { options } from "@/constants";

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
	const { accToken, refreshToken } = await generateTokens(user._id);
	if (!accToken) {
		return NextResponse.json(
			{ message: "Token generation failed" },
			{ status: 500 }
		);
	}

	const response = NextResponse.json(
		{ message: "Registration successful", data: user, success: true },
		{ status: 201 }
	);

	response.cookies.set("accessToken", accToken, options);
	response.cookies.set("refreshToken", refreshToken, options);
	return response;
}
