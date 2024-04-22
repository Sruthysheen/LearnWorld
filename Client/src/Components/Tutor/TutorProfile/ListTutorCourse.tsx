import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../../Utils/config/axios.config";
import { tutorregister} from "../../../Slices/tutorSlice/tutorSlice";
import { tutorlogin} from "../../../Slices/tutorSlice/tutorSlice";
import { toast } from "sonner";
import { getAllCourses } from "../../../Utils/config/axios.GetMethods";
import { useDispatch} from "react-redux";
import { useSelector } from "react-redux";
import {clearCourseDetails,setSingleCourseDetails} from "../../../Slices/tutorSlice/courseSlice";

interface Course {
  _id: string;
  courseName: string;
  courseDuration: string;
  courseDescription: string;
  category: string;
  courseFee: number;
  photo: string;
  createdAt: Date;
  updatedAt: Date;
}

function ListTutorCourse() {

  
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [courseInfos, setCourseInfos] = useState<Course[]>([]);

  const {tutor} = useSelector((state: any)=>state.tutor);

  console.log(tutor, "..............................");


  

 
  
  useEffect(() => {
  const fetchBio = async () => { 
    try {
      const response: any = await getAllCourses(tutor._id);
      console.log(response.data,"this is courses");
      
      if (response?.data) {
        const data=response.data.courseDetails
        setCourseInfos(data);
      }
      
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data. Please try again later.");
    }
  };
    fetchBio();
  },[]);


  const handleReadMore = (item: any) => {
    dispatch(clearCourseDetails());
    dispatch(setSingleCourseDetails(item));
  };

  return (
    <>
     {courseInfos && courseInfos.length > 0 ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 mx-10 gap-4">
    {courseInfos.map((course, index) => (
     <div key={index} className="mt-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-3/4 mx-auto">

        <Link to="#">
          <img
            className="rounded-t-lg w-full h-40 object-cover" // Ensuring the image covers the area nicely
            src={course?.photo}
            alt={course?.courseName} // Providing a meaningful alt text
          />
        </Link>
        <div className="p-5">
          <Link to="#">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-sky-700 dark:text-white">
              {course?.courseName}
            </h5>
          </Link>
          <h3 className="mb-3 font-normal text-sky-600 dark:text-gray-400">
            ₹{course.courseFee}
          </h3>
          <div className="text-start">
          <Link
            to="/tutor/viewcourse"
            onClick={()=>handleReadMore(course)}
            className="inline-flex items-center px-6 py-1 text-sm font-medium text-center text-white bg-sky-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            View
          </Link>
          </div>
        </div>
      </div>
    ))}
  </div>
) : (
  <div className="text-center py-8">
    <span className="text-xl text-gray-700">No course available.</span>
  </div>
)}

    </>
  );
}

export default ListTutorCourse;
