import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectStudent } from '../../Slices/studentSlice/studentSlice';
import { selectTutor } from '../../Slices/tutorSlice/tutorSlice';

interface PrivatePageProps {
    isStudent : boolean;         
}
const privatePage: React.FC<PrivatePageProps> = ({isStudent}) => {
    const student = useSelector(selectStudent);
    console.log(student,"user is here");
    
    const  tutor  = useSelector(selectTutor);
    if(isStudent) {
        if(student) {
            return <Outlet/>
        } else {
            return <Navigate to={'/login'}/>
        }
    } else {
        if(tutor) {
            return <Outlet/>
        } else {
            return <Navigate to={'/tutor/tutorLogin'}/>
        }
    }
}


export default privatePage