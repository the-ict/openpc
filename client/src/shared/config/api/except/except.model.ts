import { IModel } from "../model/model.model";

export type HeroComponentsData = {
    cpu_model: IModel;
    gpu_model: IModel;
    ram_model: IModel;
    storage_model: IModel;
    case_model: IModel;
}

export type IExceptHeroComponentsResponse = HeroComponentsData;
