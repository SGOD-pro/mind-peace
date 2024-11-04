import connectDb from "@/db";
import ApiResponse from "@/helper/ApiResponse";
import TherapistModel from "@/schema/Therapist";
import { NextRequest } from "next/server";

export async function GET(_: NextRequest) {
	await connectDb();
	try {
		const Therapist = await TherapistModel.aggregate([
			{ $sort: { createdAt: -1 } },
		]);
		return ApiResponse.success({
			statusCode: 200,
			message: "success",
			data: Therapist,
		});
	} catch (error: any) {
		return ApiResponse.error({ message: error.message });
	}
}
