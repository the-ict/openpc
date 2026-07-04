import type { Response } from "@/src/shared/types/response.types";

export interface LoginRequest {
    email: string;
    password: string;
};

export interface LoginData {
    user: {
        id: string;
        name: string;
        email: string;
        password: string;
        google_id?: string | null;
        createdAt: Date;
        updatedAt: Date;
    };
    token: string;
    refresh_token: string;
}

export type LoginResponse = Response<LoginData>;

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
};

export type RegisterResponse = Response<LoginData>;
