import React from 'react'; 
import { Route, Routes, useLocation } from 'react-router-dom';
import TutorRegisterPage from '../Pages/Tutor/TutorRegisterPage';
import OtpTutorPage from '../Pages/Tutor/OtpTutorPage';
import TutorLoginPage from "../Pages/Tutor/TutorLoginPage"
import TutorHomePage from '../Pages/Tutor/TutorHomePage';
import TutorForgotPasswordPage from '../Pages/Tutor/TutorForgotPasswordPage';
import TutorForgotOtpPage from '../Pages/Tutor/TutorForgotOtpPage';
import TutorNewPasswordPage from '../Pages/Tutor/TutorNewPasswordPage';
import TutorProfilePage from '../Pages/Tutor/TutorProfilePage';
import TutorNavbar from '../Components/Tutor/Header/TutorNavbar';
import TutorAddNewCoursePage from '../Pages/Tutor/TutorAddNewCoursePage';
import PrivatePage from '../Components/PrivateRouter/PrivatePage';

const TutorRouter = () => {
    const location = useLocation();
    const showNavbar = !['/tutor/tutorlogin', '/tutor/tutorregister','/tutor/home'].includes(location.pathname);  
    return (
        <>
            {showNavbar && <TutorNavbar />}
            <Routes>
                <Route path="/tutorregister" element={<TutorRegisterPage/>} />
                <Route path="/tutorotp" element={<OtpTutorPage/>} />
                <Route path="/tutorlogin" element={<TutorLoginPage />} />
                <Route path="/tutorforgotpassword" element={<TutorForgotPasswordPage/>} />
                <Route path="/verifyforgototptutor" element={<TutorForgotOtpPage/>} />
                <Route path="/tutornewpassword" element={<TutorNewPasswordPage/>} />
                
                <Route element={<PrivatePage isStudent={false} />}>
                <Route path="/home" element={<TutorHomePage/>} />
                <Route path="/tutorprofile" element={<TutorProfilePage/>} />
                <Route path="/tutornewcourse" element={<TutorAddNewCoursePage/>} />
                </Route>
            </Routes> 
        </>
    )
}

export default TutorRouter;
