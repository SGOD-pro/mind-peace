import uploadFile from "@/helper/UploadFiles";
import AuthModel from "@/models/Auth";
import connectDb from "@/db";
import ApiResponse from "@/helper/ApiResponse";
import { NextRequest } from "next/server";
import { verifyAccessToken } from "@/helper/Tokens";
import { deleteFile } from "@/helper/DeletefromStorage";

export async function POST(req: NextRequest) {
	await connectDb();
	try {
		const token = req.cookies.get("accessToken")?.value;
		if (!token) {
			return ApiResponse.error({
				message: "Unauthorize Request",
				statusCode: 409,
			});
		}
		const res = await verifyAccessToken(token);
		if (!res) {
			return ApiResponse.error({
				message: "Invalid credentials",
				statusCode: 405,
			});
		}
		const body = await req.formData();
		const file = body.get("file") as File;
		const fileBuffer = Buffer.from(await file.arrayBuffer());
		console.log(res._id)
		const user = await AuthModel.findById(res._id).select(
			"-refreshToken -password"
		);
		if (!user) {
			return ApiResponse.error({ message: "User not found" });
		}
		if (user.avatar) {
			await deleteFile(user.avatar);
		}
		const { fileURL, error } = await uploadFile(fileBuffer, "therapistImages");
		if (error) {
			return ApiResponse.error({
				message: "Cannot update the picture",
				statusCode: 401,
			});
		}
		user.avatar = fileURL;
		await user.save();
		if (fileURL) {
			user.avatar = fileURL;
			await user.save();
		}
		return ApiResponse.success({
			data: user,
			message: "Picture Updated.",
		});
	} catch (error) {
		console.log(error);
		if (error instanceof Error) {
			return ApiResponse.error({ message: error.message });
		}
		return ApiResponse.error({ message: "An unknown error occurred." });
	}
}
