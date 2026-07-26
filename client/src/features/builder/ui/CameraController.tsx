"use client";

import { MODEL_TYPES } from "@/src/shared/config/api/model/model.model";
import React, { useEffect, useRef, useMemo } from "react";
import { CameraControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

interface CameraControllerProps {
    focusTarget?: MODEL_TYPES;
    componentRefs: Record<string, React.RefObject<THREE.Group | null>>;
    builtComponents?: Array<{ instanceId: string; type: MODEL_TYPES }>;
};

export default function CMControls({ focusTarget, componentRefs, builtComponents = [] }: CameraControllerProps) {
    const ref = useRef<CameraControls | null>(null);
    const { scene } = useThree();

    const focusedInstanceId = useMemo(() => {
        if (focusTarget === "CASE") return undefined;
        const match = builtComponents.find(c => c.type === focusTarget);
        return match?.instanceId;
    }, [focusTarget, builtComponents]);

    const targetObj = focusedInstanceId ? componentRefs[focusedInstanceId]?.current : undefined;

    useEffect(() => {
        if (!ref.current || !scene) return;

        const cam = ref.current;

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
    }, [scene, focusTarget, targetObj]);

    return (
        <CameraControls ref={ref} />
    );
};