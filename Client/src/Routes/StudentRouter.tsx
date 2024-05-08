import React from 'react'; 
import { Route, Routes, useLocation  } from 'react-router-dom';
import LoginPage from "../Pages/Student/LoginPage";
import RegisterPage from '../Pages/Student/RegisterPage';
import OtpStudentPage from '../Pages/Student/OtpStudentPage';
import ForgotPasswordPage from '../Pages/Student/ForgotPasswordPage';
import ForgotOtpPage from '../Pages/Student/ForgotOtpPage';
import NewPasswordPage from '../Pages/Student/NewPasswordPage';
import HomePage from '../Pages/Student/HomePage';
import PrivatePage from '../Components/PrivateRouter/PrivatePage';
import CourseViewPage from '../Pages/Student/CourseViewPage';
import Navbar from '../Components/Student/Header/Navbar';
import Footer from '../Components/Student/Home/Footer';
import StudentSingleCourseViewPage from '../Pages/Student/StudentSingleCourseViewPage';
import CartPage from '../Pages/Student/CartPage';
import WishlistPage from '../Pages/Student/WishlistPage';
import StudentProfilePage from '../Pages/Student/StudentProfilePage';
import EditProfilePage from '../Pages/Student/EditProfilePage';

const StudentRouter = () => {
  const location = useLocation();
  const showNavbar = !['/login','/register','/otp','/'].includes(location.pathname);
  const showFooter = !['/login','/register','/otp','/'].includes(location.pathname);
  return (
    <>
     {showNavbar && <Navbar/>} 
      <Routes>
        
       
        <Route path="/login" element={<LoginPage />} />
        <Route path = "/register" element = {<RegisterPage/>} />
        <Route path = "/otp" element = {<OtpStudentPage/>} />
        <Route path = "/forgotpassword" element = {<ForgotPasswordPage/>} />
        <Route path = "/forgototp" element = {<ForgotOtpPage/>} />
        <Route path = "/newpassword" element = {<NewPasswordPage/>} />


        {/* <Route element={<PrivatePage isStudent={true} />}> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/getcourses" element={<CourseViewPage/>} />
        <Route path="/singlecourse" element={<StudentSingleCourseViewPage/>} />
        <Route path="/cart/:studentId" element={<CartPage/>} />
        <Route path="/wishlist/:studentId" element={<WishlistPage/>} />
        <Route path="/profile" element={<StudentProfilePage/>} />
        <Route path="/editprofile" element={<EditProfilePage/>} />



        {/* </Route> */}

      </Routes>
      {showFooter && <Footer/>}
    </>
  );
};

export default StudentRouter;
