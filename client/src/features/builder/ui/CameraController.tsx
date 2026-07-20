import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import React, { useCallback, useEffect, useRef } from "react";
import { CameraControls } from "@react-three/drei";
import { MODEL_TYPES } from "@/src/shared/config/api/model/model.model";

interface CameraControllerProps {
    focusTarget?: MODEL_TYPES;
    componentRefs: Record<string, React.RefObject<THREE.Group | null>>;
};

export default function CMControls({ focusTarget, componentRefs }: CameraControllerProps) {
    const ref = useRef<CameraControls | null>(null);
    const { scene } = useThree();

    const toggleGlass = useCallback((visible: boolean) => {
        scene.traverse((child) => {
            if (child.name.toLowerCase().includes("glass")) {
                child.visible = visible;
            }
        });
    }, [scene]);

    useEffect(() => {
        if (!ref.current) return;

        const cam = ref.current;

        if (focusTarget === "CASE") {
            cam.minPolarAngle = 0.1;
            cam.maxPolarAngle = Math.PI - 0.1;
            cam.minAzimuthAngle = -Infinity;
            cam.maxAzimuthAngle = Infinity;
            cam.maxDistance = 200;
            cam.minDistance = 0.5;
            cam.mouseButtons = {
                left: 1,
                middle: 0,
                right: 0,
                wheel: 0,
            };
        } else {
            cam.minPolarAngle = Math.PI / 6;
            cam.maxPolarAngle = (Math.PI / 6) * 5;
            cam.minAzimuthAngle = -Math.PI / 6;
            cam.maxAzimuthAngle = Math.PI / 6;
            cam.maxDistance = 200;
            cam.minDistance = 0.5;
            cam.mouseButtons = {
                left: 1,
                middle: 0,
                right: 0,
                wheel: 0,
            };
        }
    }, [focusTarget]);

    useEffect(() => {
        if (!ref.current || !scene) return;

        const cam = ref.current;

        toggleGlass(false);

        if (focusTarget === "CASE") {
            cam.fitToBox(scene, true);
        } else {
            const targetObj = componentRefs[focusTarget as MODEL_TYPES]?.current;
            if (!targetObj) return;

            cam.fitToBox(targetObj, true, { paddingLeft: 0.5, paddingRight: 0.5, paddingTop: 0.5, paddingBottom: 0.5 });
        }
    }, [scene, focusTarget, componentRefs, toggleGlass]);

    return (
        <CameraControls ref={ref} />
    );
};