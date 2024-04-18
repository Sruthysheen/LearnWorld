import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useCourseValidation } from "../../../Utils/Validation/addCourseValidation";
import axios from "axios";
import { getAllCatagory } from "../../../Utils/config/axios.GetMethods";

function AddNewCourse() {
    const [courseName, setCourseName] = useState<string>("");
  const [courseDescription, setCourseDescription] = useState<string>("");
  const [shortDescription, setShortDescription] = useState<string>("");
  const [courseDuration, setCourseDuration] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [coursefee, setCoursefee] = useState<string>("");
  const [courseLevel, setCourseLevel] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [catagory, setCatagory]: any = useState({});
  const [CloudanaryURL, setCloudanaryURL] = useState("");
  const { errors, handleSubmit, register } = useCourseValidation();

  const navigate = useNavigate();

  const tutorData = useSelector((state: any) => state.tutor.tutor);
  const storedTutorId = tutorData?.tutorId;

  
  type course = {
    courseName: string;
    courseDescription: string;
    shortDescription: string;
    courseDuration: string;
    isApproved: boolean;
    category: string;
    coursefee: number;
    instructor: string;
    image: any;
    courseLevel: string;
    tutorId: string;
  };

  let file: any;

  useEffect(() => {

    (async () => {
      const response: any = await getAllCatagory();
      console.log("this is catogary", response?.data);

      if (response) {
        setCatagory(response?.data?.categoryDetails);
      }
    })();
  }, []);

  const tutorId = localStorage.getItem("tutorId");

  return (
    <>
      {/* component */}
      {/* Tailwind Play: https://play.tailwindcss.com/qIqvl7e7Ww  */}
      <div className="flex min-h-screen items-center justify-start bg-gradient-to-br from-sky-50 to-sky-300">
        <div className="mx-auto w-full max-w-lg" style={{ marginTop: "-2rem" }}> {/* Adjusted inline style here */}
          <h1 className="text-4xl font-medium">Contact us</h1>
          <form action="https://api.web3forms.com/submit" className="mt-10">
            {/* This is a working contact form. 
            Get your free access key from: https://web3forms.com/  */}
            <input
              type="hidden"
              name="access_key"
              defaultValue="YOUR_ACCESS_KEY_HERE"
            />
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="relative z-0">
                <input
                  type="text"
                  name="name"
                  className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                  Course name
                </label>
              </div>
              
              <div className="relative z-0 col-span-2">
                <textarea
                  name="message"
                  rows={2}
                  className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                  defaultValue={""}
                />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                  Description
                </label>
              </div>

              <div className="relative z-0 col-span-2">
                <textarea
                  name="message"
                  rows={2}
                  className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                  defaultValue={""}
                />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                  Short Description
                </label>
              </div>
              <div className="relative z-0">
                <input
                  type="text"
                  name="category"
                  className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                  Category
                </label>
              </div>
    

              <div className="relative z-0">
                <input
                  type="text"
                  name="price"
                  className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                  Price
                </label>
              </div>

              <div className="relative z-0">
                <input
                  type="text"
                  name="duration"
                  className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                  Duration
                </label>
              </div>

              {/* Add image upload field */}
              <div className="relative z-0">
                <input
                  type="file"
                  name="courseImage"
                  accept="image/*"
                  className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                  Upload Image
                </label>
              </div>

            </div>
            {/* Add submit button */}
            <button
              type="submit"
              className="mt-5 rounded-md bg-sky-600 px-10 py-2 text-white"
            >
              Add Course
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddNewCourse;
