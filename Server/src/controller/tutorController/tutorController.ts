import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import generateToken from "../../Utlitis/generateToken";
import "dotenv/config";
import Tutor from "../../models/tutorModel";
import { sendMail } from "../../middleware/otpMail";
import { uploadCloud } from "../../Utlitis/Cloudinary";

const appState = {
  otp: null as null | number,
  tutor: null as null | {
    tutorname: string;
    tutoremail: string;
    phone: string;
    password: string;
  },
};

const tutorRegistration = async (req: Request, res: Response) => {
  try {
    const { tutorname, tutoremail, phone, password } = req.body;

    if (!tutorname || !tutoremail || !phone || !password) {
      return res.status(400).json({ message: "Fill all the fields" });
    }

    const tutorExist = await Tutor.findOne({ tutoremail });
    if (tutorExist) {
      return res.status(400).json({ message: "Tutor already exists" });
    }

    const tutor = {
      tutorname,
      tutoremail,
      phone,
      password,
    };
    appState.tutor = tutor;

    req.session.tutor = tutor;

    if (tutor) {
      const mail = sendMail(tutor.tutoremail, res);
      req.session.otp = mail;
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error occurred" });
  }
};

const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { otp } = req.body;
    if (otp == req.session.otp) {
      const data = req.session.tutor;
      const addTutor = await Tutor.create(data);
      const token = generateToken(addTutor._id);
      return res.status(200).json({
        _id: addTutor?._id,
        name: addTutor?.tutorname,
        email: addTutor?.tutoremail,
        phone: addTutor?.phone,
        isBlocked: addTutor.isBlocked,
        token,
      });
    } else {
      res.status(500).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

const tutorLogin = async (req: Request, res: Response) => {
  const { tutoremail, password } = req.body;

  try {
    const tutor = await Tutor.findOne({ tutoremail }).where({
      isBlocked: false,
    });
    if (!tutor) {
      return res.status(401).json({ message: "Tutor does not exist" });
    }
    if (tutor?.isBlocked == true) {
      return res.status(401).json({ message: "Tutor is blocked" });
    }
    if (tutor) {
      const passwordMatch = await tutor.matchPassword(password);
      if (passwordMatch) {
        const token = generateToken(tutor._id);
        return res.json({
          _id: tutor._id,
          name: tutor.tutorname,
          email: tutor.tutoremail,
          phone: tutor.phone,
          isBlocked: tutor.isBlocked,
          token,
        });
      }
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const tutorResendOtp = async (req: Request, res: Response) => {
  try {
    const email = req.session.tutor.tutoremail;
    const otp = sendMail(email, res);
    req.session.otp = otp;

    return res.status(200).json({ message: "OTP resent successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const tutorOtpExpiry = async (req: Request, res: Response) => {
  req.session.otp = null;
  res
    .status(200)
    .json({ message: "OTP expired please click the resend button" });
};

const tutorGoogleAuthentication = async (req: Request, res: Response) => {
  const inComingEmailForVerification = req.query.email;
  const name=req.query.name
  console.log(inComingEmailForVerification, "incoming email");
  const userExists = await Tutor.findOne({

    tutoremail: inComingEmailForVerification,
  });
  if (userExists) {
    res.send({ userExist: true ,response:userExists});
  } else {
    const us = {
      tutoremail: inComingEmailForVerification,
    };
    const user = new Tutor({
      tutorname:name,
      tutoremail: inComingEmailForVerification,
    });
    const response = await user.save();
    if (response) {
      const token = generateToken(response._id);
      console.log("hiiiii");

      
      res.send({ userExist: true, token});

      // res.send({ userExist: true, token ,response});

    }
  }
};

const tutorForgotPassword = async (req: Request, res: Response) => {
  try {
    const { tutoremail } = req.body;
    console.log(tutoremail);
    if (!req.session.tutor) {
      req.session.tutor = {
        tutorname: "",
        tutoremail: "",
        phone: "",
        password: "",
      };
    }
    req.session.tutor.tutoremail = tutoremail;

    const tutorExists = await Tutor.findOne({ tutoremail });
    if (tutorExists) {
      const otpReceived = sendMail(tutoremail, res);
      console.log(otpReceived, "...............................");
      req.session.otp = otpReceived;

      res.status(200).json({ message: "Email sent successfully" });
    } else {
      return res.status(400).json({ message: "No user exists" });
    }
  } catch (error) {
    console.log(error);
  }
};

const verifyForgotOTP = async (req: Request, res: Response) => {
  try {
    const { otp } = req.body;
    console.log(otp, ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,");
    console.log(req.session.otp, "+++++++++++++++");

    if (otp == req.session.otp) {
      return res.status(200).json({ message: "Success" });
    } else {
      return res.status(400).json({ message: "Please correct password" });
    }
  } catch (error) {
    console.log(error);
  }
};

const tutorNewPassword = async (req: Request, res: Response) => {
  try {
    const { newPassword } = req.body;
    console.log(newPassword, "----------------------------------");

    const tutoremail = req.session.tutor.tutoremail;
    console.log(tutoremail, "............................");

    const user = await Tutor.findOne({ tutoremail: tutoremail });

    if (!user) {
      return res.status(404).send({
        message: `Cannot find user with email: ${tutoremail}.`,
      });
    }

    const saltRounds = 10;

    const hash = await bcrypt.hash(newPassword, saltRounds);
    try {
      await Tutor.findOneAndUpdate(
        { tutoremail: tutoremail },
        { password: hash }
      );
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
// interface customRequest extends Request {
//   file?: Express.Multer.File;
//   files?: Express.Multer.File[];
// }
// type Middleware = (
//   req: customRequest,
//   res: Response,
//   next: NextFunction
// ) => void;

const editProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file: Express.Multer.File | undefined = req.file;
    if (file) {
      const buffer: Buffer = file.buffer;
      const link = await uploadCloud(buffer);
      console.log(link);
      res.status(200).json({ status: true });
    }
  } catch (e) {
    res.status(500).json({ status: true });
  }
};



const tutorLogout = async (req:Request, res:Response) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return res.status(200).json({ message: "Tutor Logged Out" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export {
  tutorRegistration,
  tutorLogin,
  verifyOtp,
  tutorResendOtp,
  tutorOtpExpiry,
  tutorForgotPassword,
  verifyForgotOTP,
  tutorNewPassword,
  tutorGoogleAuthentication,
  editProfile,
  tutorLogout
};
