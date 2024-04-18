import React from 'react'; 
import { Route, Routes } from 'react-router-dom';
import LoginPage from "../Pages/Student/LoginPage";
import RegisterPage from '../Pages/Student/RegisterPage';
import OtpStudentPage from '../Pages/Student/OtpStudentPage';
import ForgotPasswordPage from '../Pages/Student/ForgotPasswordPage';
import ForgotOtpPage from '../Pages/Student/ForgotOtpPage';
import NewPasswordPage from '../Pages/Student/NewPasswordPage';
import HomePage from '../Pages/Student/HomePage';
import PrivatePage from '../Components/PrivateRouter/PrivatePage';

const StudentRouter = () => {
  return (
    <>
      <Routes>
        
       
        <Route path="/login" element={<LoginPage />} />
        <Route path = "/register" element = {<RegisterPage/>} />
        <Route path = "/otp" element = {<OtpStudentPage/>} />
        <Route path = "/forgotpassword" element = {<ForgotPasswordPage/>} />
        <Route path = "/forgototp" element = {<ForgotOtpPage/>} />
        <Route path = "/newpassword" element = {<NewPasswordPage/>} />


        <Route element={<PrivatePage isStudent={true} />}>
        <Route path="/" element={<HomePage />} />
        </Route>

      </Routes>
    </>
  );
};

export default StudentRouter;
