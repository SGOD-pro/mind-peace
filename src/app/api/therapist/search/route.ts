import connectDb from "@/db";
import ApiResponse from "@/helper/ApiResponse";
import TherapistModel from "@/schema/Therapist";
async function GET(req: Request) {
    await connectDb();
    try {
        const url = new URL(req.url);
        const name = url.searchParams.get("name");
        const Therapist = await TherapistModel.find({ name: { $regex: name, $options: "i" } });
    }catch (error: any) {
        return ApiResponse.error({ message: error.message });
    }
}