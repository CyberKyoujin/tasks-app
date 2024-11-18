import axios from "axios";


const BASE_URL = "http://127.0.0.1:8000";

const axiosInstance = axios.create({
    baseURL: BASE_URL
});

// Adding an interceptor, to add the access token to the each request

axiosInstance.interceptors.request.use(
    config => {
        const accessToken = localStorage.getItem("access");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    error => Promise.reject(error)
);