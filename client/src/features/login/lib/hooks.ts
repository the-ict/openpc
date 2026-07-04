import { LoginResponse } from "@/src/shared/config/api/auth/auth.model"
import { login } from "@/src/shared/config/api/auth/auth.requests"
import user_store from "@/src/shared/store/user.store"
import { useMutation } from "@tanstack/react-query"
import { isAxiosError } from "axios"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const useLogin = () => {
    const { setToken } = user_store.getState();
    const router = useRouter();
    return useMutation({
        mutationKey: ["login"],
        mutationFn: login,
        onSuccess: (data: LoginResponse) => {
            if (data.data.token.length > 0) {
                setToken(data.data.token);
                localStorage.setItem("refresh_token", data.data.refresh_token);
                router.push("/session");
                return;
            };
            throw new Error("Login failed");
        },
        onError: (error: unknown) => {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message || "Login failed");
            }
        }
    })
};