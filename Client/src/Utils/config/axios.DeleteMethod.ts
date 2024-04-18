import { AxiosRequestConfig } from "axios";
import { apiRequest } from "./axios.config";


export const deleteCategory = async (id: string) => {
    const config: AxiosRequestConfig = {
      method: "DELETE",
      url: `/admin/deletecategory/${id}`,
    };
    return await apiRequest(config);
  };