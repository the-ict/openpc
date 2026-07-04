"use client";

import { RegisterResponse } from "@/src/shared/config/api/auth/auth.model";
import { register } from "@/src/shared/config/api/auth/auth.requests";
import user_store from "@/src/shared/store/user.store";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export const useRegister = () => {
    const { setToken } = user_store.getState();
    const router = useRouter();

    return useMutation({
        mutationKey: ["register"],
        mutationFn: register,
        onSuccess: (data: RegisterResponse) => {
            if (data.data.token) {
                setToken(data.data.token);
                localStorage.setItem("refresh_token", data.data.refresh_token);
                router.push("/session");
                return;
            };

            throw new Error("Register success function failed");
        },
        onError: (err: unknown) => {
            if (isAxiosError(err)) {
                toast.error(err.response?.data.message || "Registration failed");
            }
        }
    })
};