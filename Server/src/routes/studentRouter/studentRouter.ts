import express from "express";
const studentRouter = express.Router();

import{studentRegistration,
       studentLogin,verifyOtp, 
       resendOtp, 
       forgotPassword, 
       verifyForgotPassword, 
       newPassword,
       otpExpiry,
       studentLogout,
       GoogleAuthentication
    } from "../../controller/studentController/studentController";


studentRouter.get("/",(req,res)=>{
    res.json({status:true})
})

studentRouter.post("/register", studentRegistration);
studentRouter.post("/login",studentLogin);
studentRouter.post("/otp",verifyOtp);
studentRouter.get("/resendotp",resendOtp);
studentRouter.get("/otpExpiry",otpExpiry);
studentRouter.get("/firebaseAuthVerify", GoogleAuthentication);
studentRouter.post("/forgotpassword",forgotPassword);
studentRouter.post("/verifyforgototp",verifyForgotPassword);
studentRouter.post("/newpassword",newPassword);
studentRouter.post("/logout",studentLogout);


export {studentRouter}