import connectDb from "@/db";
import ApiResponse from "@/helper/ApiResponse";
import TherapistModel from "@/schema/Therapist";

export async function GET(req: Request) {
	await connectDb();
	try {
		const url = new URL(req.url);
		const id = url.searchParams.get("id");
		if (!id) {
			return ApiResponse.error({ message: "Id not found", statusCode: 409 });
		}
		const Therapist = await TherapistModel.findById(id);
		return ApiResponse.success({
			data: Therapist,
			message: "Therapist found.",
		});
	} catch (error) {
		if (error instanceof Error) {
			return ApiResponse.error({ message: error.message });
		}
		return ApiResponse.error({ message: "An unknown error occurred." });
	}
}
