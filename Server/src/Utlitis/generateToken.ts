import jwt from "jsonwebtoken";
import "dotenv/config";

const generateToken = (student_id: string) => {
  const token = jwt.sign({ student_id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
  console.log("token", token);
  
  return token;
};

export default generateToken;