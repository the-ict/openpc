import { Box, MousePointer, Component, Gamepad2, Shuffle, ComponentIcon } from "lucide-react";
import { IFunctions } from "./modal";

export const functionItems: IFunctions[] = [
    {
        name: "3d Builder",
        id: 1,
        icon: Box
    },
    {
        name: "Products",
        id: 2,
        icon: MousePointer
    },
    {
        name: "Gaming PCs",
        id: 3,
        icon: Gamepad2
    },
    {
        name: "All in One",
        id: 4,
        icon: Component
    },
    {
        name: "Compare",
        id: 5,
        icon: Shuffle,
    },
    {
        name: "3d Components",
        id: 6,
        icon: ComponentIcon,
    }
];