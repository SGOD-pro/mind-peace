import ApiResponse from "@/helper/ApiResponse";



export async function GET() {
    try {
        // throw new Error("This is a error response")
        return ApiResponse.success({data: "OK",message:"Every thing was fine",statusCode:202});
    } catch (error:any) {
        return ApiResponse.error({message:error.message,statusCode:500});
    }

}