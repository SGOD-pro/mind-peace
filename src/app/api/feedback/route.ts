import connectDb from "@/db";
import ApiResponse from "@/helper/ApiResponse";
import FeedbackModel from "@/schema/Feedback";
import mongoose, { PipelineStage } from "mongoose";

export async function POST(req: Request) {
	await connectDb();
	try {
		const body = await req.json();
		const Feedback = await FeedbackModel.create(body);
		return ApiResponse.success({
			statusCode: 200,
			message: "Feedback added successfully",
			data: Feedback,
		});
	} catch (error) {
		if (error instanceof Error)
			return ApiResponse.error({ message: error.message });
		return ApiResponse.error({ message: "An unknown error occurred." });
	}
}
export async function GET(req: Request) {
	await connectDb();
	try {
		const url = new URL(req.url);
		const id = url.searchParams.get("id");
		const pipeline: PipelineStage[] = [];
		if (id && mongoose.Types.ObjectId.isValid(id)) {
			pipeline.push({
				$match: { doctorId: new mongoose.Types.ObjectId(id) },
			});
		}

		pipeline.push({
			$sort: {
				createdAt: -1,
			},
		});
		const Feedback = await FeedbackModel.aggregate(pipeline);
		return ApiResponse.success({
			statusCode: 200,
			message: "Feedback found successfully",
			data: Feedback,
		});
	} catch (error) {
		if (error instanceof Error) {
			return ApiResponse.error({ message: error.message });
		}
		return ApiResponse.error({ message: "An unknown error occurred." });
	}
}
