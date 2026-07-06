import { IRequirements } from "./modal";
import {
  Cpu,
  Gpu,
  MemoryStick,
  CardSim,
  Microchip,
  Power,
  PcCase,
  AirVent
} from "lucide-react";

const requirements: IRequirements[] = [
  {
    name: "CPU",
    type: "CPU",
    icon: <Cpu />,
  },
  {
    name: "GPU",
    type: "GPU",
    icon: <Gpu />,
  },
  {
    name: "RAM",
    type: "RAM",
    icon: <MemoryStick />,
  },
  {
    name: "STORAGE",
    type: "STORAGE",
    icon: <CardSim />,
  },
  {
    name: "MOTHER BOARD",
    type: "MOTHER_BOARD",
    icon: <Microchip />,
  },
  {
    name: "POWER SUPPLY",
    type: "POWER_SUPPLY",
    icon: <Power />,
  },
  {
    name: "CASE",
    type: "CASE",
    icon: <PcCase />,
  },
  {
    name: "COOLING",
    type: "COOLER",
    icon: <AirVent />,
  },
];

export { requirements };