import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Student from "../models/studentModel"
import dotenv from "dotenv";
import { Document } from "mongoose";
dotenv.config();


interface StudentData {
    _id: string;
    studentname: string;
    student: any | null;
}


declare global{
    namespace Express{
        interface Request{
            student?:StudentData;
        }
    }
}


const protect = asyncHandler(
    async(req:Request, res:Response, next:NextFunction) =>{
        const token = req.headers.authorization?.split("")[1];
        const JWT_SECRET = process.env.JWT_SECRET as string;

        if(token)
        {
            try {
                const verifiedToken = jwt.verify(token,JWT_SECRET) as JwtPayload;

                const studentId: string = verifiedToken.student_id;

                const student: Document | null = await Student.findById(studentId).select("-password");
                
                if(student){
                    req.student = student as unknown as StudentData;
                    next();
                }
                else{
                    res.status(404);
                    throw new Error("Student not found");
                }
            } catch (error) {
                res.status(401);
                throw new Error("Not authorized, invalid token");
            }
        }

        if(!token)
        {
            res.status(401);
        }

    
    }
);

export {protect};



