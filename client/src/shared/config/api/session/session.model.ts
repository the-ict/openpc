import { Response } from "@/src/shared/types/response.types";
import { IModel, MODEL_TYPES } from "../model/model.model";

export interface CreateSessionRequest {
    name: string;
};

export interface AddModelToSessionRequest {
    model_id: string;
    slot?: number;
};

export interface UpdateSessionRequest {
    name?: string;
};

export interface ISessionModel {
    id: string;
    sessionId: string;
    modelId: string;
    type: MODEL_TYPES;
    slot: number;
    order: number;
    model: IModel;
};

export interface ISession {
    id: string;
    name: string;
    status: string;
    sessionModels: ISessionModel[];
    updatedAt: Date;
    createdAt: Date;
};

export type CreateSessionResponse = Response<ISession>;
export type AddModelToSessionResponse = Response<ISession>;
export type RemoveSessionModelResponse = Response<ISession>;
export type UpdateSessionResponse = Response<ISession>;
export type DeleteSessionResponse = Response<null>;
export type GetSessionResponse = Response<ISession>;
export type GetSessionsResponse = Response<ISession[]>;