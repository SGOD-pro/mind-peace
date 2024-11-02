import AuthModel from "@/schema/Auth";
import { NextResponse } from "next/server";
const generateTokens = async (
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
		await user?.save({ validateBeforeSave: false });
		return { accToken, refreshToken };
	} catch (error) {
		throw new Error("Something went wrong");
	}
};
export async function cookieResponse(user: UserWithId) {
	const { accToken } = await generateTokens(user.id as string);
	if (!accToken) {
		return NextResponse.json(
			{ message: "Token generation failed" },
			{ status: 500 }
		);
	}
	const response = NextResponse.json(
		{ message: "Registration successful", data: user },
		{ status: 201 }
	);

	return response.cookies.set("accessToken", accToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		maxAge: 60 * 60 * 24, 
		path: "/",
	});
}
export default generateTokens;
