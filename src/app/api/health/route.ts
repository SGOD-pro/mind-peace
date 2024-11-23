import ApiResponse from "@/helper/ApiResponse";
// import { SendMail } from "@/helper/SendMail";

// const user = { name: "John Doe", age: 30,password:"123456" };
// const email = "karmakarsouvik17@gmail.com";


export async function GET() {
    try {
        // await SendMail<typeof user>({
		// 	type: "newTherapist",
		// 	data: user,
		// 	recipientEmail: email,
		// });
        return ApiResponse.success({data: "OK",message:"Every thing was fine",statusCode:202});
    } catch (error) {
        return ApiResponse.error({message:"Error",statusCode:500});
    }

}