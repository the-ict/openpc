import { MODEL_TYPES } from "@/src/shared/config/api/model/model.model";

interface IRequirements {
  name: string;
  icon: any;
  type: MODEL_TYPES;
  maxSlots: number;
};

export type {
  IRequirements
}