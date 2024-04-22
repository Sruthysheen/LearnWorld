import express from "express";
const tutorRouter = express.Router();

import{tutorRegistration,tutorLogin,verifyOtp, tutorResendOtp, tutorOtpExpiry, tutorForgotPassword, verifyForgotOTP, tutorNewPassword, tutorGoogleAuthentication, editProfile, tutorLogout, addCourses, getAlltutorCourse, editCourse} from "../../controller/tutorController/tutorController";
import multer from "multer";
import { protect } from "../../middleware/tutorMiddleware";

const storage = multer.memoryStorage()
const upload = multer({storage:storage})

tutorRouter.get("/",(req,res)=>{
    res.json({status:true})
})

tutorRouter.post("/tutorregister", tutorRegistration);
tutorRouter.post("/tutorlogin",tutorLogin);
tutorRouter.get("/firebaseAuthVerify",tutorGoogleAuthentication);
tutorRouter.post("/tutorotp",verifyOtp);
tutorRouter.get("/resendotp",tutorResendOtp);
tutorRouter.get("/otpExpiry",tutorOtpExpiry);
tutorRouter.post("/tutorforgotpassword",tutorForgotPassword);
tutorRouter.post("/verifyforgototptutor",verifyForgotOTP);
tutorRouter.post("/tutornewpassword",tutorNewPassword);
tutorRouter.post("/edit-profile", protect, upload.single('image'), editProfile);
tutorRouter.post("/tutorlogout", tutorLogout);
tutorRouter.post("/addnewcourse", protect, upload.single('image'), addCourses);
tutorRouter.get("/getallcourse/:id", getAlltutorCourse);
tutorRouter.post("/editcourse/:id", protect, upload.single('image'), editCourse);



export {tutorRouter}