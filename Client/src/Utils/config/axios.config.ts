import axios, { AxiosRequestConfig } from "axios";

export const api = axios.create({
	baseURL: "http://localhost:5000/",
	timeout: 5000,
	withCredentials:true,
});  

export const apiRequest = async (config: AxiosRequestConfig) => {
    console.log(config);
    
	try {
		const response = await api(config);
		return response;
	} catch (error) {
		console.error(error, "errr");
		return error;
	}
};

export const headerConfg = () => {
	const token = localStorage.getItem("adminToken");
	if (token) {
		return {
			Authorization: ` Bearer ${token}`
		};
	}
};