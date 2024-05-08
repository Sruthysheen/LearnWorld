import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import generateToken from "../../Utlitis/generateToken";
import "dotenv/config";
import Student from "../../models/studentModel";
import {sendMail} from "../../middleware/otpMail";
import Course from "../../models/courseModel";
import Category from "../../models/categoryModel";
import CartModel from '../../models/cartModel';
import WishListModel from '../../models/wishlistModel';
import { uploadCloud} from "../../Utlitis/Cloudinary";
import { protect } from '../../middleware/authMiddleware';





const appState = {
    otp: null as null | number,
    student: null as null | {
    studentname: string;
    studentemail: string;
    phone: string;
    password: string;

},
};




const studentRegistration = async (req: Request, res: Response) => {
    try {
        const {studentname,studentemail,phone,password} = req.body;
            console.log(req.body,"..................")

            if(!studentname || !studentemail || !phone || !password ) {
                return res.status(400).json({ message: " Fill all the fields "});
            }
        
            const studentExist = await Student.findOne( {studentemail});
            if(studentExist)
            {
                return res.status(400).json({message: "Student already exist"});
            }

            const student = {
                studentname,
                studentemail,
                phone,
                password,
            };
            appState.student = student;

            req.session.student =  student;
            
            
            
            if(student) {
                const mail = sendMail(student.studentemail, res);
               
                console.log(mail,'_______');
                
                req.session.otp = mail;
                 
            
            } else {
                return res.status(400).json({message: "Invalid user data"});
            }

    } catch (error) {
        return res.status(500).json({message : "Error occured"});
    }
};


const verifyOtp = async(req: Request, res: Response) =>{
    try {
       const {otp} = req.body; 
       console.log(otp)
       if(otp==req.session.otp)
       {
        const data=req.session.student
        const addStudent = await Student.create(data);
        const token = generateToken(addStudent._id);

        const datas={
            _id: addStudent?._id,
            name: addStudent?.studentname,
            email: addStudent?.studentemail,
            phone: addStudent?.phone,
            isBlocked:addStudent.isBlocked,
            token,
        }
        return res.status(200).json({
            response:datas,
            token:token
        })
       } else {
        res.status(500).json({message:"Invalid OTP"});
       }
    } catch (error) {
        res.status(400).json({message:"Something went wrong"});
        
    }
}


const otpExpiry=async(req:Request,res:Response)=>{
console.log('here');

    req.session.otp = null
    res.status(200).json({message:"OTP expired please click the resend button "})
}




const studentLogin = async(req: Request, res: Response) =>{
      const {studentemail,password} = req.body;
    
    try {
        
        const student = await Student.findOne({studentemail}).where({isBlocked:false})
        if(!student){
            return res.status(401).json({message:"Student is not existed"});
        }
        if(student?.isBlocked == true)
        {
            return res.status(401).json({message:"Student is blocked"})
        }
        if(student){
        const passwordMatch= await student.matchPassword(password);
        if(passwordMatch)
        {
            const token = generateToken(student._id);
            return res.json({response:student,token:token});
        } 
    } else {
        return res.status(401).json({message:"Invalid email or password"})
    }
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }
}




