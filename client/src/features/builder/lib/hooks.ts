"use client";

import { get_models } from "@/src/shared/config/api/model/model.requests";
import { useQuery } from "@tanstack/react-query";
import { IModel } from "@/src/shared/config/api/model/model.model";

export const useBuilder = (params?: { search?: string; type?: string; minPrice?: number; maxPrice?: number }) => {
    const { data: modelsData, error: modelsError, isFetching } = useQuery({
        queryKey: ["models", params],
        queryFn: () => get_models(params),
    });

    return {
        data: modelsData,
        error: modelsError,
        loading: isFetching,
    };
};