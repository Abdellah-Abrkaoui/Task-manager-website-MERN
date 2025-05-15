import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//  Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.error("Request timeout, please try again.");
    }

    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        console.warn("Unauthorized. Redirecting to login.");
        window.location.href = "/login";
      } else if (status === 500) {
        console.error("Server error. Please try again later.");
      }
    } else {
      console.error("Network error or no response from server.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
