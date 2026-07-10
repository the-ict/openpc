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
        const glass = scene.getObjectByName("socket_GLASS");
        if (glass) {
            glass.visible = visible;
        }
    }, [scene]);

    useEffect(() => {
        if (!ref.current) return;

        const cam = ref.current;

        if (focusTarget === "CASE") {
            cam.minPolarAngle = 0.1;
            cam.maxPolarAngle = Math.PI - 0.1;
            cam.minAzimuthAngle = -Infinity;
            cam.maxAzimuthAngle = Infinity;
            cam.maxDistance = 25;
            cam.minDistance = 25;
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
            cam.maxDistance = 25;
            cam.minDistance = 25;
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

        if (focusTarget === "CASE") {
            toggleGlass(true);
            cam.fitToBox(scene, true);
        } else {
            toggleGlass(false);

            const targetObj = componentRefs[focusTarget as MODEL_TYPES]?.current;
            if (!targetObj) return;

            const targetPosition = new THREE.Vector3();
            targetObj.getWorldPosition(targetPosition);

            cam.setLookAt(
                targetPosition.x + 2,
                targetPosition.y + 2,
                targetPosition.z + 2,
                targetPosition.x,
                targetPosition.y,
                targetPosition.z,
                true
            );
        }
    }, [scene, focusTarget, componentRefs, toggleGlass]);

    return (
        <CameraControls ref={ref} />
    );
};