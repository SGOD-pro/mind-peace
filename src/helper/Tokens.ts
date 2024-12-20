import { NextResponse } from "next/server";
import AuthModel from "@/models/Auth";
import { options } from "@/constants";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthSchemaInterface } from "@/models/Auth";
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
		console.log(error);
		throw new Error("Something went wrong during token generation");
	}
};

export async function cookieResponse(user: AuthSchemaInterface) {
	const { accToken, refreshToken } = await generateTokens(user.id);
	if (!accToken || !refreshToken) {
		return NextResponse.json(
			{ message: "Token generation failed" },
			{ status: 500 }
		);
	}

	const response = NextResponse.json(
		{
			message:
				user.provider === "google"
					? "Google login successful"
					: "Registration successful",
			data: {
				email: user.email,
				avatar: user.avatar,
				provider: user.provider,
				role: user.role,
				_id: user._id,
			},
			success: true,
		},
		{ status: 201 }
	);

	response.cookies.set("accessToken", accToken, options);
	response.cookies.set("refreshToken", refreshToken, {
		...options,
		maxAge: 60 * 60 * 24 * 7,
	});
	return response;
}

export const verifyAccessToken = async (
	token: string
): Promise<AccessTokenPayload | null> => {
	try {
		return (await jwt.verify(token, process.env.ACCESS_TOKEN!)) as AccessTokenPayload;
	} catch (error) {
		console.log(error);
		return null;
	}
};
import { NextRequest } from "next/server";

export const verifyRole = (req: NextRequest): number | null => {
	const token = req.cookies.get("accessToken")?.value;
	if (!token) {
		return null;
	}

	try {
		const payload = jwt.verify(token, process.env.ACCESS_TOKEN!) as JwtPayload;
		return payload.role;
	} catch (error) {
		console.log(error);
		return null;
	}
};
