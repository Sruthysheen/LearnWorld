import {Request, Response}  from "express";
import bcrypt from 'bcryptjs';
import generateToken from "../../Utlitis/generateToken";
import "dotenv/config";
import Student from "../../models/studentModel";
import {sendMail} from "../../middleware/otpMail";


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
        return res.status(200).json({
            _id: addStudent?._id,
            name: addStudent?.studentname,
            email: addStudent?.studentemail,
            phone: addStudent?.phone,
            isBlocked:addStudent.isBlocked,
            token,
        });
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
            return res.json({
                _id:student._id,
                name:student.studentname,
                email:student.studentemail,
                phone:student.phone,
                isBlocked:student.isBlocked,
                token,
            });
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
  
        res.send({ userExist: true, token });
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
    GoogleAuthentication
}