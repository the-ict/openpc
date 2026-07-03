export interface IModel {
    name: string;
    description: string;
    type: MODEL_TYPES;
    brand: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}


export type MODEL_TYPES = "CASE" | "MOTHERBOARD" | "CPU" | "GPU" | "RAM" | "STORAGE" | "PSU" | "COOLER" | "FAN" | "OTHER";