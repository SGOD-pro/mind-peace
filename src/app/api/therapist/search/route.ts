import connectDb from "@/db";
import ApiResponse from "@/helper/ApiResponse";

import TherapistModel from "@/models/Therapist";
import mongoose from "mongoose";
import jwt, { JwtPayload } from "jsonwebtoken";
import Appointment from "@/models/Appointment";
import { NextRequest } from "next/server";
export async function GET(req: NextRequest) {
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
		const token=req.cookies.get("accessToken")?.value;
		if(!token){
			return ApiResponse.error({ message: "Not authenticated", statusCode: 409 });
		}
		const data=(await jwt.verify(token,process.env.ACCESS_TOKEN!))as JwtPayload;
		if(!data||!data._id){
			return ApiResponse.error({ message: "Not authenticated", statusCode: 409 });
		}
		const isPending=await Appointment.aggregate([
			{
				$match: {
					therapistId: new mongoose.Types.ObjectId(id),
					status:"PENDING",
					userId:new mongoose.Types.ObjectId(data._id),
					date:{$gte:new Date()}
				}
			}
		])
		if (!Therapist[0]) {
			return ApiResponse.error({ message: "Therapist not found", statusCode: 404 });
		}
		console.log(isPending)
		return ApiResponse.success({
			statusCode: 200,
			message: "Therapist found successfully",
			data: {therapist:Therapist[0],isPending:isPending.length>0},
		});
	} catch (error) {
		if (error instanceof Error) {
			return ApiResponse.error({ message: error.message });
		}
		return ApiResponse.error({ message: "An unknown error occurred." });
	}
}
