import { create_model, upload_model } from "@/src/shared/config/api/model/model.requests";
import { useMutation } from "@tanstack/react-query";

export const useCreateModel = () =>
    useMutation({
        mutationKey: ["create-model"],
        mutationFn: create_model,
    });

export const useUploadModel = () =>
    useMutation({
        mutationKey: ["upload-model"],
        mutationFn: upload_model,
    });