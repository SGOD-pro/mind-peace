import connectDb from "@/db";
import ApiResponse from "@/helper/ApiResponse";
import AppointmentModel from "@/schema/Appointment";
import mongoose from "mongoose";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest } from "next/server";
import { getNextDayDate } from "@/helper/DateTime";
import TherapistModel from "@/schema/Therapist";
import { SendMail } from "@/helper/SendMail";

const generateAppointmentId = (lastId: string | null) => {
	const prefix = "MP";
	const defaultId = 1;

	if (!lastId) {
		return `${prefix}${defaultId.toString().padStart(4, "0")}`;
	}
	const numericPart = parseInt(lastId.replace(prefix, ""), 10);

	const newNumericPart = numericPart + 1;
	return `${prefix}${newNumericPart.toString().padStart(4, "0")}`;
};
export async function POST(req: NextRequest) {
	await connectDb();
	try {
		const { name, age, therapistId } = await req.json();
		const token = req.cookies.get("accessToken")?.value;
		if (!token) {
			return ApiResponse.error({
				message: "Not authenticated",
				statusCode: 409,
			});
		}
		const data = (await jwt.verify(
			token,
			process.env.ACCESS_TOKEN!
		)) as JwtPayload;
		if (!name || !age || !mongoose.Types.ObjectId.isValid(therapistId)) {
			return ApiResponse.error({
				message: "All fields are required",
				statusCode: 402,
			});
		}
		const Therapist = await TherapistModel.findById(therapistId);
		if (!Therapist) {
			return ApiResponse.error({
				message: "Therapist not found",
				statusCode: 409,
			});
		}
		const date = getNextDayDate(Therapist.days);
		const existingBookings = await AppointmentModel.aggregate([
			{
				$match: {
					therapistId: new mongoose.Types.ObjectId(therapistId),
					date: date,
				},
			},
			{ $sort: { createdAt: -1 } },
		]);
		const body = {
			name,
			age,
			therapistId,
			userId: data._id,
			date,
			status: "PENDING",
			appointmentId: generateAppointmentId(
				existingBookings[0].appointmentId || null
			),
		};

		const Appointment = await AppointmentModel.create(body);
		return ApiResponse.success({
			statusCode: 200,
			message: "Appointment added successfully",
			data: Appointment,
		});
	} catch (error) {
		if (error instanceof Error) {
			return ApiResponse.error({ message: error.message });
		}
		return ApiResponse.error({ message: "An unknown error occurred." });
	}
}
