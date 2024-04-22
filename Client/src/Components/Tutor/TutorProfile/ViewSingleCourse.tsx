import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { format, parseISO } from 'date-fns';
import { getAllCatagory, getAllCatagoryForView } from "../../../Utils/config/axios.GetMethods";

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
  video: string;
}
interface Category {
  _id: string;
  categoryname: string;
  description?: string;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
function ViewSingleCourse() {

  const navigate = useNavigate()
  const {courseDetails} = useSelector((state:any)=>state.course)
  const [categoryName, setCategoryName] = useState<string>("");


  useEffect(() => {
    console.log(courseDetails,"this is some data");
    
    // const fetchCategoryDetails = async () => {
    //   // try {
    //   //   const response:any = await getAllCatagoryForView(); 
    //   //   const categories: Category[] = response.data; 
    //   //   console.log("Fetched categories:", categories);
    //   //   if (Array.isArray(categories) && categories.length > 0) {
    //   //     const category = categories.find((c: any) => c._id === courseDetails.category);
    //   //     setCategoryName(courseDetails?.category?.categoryname || 'Unknown category');
          
    //   //   } else {
    //   //     console.error("Invalid categories response:", categories);
    //   //     toast.error("Failed to fetch category details: Invalid response");
    //   //   }
    //   // } catch (error) {
    //   //   console.error("Failed to fetch category details:", error);
    //   //   toast.error("Failed to fetch category details.");
    //   // }
    //     try {
    //       const response: any = await getAllCatagory(); 
    //       console.log(response.data,"----------category");
          
    //       if (response?.data) {
    //         const data = response?.data?.categoryDetails.map((category: any) => category.categoryname);
    //         // setCategory(data);
    //         console.log(data)
    //       // setCategoryName(courseDetails?.category?.categoryname || 'Unknown category');

    //         console.log("Categories fetched and set:", data);
    //       } else{
    //         alert("no data")
    //       }
    //     } catch (error) {
    //       toast.error("Failed to fetch categories.");
    //     }
    
    //   }
    // if (courseDetails && courseDetails.category) {
    //   fetchCategoryDetails();
    // }
    
  }, [courseDetails]);
  
  

  
  return (
    <>
<div className="bg-white dark:bg-gray-800 flex justify-end mt-4 mr-4">
  <Link
    to="/tutor/editcourse/:id"
    className="block px-5 py-2 font-semibold text-center text-white transition-colors duration-200 transform bg-sky-600 rounded-md hover:bg-blue-400"
  >
    Edit Course
  </Link>
</div>
  <div className="container flex flex-col px-6 py-4 mx-auto space-y-6 md:h-128 md:py-16 md:flex-row md:items-center md:space-x-6 -mt-4">
  <div className="flex flex-col items-center w-full md:flex-row md:w-1/2">
    <div className="max-w-lg mx-auto md:mx-12 md:order-2">
      <h1 className="text-3xl font-medium tracking-wide text-sky-700 dark:text-white md:text-4xl">
        {courseDetails.courseName}
      </h1>
      <p className="mt-4 text-sky-700 dark:text-gray-300">
      {courseDetails.courseDescription}
      </p>
      <h4 className="text-sm font-normal tracking-wide text-sky-600 dark:text-white md:text-lg mt-8">
      Category: {courseDetails.category?.categoryname}
      </h4>
      <h4 className="text-sm font-normal tracking-wide text-sky-600 dark:text-white md:text-lg mt-8">
      Course Fee: ₹{courseDetails.courseFee}
      </h4>
      <h4 className="text-sm font-normal tracking-wide text-sky-600 dark:text-white md:text-lg mt-8">
        Course Duration: {courseDetails.courseDuration}
      </h4>
      <div className="text-sm font-normal tracking-wide text-sky-600 dark:text-white md:text-lg mt-8">
  Last Updated: {format(parseISO(courseDetails.updatedAt), 'MMMM d, yyyy')}
</div>
      {/* <div className="mt-6">
        <a
          href="#"
          className="block px-3 py-2 font-semibold text-center text-white transition-colors duration-200 transform bg-sky-600 rounded-md hover:bg-blue-400 w-80"
        >
          Edit Course
        </a>
      </div> */}
   
    </div>
  </div>
  <div className="flex items-center justify-center w-full md:w-1/3 h-52">  
    <img
      className="object-cover w-full h-full max-w-xs rounded-md"
      src={courseDetails.photo}
      alt="apple watch photo"
    />
  </div>
</div>



 
</>

  )
}

export default ViewSingleCourse