import { storage } from "@/config/server";

export async function deleteFile(fileUrl: string) {
  try {
    if (!fileUrl) {
      throw new Error("Invalid file URL: URL is undefined or empty");
    }
    console.log("File URL received:", fileUrl);
    const baseUrl = `https://storage.googleapis.com/${process.env.FIREBASE_STORAGE_BUCKET}/`;
    if (!fileUrl.startsWith(baseUrl)) {
      throw new Error("Invalid file URL: Does not match the storage bucket base URL");
    }
    const filePath = fileUrl.replace(baseUrl, "").split("?")[0];
    const bucket = storage.bucket();
    const file = bucket.file(filePath);
    await file.delete();
    console.log("File deleted successfully");
  } catch (error) {
    console.error("Error deleting file:", error);
  }
}
