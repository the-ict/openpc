import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { CameraControls } from "@react-three/drei";
import { MODEL_TYPES } from "@/src/shared/config/api/model/model.model";

interface CameraControllerProps {
    focusTarget?: MODEL_TYPES;
    componentRefs: Record<string, React.RefObject<THREE.Group | null>>;
};

export default function CMControls({ focusTarget, componentRefs }: CameraControllerProps) {
    const ref = useRef<CameraControls | null>(null);
    const { scene } = useThree();
    const componentRefsRef = useRef(componentRefs);

    useEffect(() => {
        componentRefsRef.current = componentRefs;
    }, [componentRefs]);

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
        if (ref.current && scene) {
            if (focusTarget === "CASE") {
                ref.current.fitToBox(scene, true);
            } else {
                const targetObj = componentRefsRef.current[focusTarget as MODEL_TYPES]?.current

                if (!targetObj) {
                    return;
                };

                const targetPosition = new THREE.Vector3();
                targetObj.getWorldPosition(targetPosition);

                ref.current.setLookAt(
                    targetPosition.x + 2,
                    targetPosition.y + 2,
                    targetPosition.z + 2,
                    targetPosition.x,
                    targetPosition.y,
                    targetPosition.z,
                    true
                );
            }
        }
    }, [scene, focusTarget]);

    useEffect(() => {
        if (ref.current && scene && focusTarget !== "CASE") {
            const targetObj = componentRefs[focusTarget as MODEL_TYPES]?.current;
            if (targetObj) {
                const targetPosition = new THREE.Vector3();
                targetObj.getWorldPosition(targetPosition);

                ref.current.setLookAt(
                    targetPosition.x + 2,
                    targetPosition.y + 2,
                    targetPosition.z + 2,
                    targetPosition.x,
                    targetPosition.y,
                    targetPosition.z,
                    true
                );
            }
        }
    }, [componentRefs, focusTarget, scene]);

    return (
        <CameraControls ref={ref} />
    );
};