import http from "../../httpConfig";
import { MODEL_URLS } from "../../URLS";
import { CreateModelRequest, CreateModelResponse, IModel } from "./model.model";

export const create_model = async (data: CreateModelRequest) => {
    const response = await http.post(MODEL_URLS.CREATE, data);
    return response.data as CreateModelResponse;
};

export const update_model = async ({
    id, data
}: { id: string, data: CreateModelRequest }) => {
    const response = await http.put(`${MODEL_URLS.UPDATE}/${id}`, data);
    return response.data as CreateModelResponse;
};

export const get_models = async (params?: { search?: string; type?: string; minPrice?: number; maxPrice?: number }) => {
    const response = await http.get<{ data: IModel[] }>(MODEL_URLS.GET_ALL, { params });
    return response.data;
};

export const upload_model = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await http.post(MODEL_URLS.UPLOAD_FILE, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};