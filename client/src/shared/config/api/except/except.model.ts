import { Response } from "@/src/shared/types/response.types";
import { IModel } from "../model/model.model";

export type HeroComponentsData = {
    cpu_model: IModel;
    gpu_model: IModel;
    ram_model: IModel;
    storage_model: IModel;
}

export type IExceptHeroComponentsResponse = Response<HeroComponentsData>;
