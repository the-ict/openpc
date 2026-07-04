import http from "../../httpConfig";
import { MODEL_URLS } from "../../URLS";
import { CreateModelRequest, CreateModelResponse } from "./model.model";

export const create_model = async (data: CreateModelRequest): Promise<CreateModelResponse> => {
    const response = await http.post(MODEL_URLS.CREATE, data);
    return response.data as CreateModelResponse;
};

export const update_model = async ({
    id, data
}: { id: string, data: CreateModelRequest }): Promise<CreateModelResponse> => {
    const response = await http.put(`${MODEL_URLS.UPDATE}/${id}`, data);
    return response.data as CreateModelResponse;
};