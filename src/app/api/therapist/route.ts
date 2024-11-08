import connectDb from "@/db";
import ApiResponse from "@/helper/ApiResponse";
import { SendMail } from "@/helper/SendMail";
import { verifyRole } from "@/helper/Tokens";
import uploadFile from "@/helper/UploadFiles";
import AuthModel from "@/schema/Auth";
import TherapistModel from "@/schema/Therapist";
import { NextRequest } from "next/server";
function generateCustomPassword(): string {
	const numbers = "0123456789";
	const lowercase = "abcdefghijklmnopqrstuvwxyz";
	const numberPart = Array.from(
		{ length: 2 },
		() => numbers[Math.floor(Math.random() * numbers.length)]
	).join("");
	const mixedPart = Array.from({ length: 8 }, () => {
		const chars = lowercase + numbers;
		return chars[Math.floor(Math.random() * chars.length)];
	}).join("");
	return `MP-${numberPart}${mixedPart}`;
}
export async function GET(req: NextRequest) {
	await connectDb();
	try {
		const Therapist = await TherapistModel.aggregate([
			{ $sort: { createdAt: -1 } },
		]);
		return ApiResponse.success({
			statusCode: 200,
			message: "Therapist fetched successfully",
			data: Therapist,
		});
	} catch (error: any) {
		return ApiResponse.error({ message: error.message });
	}
}
export async function POST(req: NextRequest) {
	await connectDb();
	const role = verifyRole(req);
	if (role !== 2) {
		return ApiResponse.error({ message: "Unauthorized" });
	}
	try {
		const formData = await req.formData();
		const file = formData.get("image") as File;
		if (!file) {
			throw new Error("Image file is required");
		}
		const fileBuffer = Buffer.from(await file.arrayBuffer());

		const path = "therapistImages";
		const { fileURL, error } = await uploadFile(fileBuffer, path);

		if (error) {
			throw new Error("Failed to upload image to Firebase Storage");
		}
		console.log(formData);
		const name = formData.get("name")?.toString() || "";
		const qualification = formData.get("qualification")?.toString() || "";
		const experience = parseInt(
			formData.get("experience")?.toString() || "0",
			10
		);
		const speciality = formData.get("speciality")?.toString() || "";
		const email = formData.get("email")?.toString() || "";
		const contactNo = formData.get("contactNo")?.toString() || "";
		const timing = {
			from: formData.get("timing[from]")?.toString() || "",
			to: formData.get("timing[to]")?.toString() || "",
		};
		const days = formData.getAll("days[]").map((day) => day.toString());

		const clinicLocation = formData.get("clinicLocation")?.toString() || "";
		const charges = parseFloat(formData.get("charges")?.toString() || "0");
		console.log(days);

		const Therapist = await TherapistModel.create({
			name,
			qualification,
			experience,
			speciality,
			email,
			contactNo,
			timing,
			days,
			clinicLocation,
			charges,
			image: fileURL,
		});

		const password = generateCustomPassword();

		await AuthModel.create({
			email,
			password,
			provider: "email",
			avatar: fileURL,
			role: 1,
		});
		SendMail<string>({
			type: "newTherapist",
			data: password,
			recipientEmail: email,
		});
		return ApiResponse.success({
			statusCode: 200,
			message: "success",
			data: Therapist,
		});
	} catch (error: any) {
		if (error.code === 11000) {
			console.log(`Duplicate key error: ${error.message}`);
			return ApiResponse.error({ message: "This email is already in use." });
		} else {
			console.log(error);
			return ApiResponse.error({ message: error.message });
		}
	}
}

export async function PUT(req: NextRequest) {
	await connectDb();
	const role = verifyRole(req);
	if (role !== 2) {
		return ApiResponse.error({ message: "Unauthorized" });
	}
	try {
		const body = await req.json();
		const url = new URL(req.url);
		const id = url.searchParams.get("id");
		if (!id) {
			return ApiResponse.error({
				message: "Therapist id is required",
				statusCode: 400,
			});
		}
		const Therapist = await TherapistModel.findByIdAndUpdate(id, body, {
			new: true,
		});
		return ApiResponse.success({
			statusCode: 200,
			message: "success",
			data: Therapist,
		});
	} catch (error: any) {
		return ApiResponse.error({ message: error.message });
	}
}

export async function DELETE(req: NextRequest) {
	await connectDb();
	const role = verifyRole(req);
	if (role !== 2) {
		return ApiResponse.error({ message: "Unauthorized" });
	}
	return ApiResponse.success({
		statusCode: 200,
		message: "success",
		data: {},
	});
	try {
		const url = new URL(req.url);
		const id = url.searchParams.get("id");
		const Therapist = await TherapistModel.findByIdAndDelete(id);
		return ApiResponse.success({
			statusCode: 200,
			message: "success",
			data: Therapist,
		});
	} catch (error: any) {
		return ApiResponse.error({ message: error.message });
	}
}
