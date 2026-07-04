import axios from "axios";
import { BASE_URL } from "./URLS";
import user_store from "../store/user.store";

const http = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})

http.interceptors.request.use((config) => {
    const token = user_store.getState().token;
    if (token) {
        config.headers!["Authorization"] = `Bearer ${token}`;
    }
    return config;
})

http.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response.status === 401) {
        user_store.getState().setToken("");
        window.location.href = "/login";
    }
    return Promise.reject(error);
})

export default http;