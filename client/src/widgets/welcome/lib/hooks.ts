import { me } from "@/src/shared/config/api/auth/auth.requests"
import { hero_components } from "@/src/shared/config/api/except/except.requests";
import { useQuery } from "@tanstack/react-query"

export const useMe = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: me,
    })
};

export const useHeroComponents = () => {
    return useQuery({
        queryKey: ["hero-components"],
        queryFn: hero_components,
    })
}