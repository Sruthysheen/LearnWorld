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
       GoogleAuthentication,
       getAllCourses,
       addToCart,
       getCartItems,
       removeCartItem,
       addToWishlist,
       getWishlistItems,
       removeWishlistItem,
       StudentEditProfile
    } from "../../controller/studentController/studentController";
import { protect } from "../../middleware/authMiddleware";
import upload from "../../multer/upload";


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
studentRouter.get("/getcourses", getAllCourses);
studentRouter.post("/addtocart", addToCart);
studentRouter.get("/cart/:studentId", getCartItems);
studentRouter.delete("/removecartitem/:cartItemId", removeCartItem);
studentRouter.post("/addtowishlist",addToWishlist);
studentRouter.get("/wishlist/:studentId", getWishlistItems);
studentRouter.delete("/removeitem/:wishlistItemId", removeWishlistItem);
studentRouter.post("/editprofile", protect, upload.single('image'), StudentEditProfile);
studentRouter.post("/logout",studentLogout);


export {studentRouter}