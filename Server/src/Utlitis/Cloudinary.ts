import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export default cloudinary;

export const uploadCloud: Function = async (buffer: Buffer, filename: string) => {
    try {
      const base64String = buffer.toString('base64');
        const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64String}`, {
        folder: "Profile",
        public_id: filename,
      });
  
      return result.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      return null;
    }
  };
