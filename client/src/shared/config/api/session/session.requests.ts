import http from "../../httpConfig";
import { SESSION_URLS } from "../../URLS";
import { AddModelToSessionResponse, CreateSessionRequest, CreateSessionResponse, DeleteSessionResponse, GetSessionResponse, GetSessionsResponse, UpdateSessionRequest, UpdateSessionResponse } from "./session.model";

export const create_session = async (data: CreateSessionRequest): Promise<CreateSessionResponse> => {
    const response = await http.post<CreateSessionResponse>(SESSION_URLS.CREATE, data);
    return response.data;
};

export const update_session = async (id: string, data: UpdateSessionRequest): Promise<UpdateSessionResponse> => {
    const response = await http.put<UpdateSessionResponse>(`${SESSION_URLS.UPDATE}/${id}`, data);
    return response.data;
};

export const get_session = async (id: string): Promise<GetSessionResponse> => {
    const response = await http.get<GetSessionResponse>(`${SESSION_URLS.GET}/${id}`);
    return response.data;
};

export const get_sessions = async (): Promise<GetSessionsResponse> => {
    const response = await http.get<GetSessionsResponse>(SESSION_URLS.GET_ALL);
    return response.data;
};

export const add_model_to_session = async (sessionId: string, modelId: string): Promise<AddModelToSessionResponse> => {
    const response = await http.post<AddModelToSessionResponse>(`${SESSION_URLS.ADD_MODEL}/${sessionId}`, { model_id: modelId });
    return response.data;
};

export const delete_session = async (id: string): Promise<DeleteSessionResponse> => {
    const response = await http.delete<DeleteSessionResponse>(`${SESSION_URLS.DELETE}/${id}`);
    return response.data;
};
