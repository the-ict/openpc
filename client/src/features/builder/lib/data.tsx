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
    icon: <Cpu />,
  },
  {
    name: "GPU",
    icon: <Gpu />,
  },
  {
    name: "RAM",
    icon: <MemoryStick />,
  },
  {
    name: "Storage",
    icon: <CardSim />,
  },
  {
    name: "Motherboard",
    icon: <Microchip />,
  },
  {
    name: "Power Supply",
    icon: <Power />,
  },
  {
    name: "Case",
    icon: <PcCase />,
  },
  {
    name: "Cooling",
    icon: <AirVent />,
  },
];

const cpuModels = [
  {
    id: 1,
    name: "Intel Core i9-13900K",
    img: "https://www.trustedreviews.com/wp-content/uploads/sites/7/2021/03/Intel-Rocker-Lake-2-e1615908186584-820x461.jpg",
    price: 599.99,
  },
  {
    id: 2,
    name: "AMD Ryzen 9 7950X",
    img: "https://frankfurt.apollo.olxcdn.com/v1/files/hatsoa4c36av-UZ/image;s=883x759",
    price: 699.99,
  }
]

const DEFAULT_CAMERA = {
  position: [0, 0, 0] as [number, number, number],
  target: [0, 0, 0] as [number, number, number],
};

const PART_POSITIONS: Record<string, {
  position: [number, number, number];
  target: [number, number, number];
}> = {
  cpu: { position: [0.8, 0.4, 1.2], target: [0.8, 0.2, 0] },
  gpu: { position: [-0.5, 0.2, 1.5], target: [-0.5, 0, 0] },
  ram: { position: [0.3, 0.5, 1.0], target: [0.3, 0.3, 0] },
  storage: { position: [-0.052843, 1.626965, -1.608937], target: [-0.052843, 1.526965, -1.608937] },
  motherboard: { position: [0, 0.1, 2.5], target: [0, 0, 0] },
  "power supply": { position: [-0.8, -0.5, 1.5], target: [-0.8, -0.5, 0] },
  case: { position: [0, 0, 3.5], target: [0, 0, 0] },
  cooling: { position: [1.540254, 1.949105, -1.583699], target: [0, 1, 0] },
};

export { requirements, cpuModels, PART_POSITIONS, DEFAULT_CAMERA };