import axios from "axios";

// Base URLs for microservices (use env vars)
const API_BASE_URL = import.meta.env.VITE_SERVER_API_BASE_URL;

// Generic function to create an axios instance
const createAxiosInstance = (baseURL) => {
    const instance = axios.create({
        baseURL,
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // cookies to be sent automatically

    });

    instance.interceptors.response.use(
        (res) => res,
        (err) => {
            if (err.response?.status === 401) {
                localStorage.clear();
                sessionStorage.clear();
                window.location.href = "/login";
            }
            return Promise.reject(err);
        }
    );

    return instance;
};

// Export axios instances for each service
export const serverAPi = createAxiosInstance(API_BASE_URL);
