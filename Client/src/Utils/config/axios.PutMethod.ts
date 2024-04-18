import { AxiosRequestConfig } from "axios";
import { apiRequest } from "./axios.config";



export const adminBlockStudent = async (userId: string) => {
    const config: AxiosRequestConfig = {
      method: "PUT",
      url: `/admin/blockstudent/${userId}`,
    };
    return await apiRequest(config);
  };
  


  export const adminUnblockStudent = async (userId: string) => {
    const config: AxiosRequestConfig = {
      method: "PUT",
      url: `/admin/unblockstudent/${userId}`,
    };
    return await apiRequest(config);
  };



  export const adminBlockTutor = async (tutorId: string) => {
    const config: AxiosRequestConfig = {
      method: "PUT",
      url: `/admin/blocktutor/${tutorId}`,
    };
    return await apiRequest(config);
  };
  

  
  export const adminUnblockTutor = async (tutorId: string) => {
    const config: AxiosRequestConfig = {
      method: "PUT",
      url: `/admin/unBlocktutor/${tutorId}`,
    };
    return await apiRequest(config);
  };