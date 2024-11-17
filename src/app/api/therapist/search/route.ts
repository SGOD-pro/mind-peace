import connectDb from "@/db";
import ApiResponse from "@/helper/ApiResponse";

import TherapistModel from "@/schema/Therapist";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Appointment from "@/schema/Appointment";
export async function GET(req: Request) {
	await connectDb();
	try {
		const url = new URL(req.url);
		const id = url.searchParams.get("id");
		if (!id||!mongoose.Types.ObjectId.isValid(id)) {
			return ApiResponse.error({ message: "Id not found", statusCode: 409 });
		}
		const Therapist = await TherapistModel.aggregate([
			{
				$match: {
					_id: new mongoose.Types.ObjectId(id),
				},
			},
            {
                $addFields:{
                    days: {
						$reduce: {
							input: "$days",
							initialValue: "",
							in: { $concat: ["$$value", ", ", "$$this"] },
						},
					},
                }
            },
            {
                $addFields:{
                    days: {
						$cond: {
							if: { $eq: ["$days", ""] },
							then: "",
							else: {
								$substrCP: [
									"$days",
									2,
									{ $subtract: [{ $strLenCP: "$days" }, 1] },
								],
							},
						},
					},
                }
            },
            {
                $addFields: {
                    timing:{
                        $concat: ["$days","(","$timing.from", "-", "$timing.to",")"]
                    }
                }
            }
		]);
		if (!Therapist[0]) {
			return ApiResponse.error({ message: "Therapist not found", statusCode: 404 });
		}
		return ApiResponse.success({
			statusCode: 200,
			message: "Therapist found successfully",
			data: Therapist[0],
		});
	} catch (error: any) {
        console.log(error)
		return ApiResponse.error({ message: error.message });
	}
}
