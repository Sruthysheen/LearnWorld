import { AxiosRequestConfig } from "axios";
import { apiRequest } from "./axios.config";


//student---------------------------------------------------------------------------
export const resendOtp = async() => {
    try {
      const config: AxiosRequestConfig = {
        method: "GET",
        url: '/student/resendotp',
       
      }
      return await apiRequest(config)
    } catch (error) {
      throw error;
    }
  }



  export const otpExpiry = async() => {
    try {
      const config: AxiosRequestConfig = {
        method: "GET",
        url: '/student/otpExpiry',
       
      }
      return await apiRequest(config)
    } catch (error) {
      throw error;
    }
  }



  export const googleAuthVerification = async (emailPayload: string) => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `/student/firebaseAuthVerify?email=${emailPayload}`,
    };
    return await apiRequest(config);
  };
  


  //tutor------------------------------------------------------------------------------------

  export const resendOtpTutor = async() => {
    try {
      const config: AxiosRequestConfig = {
        method: "GET",
        url: '/tutor/resendotp',
       
      }
      return await apiRequest(config)
    } catch (error) {
      throw error;
    }
  }

  export const tutorOtpExpiry = async() => {
    try {
      const config: AxiosRequestConfig = {
        method: "GET",
        url: '/tutor/otpExpiry',
       
      }
      return await apiRequest(config)
    } catch (error) {
      throw error;
    }
  }


  export const tutorGoogleAuthVerification = async (emailPayload: string,name:any) => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `/tutor/firebaseAuthVerify?email=${emailPayload}&&name=${name}`,
    };
    return await apiRequest(config);
  };
  


  export const getTutorBio = async (tutorId: any) => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `/tutor/tutorProfile/${tutorId}`,
    };
    return await apiRequest(config);
  };
  

  //Admin----------------------------------------------------------------------------------

  export const adminListAllStudents = async () => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `/admin/adminstudent`,
    };
    return await apiRequest(config);
  };



  export const adminListAllTutors = async () => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `/admin/admintutor`,
    };
    return await apiRequest(config);
  };


  export const adminListCategory = async () => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `/admin/admincategory`
    }
    return await apiRequest(config)
  };
  

  export const getCategory = async (id:any) => {
    try {
      const config: AxiosRequestConfig = {
        method: "GET",
        url: `/admin/getcategoryid/${id}`
      };
      return await apiRequest(config);
    } catch (error) {
      throw error;  
    }
}

export const getAllCatagory=async()=>{
  console.log('INSide the APII');
  
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `/admin/adminCategory`,
  };
  return await apiRequest(config);
}
