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
} from "lucide-react"

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

export { requirements, cpuModels };