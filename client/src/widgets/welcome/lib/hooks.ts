import { me } from "@/src/shared/config/api/auth/auth.requests"
import { useQuery } from "@tanstack/react-query"

export const useMe = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: me,
    })
}