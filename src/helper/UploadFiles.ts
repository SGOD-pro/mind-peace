import { storage } from "@/config/server"; 
import { v4 as uuidv4 } from "uuid"; 

async function uploadFile(
  file: Buffer, 
  path: string 
): Promise<{ fileURL: string; error?: Error }> {
  const uniqueFilename = `IMG-${uuidv4()}-${Date.now()}`;

  const bucket = storage.bucket();

  const fileRef = bucket.file(`${path}/${uniqueFilename}`);

  try {
    await fileRef.save(file, { contentType: "image/jpeg" }); 
    console.log("Uploaded a file!");
    const downloadURL = await fileRef.getSignedUrl({
      action: "read",
      expires: "03-09-2491", 
    });

    console.log("File available at", downloadURL[0]);
    return { fileURL: downloadURL[0] };
  } catch (error) {
    console.error("Error uploading file:", error);
    return { fileURL: "", error: error as Error };
  }
}

export default uploadFile;