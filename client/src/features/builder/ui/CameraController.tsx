import { DEFAULT_CAMERA, PART_POSITIONS } from "../lib/data";
import { CameraControls } from "@react-three/drei";
import { useEffect, useRef } from "react";

interface CameraControllerProps {
    focusTarget: string | null;
}

export default function CameraController({ focusTarget }: CameraControllerProps) {
    const controllerRef = useRef<CameraControls | null>(null);

    useEffect(() => {
        const controls = controllerRef.current;
        if (!controls) return;

        if (!focusTarget) {
            controls.setLookAt(
                DEFAULT_CAMERA.position[0], DEFAULT_CAMERA.position[1], DEFAULT_CAMERA.position[2],
                DEFAULT_CAMERA.target[0], DEFAULT_CAMERA.target[1], DEFAULT_CAMERA.target[2],
                true
            );
            return;
        }

        const slug = focusTarget.toLowerCase();
        const cam = PART_POSITIONS[slug];

        if (cam) {
            controls.setLookAt(
                cam.position[0], cam.position[1], cam.position[2],
                cam.target[0], cam.target[1], cam.target[2],
                true
            );
        }
    }, [focusTarget]);

    return <CameraControls ref={controllerRef} makeDefault />
}