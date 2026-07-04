import type { Response } from "@/src/shared/types/response.types";

export interface LoginRequest {
    email: string;
    password: string;
};

export interface LoginData {
    id: string;
    name: string;
    email: string;
    password: string;
    google_id?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export type LoginResponse = Response<LoginData>;

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
};

export type RegisterResponse = Response<LoginData>;
