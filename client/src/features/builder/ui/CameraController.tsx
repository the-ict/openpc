import { MODEL_TYPES } from "@/src/shared/config/api/model/model.model";
import { CameraControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

interface CameraControllerProps {
    focusTarget?: MODEL_TYPES;
    socketPoints?: Record<string, { position: [number, number, number]; rotation: [number, number, number] }>;
};

export default function CMControls({ focusTarget, socketPoints }: CameraControllerProps) {
    const ref = useRef<CameraControls | null>(null);
    const { scene } = useThree();

    useEffect(() => {
        if (ref.current && focusTarget !== "CASE") {
            ref.current.minPolarAngle = Math.PI / 6;
            ref.current.maxPolarAngle = (Math.PI / 6) * 5;
            ref.current.minAzimuthAngle = -Math.PI / 6;
            ref.current.maxAzimuthAngle = Math.PI / 6;
            ref.current.maxDistance = 25;
            ref.current.minDistance = 25;
            ref.current.mouseButtons = {
                left: 1,
                middle: 0,
                right: 0,
                wheel: 0,
            };
        } else if (ref.current && focusTarget === "CASE") {
            console.log("FOCUS TARGET HAS CHANGED & we'got CASE", focusTarget);
            ref.current.minPolarAngle = 0.1;
            ref.current.maxPolarAngle = Math.PI - 0.1;
            ref.current.minAzimuthAngle = -Infinity;
            ref.current.maxAzimuthAngle = Infinity;
            ref.current.maxDistance = 25;
            ref.current.minDistance = 25;
            ref.current.mouseButtons = {
                left: 1,
                middle: 0,
                right: 0,
                wheel: 0,
            };
        };
    }, [focusTarget]);

    useEffect(() => {
        console.log("CameraController - focusTarget:", focusTarget);
        console.log("CameraController - socketPoints:", socketPoints);

        if (ref.current && focusTarget && socketPoints && focusTarget !== "CASE") {
            const targetSocket = socketPoints[focusTarget];
            console.log("CameraController - targetSocket:", targetSocket);

            if (targetSocket) {
                const [x, y, z] = targetSocket.position;
                console.log("CameraController - Moving to position:", [x + 5, y + 5, z + 5], "looking at:", [x, y, z]);
                
                ref.current.setLookAt(x + 2.5, y + 2.5, z + 2.5, x, y, z, true);
            } else {
                console.log("CameraController - No socket found for:", focusTarget.toLowerCase());
                console.log("Available socket keys:", Object.keys(socketPoints));
            }
        }
    }, [focusTarget, socketPoints]);

    useEffect(() => {
        if (ref.current && scene) {
            setTimeout(() => {
                ref.current?.fitToBox(scene, true);
            }, 500);
        }
    }, [scene]);

    return (
        <CameraControls ref={ref} />
    );
}