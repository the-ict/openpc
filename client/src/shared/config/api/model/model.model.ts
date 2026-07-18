import { Response } from "@/src/shared/types/response.types";

export interface CreateModelRequest {
    name: string;
    type: MODEL_TYPES;
    brand: string;
    price: number;
    image: string;
    model_file: string;
};

export type UpdateModelRequest = Partial<CreateModelRequest>;

export interface ICordinations {
    id: string;
    cpu_cordination_x: string;
    cpu_cordination_y: string;
    cpu_cordination_z: string;
    gpu_cordination_x: string;
    gpu_cordination_y: string;
    gpu_cordination_z: string;
    mother_board_cordination_x: string;
    mother_board_cordination_y: string;
    mother_board_cordination_z: string;
    ram_cordination_x: string;
    ram_cordination_y: string;
    ram_cordination_z: string;
    storage_cordination_x: string;
    storage_cordination_y: string;
    storage_cordination_z: string;
    power_supply_cordination_x: string;
    power_supply_cordination_y: string;
    power_supply_cordination_z: string;
    cooler_cordination_x: string;
    cooler_cordination_y: string;
    cooler_cordination_z: string;
    case_model_id: string;
}

export interface IModel {
    id: string;
    name: string;
    brand: string;
    type: MODEL_TYPES;
    price: number;
    image: string;
    model_file: string;
    cordinations?: ICordinations;
    session_id?: string;
};

export type CreateModelResponse = Response<IModel>;

export type MODEL_TYPES = 'CPU' | 'GPU' | 'MOTHER_BOARD' | 'RAM' | 'STORAGE' | 'POWER_SUPPLY' | 'COOLER' | 'RADIATOR' | 'CASE';