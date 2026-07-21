"use client";

import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import React, { useCallback, useEffect, useRef, useMemo } from "react";
import { CameraControls } from "@react-three/drei";
import { MODEL_TYPES } from "@/src/shared/config/api/model/model.model";

type FocusTarget = MODEL_TYPES | "CASE";

interface CameraControllerProps {
    focusTarget?: FocusTarget;
    componentRefs: Record<string, React.RefObject<THREE.Group | null>>;
    builtComponents?: Array<{ instanceId: string; type: MODEL_TYPES }>;
};

export default function CMControls({ focusTarget, componentRefs, builtComponents = [] }: CameraControllerProps) {
    const ref = useRef<CameraControls | null>(null);
    const { scene, camera } = useThree();

    const toggleGlass = useCallback((visible: boolean) => {
        scene.traverse((child) => {
            if (child.name.toLowerCase().includes("glass")) {
                child.visible = visible;
            }
        });
    }, [scene]);

    // Find the instanceId for the focused component type
    const focusedInstanceId = useMemo(() => {
        if (focusTarget === "CASE") return undefined;
        const match = builtComponents.find(c => c.type === focusTarget);
        return match?.instanceId;
    }, [focusTarget, builtComponents]);

    const targetObj = focusedInstanceId ? componentRefs[focusedInstanceId]?.current : undefined;

    // Camera constraints based on focus target
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
            cam.mouseButtons = { left: 1, middle: 0, right: 0, wheel: 0 };
        } else {
            cam.minPolarAngle = Math.PI / 6;
            cam.maxPolarAngle = (Math.PI / 6) * 5;
            cam.minAzimuthAngle = -Math.PI / 6;
            cam.maxAzimuthAngle = Math.PI / 6;
            cam.maxDistance = 200;
            cam.minDistance = 0.5;
            cam.mouseButtons = { left: 1, middle: 0, right: 0, wheel: 0 };
        }
    }, [focusTarget]);

    // Smooth camera transition to target
    useEffect(() => {
        if (!ref.current || !scene) return;

        const cam = ref.current;

        toggleGlass(false);

        if (focusTarget === "CASE") {
            cam.fitToBox(scene, true, {
                paddingLeft: 0.3,
                paddingRight: 0.3,
                paddingTop: 0.3,
                paddingBottom: 0.3,
            });
} else if (targetObj) {
            const box = new THREE.Box3().setFromObject(targetObj);
            const center = new THREE.Vector3();
            box.getCenter(center);
            const size = new THREE.Vector3();
            box.getSize(size);

            const maxDim = Math.max(size.x, size.y, size.z);

            cam.setLookAt(
                center.x +0.1,
                center.y+0.1 ,
                center.z+0.1,
                center.x, center.y, center.z,
                true
            );
        } else if (focusTarget) {
            console.warn(`CameraController: No ref found for focusTarget: ${focusTarget}`);
        }
    }, [scene, focusTarget, targetObj, toggleGlass]);

    return (
        <CameraControls
            ref={ref}
            smoothTime={0.8}
            draggingSmoothTime={0.1}
            infinityDolly={true}
            mouseButtons={{ left: 1, middle: 0, right: 0, wheel: 0 }}
            touches={{ one: 0, two: 0, three: 0 }}
            minZoom={0.1}
            maxZoom={10}
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
        />
    );
};