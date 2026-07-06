import { CameraControls } from "@react-three/drei";
import { useRef } from "react";

export default function CMControls () {
    const ref = useRef(null);


    return (
        <CameraControls ref={ref}/>
    )
};