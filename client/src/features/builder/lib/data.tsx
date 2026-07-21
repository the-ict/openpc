import { IRequirements } from "./modal";
import {
  Cpu,
  Gpu,
  MemoryStick,
  CardSim,
  Microchip,
  Power,
  PcCase,
  AirVent,
  Snowflake
} from "lucide-react";

const requirements: IRequirements[] = [
  {
    name: "CPU",
    type: "CPU",
    icon: <Cpu />,
    maxSlots: 1,
  },
  {
    name: "GPU",
    type: "GPU",
    icon: <Gpu />,
    maxSlots: 1,
  },
  {
    name: "RAM",
    type: "RAM",
    icon: <MemoryStick />,
    maxSlots: 4,
  },
  {
    name: "STORAGE",
    type: "STORAGE",
    icon: <CardSim />,
    maxSlots: 4,
  },
  {
    name: "MOTHER BOARD",
    type: "MOTHER_BOARD",
    icon: <Microchip />,
    maxSlots: 1,
  },
  {
    name: "POWER SUPPLY",
    type: "POWER_SUPPLY",
    icon: <Power />,
    maxSlots: 1,
  },
  {
    name: "CASE",
    type: "CASE",
    icon: <PcCase />,
    maxSlots: 1,
  },
  {
    name: "COOLING",
    type: "COOLER",
    icon: <AirVent />,
    maxSlots: 1,
  },
  {
    name: "RADIATOR",
    type: "RADIATOR",
    icon: <Snowflake />,
    maxSlots: 2,
  },
];

export { requirements };