const resendOtp = async (req: Request, res: Response) => {
    try {
       

      const email=req.session.student.studentemail

        const otp = sendMail(email, res);
        req.session.otp = otp;

        return res.status(200).json({ message: "OTP resent successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};


const GoogleAuthentication = async (req: Request, res: Response) => {
    const inComingEmailForVerification = req.query.email;
    console.log(inComingEmailForVerification, "incoming email");
    const userExists = await Student.findOne({
      studentemail: inComingEmailForVerification,
    });
    if (userExists) {
      res.send({ userExist: true });
    } else {
      const us = {
        studentemail: inComingEmailForVerification,
      };
     const user=new Student({
        studentemail:inComingEmailForVerification
     })
     const response=await user.save() 
      if (response) {
        const token = generateToken(response._id);
        console.log("hiiiii");
  
        res.send({ userExist: true, token, response });
      }
    }
  };


// const forgetData = {
//     otp: null as null | number,
// };

const forgotPassword = async (req: Request, res: Response) =>{
    try {
        const {studentemail} = req.body;
        console.log(studentemail);
        if (!req.session.student) {
            req.session.student = {
                studentname: '',
                studentemail: '',
                phone: '',
                password: ''
            };
        }
        req.session.student.studentemail=studentemail;
        
        const studentExists = await Student.findOne({studentemail});
        if(studentExists) {
            const otpReceived= sendMail(studentemail,res);
            console.log(otpReceived,"...............................");
            req.session.otp = otpReceived; 

            res.status(200).json({message:"Email sent successfully"});
        }
        else {
            return res.status(400).json({message: "No user exists"});
        }
    } catch (error) {
        console.log(error)
    }
};





const verifyForgotPassword = async(req: Request, res: Response) =>{
    try {
        const {otp} = req.body;
        console.log(otp,",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,")
        console.log(req.session.otp,"+++++++++++++++");
        
        if(otp == req.session.otp) {
            return res.status(200).json({message: "Success"});
        }
        else {
            return res.status(400).json({message: "Please correct password"});
        }
    } catch (error) {
        console.log(error);
    }
}





const newPassword = async (req: Request, res: Response) => {
    try {
        const {newPassword} = req.body;
        console.log(newPassword,"----------------------------------");
        
        const studentemail = req.session.student.studentemail;
        console.log(studentemail,"............................");
        
        const user = await Student.findOne({ studentemail: studentemail });
        
        if (!user) {
            return res.status(404).send({
                message: `Cannot find user with email: ${studentemail}.`,
            });
        }

        const saltRounds = 10;

        const hash = await bcrypt.hash(newPassword, saltRounds);
        try {
            await Student.findOneAndUpdate({ studentemail: studentemail }, { password: hash });
            res.status(200).send({
                message: "Successfully updated password.",
            });
        } catch (err) {
            res.status(500).send({
                message: "Error updating user information.",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "An error occurred.",
        });
    }
};


const getAllCourses = async (req: Request, res: Response) => {
    try {
      const courseDetails = await Course.find().populate('category').populate('tutor').exec();
      if (courseDetails.length > 0) {
        return res.status(200).json({ courseDetails });
      } else {
        return res.status(404).json({ message: "There are no courses" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
  
  const addToCart = async(req:Request, res:Response)=>{
    try {
        const { studentId, courseId } = req.body; 
        const cartItemExisted = await CartModel.findOne({student:studentId,course:courseId})
        if(cartItemExisted){
            return res.status(400).json({message:"Course already existed in cart"})
        } 
        else{
            const newCartItem = new CartModel({student:studentId,course:courseId});
            await newCartItem.save();
            return res.status(200).json({message:"Course added to cart successfully"})
        }
    } catch (error) {
        console.error("Error Occur while Adding to cart", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

  }

const getCartItems = async(req:Request, res:Response) =>{
    const studentId = req.params.studentId;
    console.log(studentId,"........................");
    
    try {
        const cartItems = await CartModel.find({ student: studentId }).populate("course");
    console.log(cartItems, "items");

    res.status(200).json(cartItems);
    } catch (error) {
        console.error("Error fetching cart Items", error);
        res.status(500).json({ error: "Internal server Error" });
    }
}


const removeCartItem = async(req:Request,res:Response)=>{
    try {
        const cartItemId = req.params.cartItemId;
        const removedItem = await CartModel.findByIdAndDelete({_id:cartItemId})
        if (!removedItem) {
            return res.status(404).json({ error: "Cart item not found" });
          }
          res.status(200).json({ message: "Course removed from the cart" });
    } catch (error) {
        console.error("Error removing course from cart", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const addToWishlist = async(req:Request, res:Response)=>{
    try {
        const { studentId, courseId } = req.body; 
        const itemExisted = await WishListModel.findOne({student:studentId,course:courseId})
        if(itemExisted){
            return res.status(400).json({message:"Course already existed in Wishlist"})
        } 
        else{
            const newItem = new WishListModel({student:studentId,course:courseId});
            await newItem.save();
            return res.status(200).json({message:"Course added to wishlist successfully"})
        }
    } catch (error) {
        console.error("Error Occur while Adding to wishlist", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


const  getWishlistItems = async(req:Request, res:Response)=>{
    const studentId = req.params.studentId;
    console.log(studentId,"........................");
    
    try {
        const wishlistItems = await WishListModel.find({ student: studentId }).populate("course");
    console.log(wishlistItems, "items");

    res.status(200).json(wishlistItems);
    } catch (error) {
        console.error("Error fetching cart Items", error);
        res.status(500).json({ error: "Internal server Error" });
    }
}



const removeWishlistItem = async(req:Request, res:Response)=>{
    try {
        const wishlistItemId = req.params.wishlistItemId;
        const removedItem = await WishListModel.findByIdAndDelete({_id:wishlistItemId})
        if (!removedItem) {
            return res.status(404).json({ error: "Wishlist item not found" });
          }
          res.status(200).json({ message: "Course removed from the wishlist" });
    } catch (error) {
        console.error("Error removing course from wishlist", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}



const StudentEditProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
        const studentId = req.student?._id;
        console.log(studentId);
        console.log(req.body,'==body ');
        console.log(req.file,'Filessss');
        
        
        
        const { studentname, studentemail, phone } = req.body; 
        if (req.file) {
            const file: Express.Multer.File = req.file;
            const buffer: Buffer = file.buffer;
            const imageUrl = await uploadCloud(buffer, file.originalname); 
  console.log(imageUrl,'URL ');
  
    
            const updatedStudent = await Student.findByIdAndUpdate(studentId, {
                studentname,
                studentemail,
                phone,
                photo: imageUrl, 
            },{new:true});
  
            if (updatedStudent) {
                res.status(200).json({ status: true ,data:updatedStudent});
            } else {
                res.status(404).json({ status: false, message: "Tutor not found" });
            }
        } else {
      
            const updatedStudent = await Student.findByIdAndUpdate(studentId, {
                studentname,
                studentemail,
                phone,
            },{new:true});
  
            if (updatedStudent) {
                res.status(200).json({ status: true,data:updatedStudent });
            } else {
                res.status(404).json({ status: false, message: "Student not found" });
            }
        }
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ status: false, message: "Failed to update profile" });
    }
  };



    const studentLogout = async(req:Request,res:Response)=>{
        try {
            res.status(200).json({message:"Logout successful"})
        } catch (error) {
            console.error("Logout Error:",error);
            res.status(500).json({message:"Internal server error"})
        }
    }





export {
    studentRegistration,
    studentLogin,
    verifyOtp,
    resendOtp,
    forgotPassword,
    verifyForgotPassword,
    newPassword,
    studentLogout,
    otpExpiry,
    GoogleAuthentication,
    getAllCourses,
    addToCart,
    getCartItems,
    removeCartItem,
    addToWishlist,
    getWishlistItems,
    removeWishlistItem,
    StudentEditProfile
}