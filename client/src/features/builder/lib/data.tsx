import { IRequirements } from "./modal";
import { Cpu, Gpu, MemoryStick, CardSim, Microchip, Power, PcCase, AirVent} from "lucide-react"

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
    img: "https://example.com/intel-core-i9-13900k.png",
    price: 599.99,
  },
  {
    id: 2,
    name: "AMD Ryzen 9 7950X",
    img: "https://example.com/amd-ryzen-9-7950x.png",
    price: 699.99,
  }
]

export { requirements, cpuModels };