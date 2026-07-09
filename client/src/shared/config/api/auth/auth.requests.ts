import http from "../../httpConfig";
import { AUTH_URLS } from "../../URLS";
import type { LoginRequest, LoginResponse, MeResponse, RegisterRequest, RegisterResponse } from "./auth.model";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await http.post<LoginResponse>(AUTH_URLS.LOGIN, data);
    return response.data;
};

export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await http.post<RegisterResponse>(AUTH_URLS.REGISTER, data);
    return response.data;
};

export const me = async (): Promise<MeResponse> => {
    const response = await http.get<MeResponse>(AUTH_URLS.ME);
    return response.data;
}