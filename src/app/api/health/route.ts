import { storage } from "@/config/server";
import ApiResponse from "@/helper/ApiResponse";
// import { SendMail } from "@/helper/SendMail";

// const user = { name: "John Doe", age: 30,password:"123456" };
// const email = "karmakarsouvik17@gmail.com";


export async function GET() {
    try {
        try {
            const bucket = storage.bucket();
            console.log("Bucket name:", bucket.name);
            const [files] = await bucket.getFiles();
            console.log("Files in bucket:", files.map((file) => file.name));
          } catch (error) {
            console.error("Error accessing bucket:", error);
          }
        return ApiResponse.success({data: "OK",message:"Every thing was fine",statusCode:202});
    } catch (error) {
        return ApiResponse.error({message:"Error",statusCode:500});
    }
}