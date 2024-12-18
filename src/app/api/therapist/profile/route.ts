import connectDb from "@/db";
import ApiResponse from "@/helper/ApiResponse";
import { verifyAccessToken } from "@/helper/Tokens";
import TherapistModel from "@/models/Therapist";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
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
		if (!res || res.role !== 1) {
			return ApiResponse.error({
				message: "Invalid credentials",
				statusCode: 405,
			});
		}
		const id = res._id;
		if (!id) {
			return ApiResponse.error({ message: "Id not found", statusCode: 409 });
		}
		const Therapist = await TherapistModel.findById(id);
		return ApiResponse.success({
			data: Therapist,
			message: "Therapist found",
		});
	} catch (error) {
		if (error instanceof Error) {
			return ApiResponse.error({ message: error.message });
		}
		return ApiResponse.error({ message: "An unknown error occurred." });
	}
}
