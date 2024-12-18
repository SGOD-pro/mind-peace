import connectDb from "@/db";
import ApiResponse from "@/helper/ApiResponse";
import FeedbackModel from "@/models/Feedback";
import mongoose, { PipelineStage } from "mongoose";

export async function POST(req: Request) {
	await connectDb();
	try {
		const body = await req.json();
		// NOTE: check if the id is present in feedback model then update else create new
		const url=new URL(req.url)
		const id = url.searchParams.get("id");
		if (id && mongoose.Types.ObjectId.isValid(id)) {
			const Feedback = await FeedbackModel.findByIdAndUpdate(id, body, {
				new: true,
			});
			return ApiResponse.success({
				statusCode: 200,
				message: "Feedback updated successfully",
				data: Feedback,
			});
		}
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
		
		//NOTE: verify the token and the get the role if the role is 0 fetch by userid if 1 fetch by doctorid if 2 fetch all because its admin.

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
