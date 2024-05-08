import { AxiosRequestConfig } from "axios";
import { apiRequest } from "./axios.config";


export const deleteCategory = async (id: string) => {
    const config: AxiosRequestConfig = {
      method: "DELETE",
      url: `/admin/deletecategory/${id}`,
    };
    return await apiRequest(config);
  };


export const deleteCartItem = async(cartItemId:string) =>{
  const config: AxiosRequestConfig = {
    method: "DELETE",
    url: `/student/removecartitem/${cartItemId}`
  }
  return await apiRequest(config);
}


export const deleteWishlistItem = async(wishlistItemId:string) =>{
  const config: AxiosRequestConfig = {
    method: "DELETE",
    url: `/student/removeitem/${wishlistItemId}`
  }
  return await apiRequest(config);
}

