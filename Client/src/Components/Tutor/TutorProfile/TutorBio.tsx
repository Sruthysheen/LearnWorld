import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import { getTutorBio } from "../../../Utils/config/axios.GetMethods";
import { editTutorProfile } from "../../../Utils/config/axios.PostMethods";
import { useTutorAuth } from "../../../Utils/Validation/editTutorValidation";
import {toast} from "sonner";
interface formInterface {
  name: string;
  email: string;
  phone: string;
}

function TutorBio() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleSubmit, errors, register } = useTutorAuth();
  const [form, setForm] = useState<formInterface>({
    name: "",
    email: "",
    phone: "",
  });
  
  const [img, setImg] = useState<File | null>(null);
  const tutorId: any = localStorage.getItem("Token");
  const { tutor } = useSelector((state: any) => state.tutor);
  useEffect(() => {
    toast.error(tutorId)
   if(tutor){
    console.log(tutor,'THISIS I TUTOR');
    

   }else{
    toast.error("ERRR")
   }
  }, []);

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleImage = (e:React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    setImg(file)
  }
  const upload = async () => {
    const formData = new FormData()
    if(img && form.name && form.email && form.phone) {
      formData.append('name',form.name)
      formData.append('email',form.email)
      formData.append('phone',form.phone)
      formData.append('image',img,'Profile')
      const response = await axios.post('http://localhost:5000/tutor/edit-profile',
      formData,{
        withCredentials:true
      })
      console.log(response)
    }
  }
  return (
    <div className="h-screen bg-gradient-to-br from-sky-50 to-sky-300">
      <div className="pt-10 md:pt-20">
        <div className="p-4 md:p-8">
          <h1 className="text-sky-800 text-center pb-8 font-light text-4xl md:text-5xl lg:text-6xl">
            About Me
          </h1>
          <form className="flex flex-col items-center">
            <div className="md:w-3/4 lg:w-2/3 xl:w-1/2">
              <div className="flex flex-col md:flex-row">
                <input
                  id="name"
                  type="text"
                  className="my-2 py-2 px-4 rounded-md bg-white text-gray-900 w-full md:w-1/2 md:mr-2 outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Name"
                  name="name"
                  value={tutor.tutorname}
                  onChange={handleChange}
                />
                <input
                  id="email"
                  type="email"
                  className="my-2 py-2 px-4 rounded-md bg-white text-gray-900 w-full md:w-1/2 md:ml-2 outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Email"
                  name="email"
                  value={tutor.tutoremail}
                  onChange={handleChange}
                />
              </div>
              <input
                id="phone"
                type="text"
                className="my-2 py-2 px-4 rounded-md bg-white text-gray-900 w-full outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Phone"
                name="phone"
                value={tutor.phone}
                onChange={handleChange}
              />
              <div className="mt-2">
                <label htmlFor="avatar" className="text-black">
                  Upload Image:
                </label>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/png, image/jpeg"
                  className="my-2 py-2 px-4 rounded-md bg-white text-gray-600 w-full outline-none focus:ring-2 focus:ring-blue-600"
                  onChange={handleImage}
                />
              </div>
            </div>
            <button type="button" onClick={upload} className=" text-md mt-5 rounded-md py-2 px-4 bg-sky-600 hover:bg-blue-700 text-gray-100 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600">
              Edit Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TutorBio;
