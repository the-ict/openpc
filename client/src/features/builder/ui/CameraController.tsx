import { CameraControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";

interface CameraControllerProps {
    focusTarget?: string;
    socketPoints?: Record<string, { position: [number, number, number]; rotation: [number, number, number] }>;
}

export default function CMControls({ focusTarget, socketPoints }: CameraControllerProps) {
    const ref = useRef<CameraControls | null>(null);
    const { camera, scene } = useThree();

    useEffect(() => {
        if (ref.current) {
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
        }
    }, []);

    useEffect(() => {
        console.log("CameraController - focusTarget:", focusTarget);
        console.log("CameraController - socketPoints:", socketPoints);
        
        if (ref.current && focusTarget && socketPoints) {
            const targetSocket = socketPoints[focusTarget.toLowerCase()];
            console.log("CameraController - targetSocket:", targetSocket);
            
            if (targetSocket) {
                const [x, y, z] = targetSocket.position;
                console.log("CameraController - Moving to position:", [x + 5, y + 5, z + 5], "looking at:", [x, y, z]);
                ref.current.setLookAt(x + 5, y + 5, z + 5, x, y, z, true);
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