import { Response } from "@/src/shared/types/response.types";
import { IModel } from "../model/model.model";

export interface CreateSessionRequest {
    name: string;
};

export interface AddModelToSessionRequest {
    model_id: string;
};

export interface UpdateSessionRequest {
    name?: string;
};

export interface ISession {
    id: string;
    name: string;
    models: IModel[]
};

export type CreateSessionResponse = Response<ISession>;
export type AddModelToSessionResponse = Response<ISession>;
export type UpdateSessionResponse = Response<ISession>;
export type DeleteSessionResponse = Response<null>;
export type GetSessionResponse = Response<ISession>;
export type GetSessionsResponse = Response<ISession[]>;