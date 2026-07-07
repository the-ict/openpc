import axios from "axios";
import { BASE_URL, AUTH_URLS } from "./URLS";
import user_store from "../store/user.store";

const http = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

http.interceptors.request.use((config) => {
    const token = user_store.getState().token;
    if (token) {
        config.headers!["Authorization"] = `Bearer ${token}`;
    }
    return config;
})

http.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            }).then((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return http(originalRequest);
            }).catch((err) => {
                return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = localStorage.getItem('refresh_token');

        if (!refreshToken) {
            user_store.getState().setToken("");
            window.location.href = "/login";
            return Promise.reject(error);
        }

        try {
            const response = await http.post(AUTH_URLS.REFRESH, { refresh_token: refreshToken });
            const { token, refresh_token: newRefreshToken } = response.data.data;

            user_store.getState().setToken(token);
            localStorage.setItem('refresh_token', newRefreshToken);

            processQueue(null, token);
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return http(originalRequest);
        } catch (refreshError: any) {
            processQueue(refreshError, null);

            // Check if it's a JWT expired error
            if (refreshError.response?.data?.message?.includes('expired') ||
                refreshError.response?.data?.message?.includes('jwt') ||
                refreshError.response?.status === 401) {
                user_store.getState().setToken("");
                localStorage.removeItem('refresh_token');
                window.location.href = "/login";
            }

            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }

    return Promise.reject(error);
})

export default http;