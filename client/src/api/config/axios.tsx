import axios from "axios";

const BASE_URL = "https://schs-server.onrender.com";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

export const privateAxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
})