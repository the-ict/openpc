import http from "../../httpConfig";
import { EXCEPT_URLS } from "../../URLS";
import { IExceptHeroComponentsResponse } from "./except.model";

export const hero_components = async(): Promise<IExceptHeroComponentsResponse> => {
    const response = await http.get<IExceptHeroComponentsResponse>(EXCEPT_URLS.HERO_COMPONENTS);
    return response.data;
};