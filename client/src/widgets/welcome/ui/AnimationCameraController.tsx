import { MODEL_TYPES } from "@/src/shared/config/api/model/model.model";
import React, { useCallback, useEffect, useRef } from "react";
import { CameraControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

interface AnimationCameraControllerProps {
    focusTarget?: MODEL_TYPES | "OVERVIEW" | "CASE";
    componentRefs: Record<string, React.RefObject<THREE.Group | null>>;
};

export default function AnimationCameraController({ focusTarget, componentRefs }: AnimationCameraControllerProps) {
    const controls = useRef<CameraControls | null>(null);
    const { scene } = useThree();

    useEffect(() => {
        const cam = controls.current;
        if (!cam) return;

        cam.mouseButtons = {
            left: 1,
            middle: 0,
            right: 0,
            wheel: 0,
        };

        if (!focusTarget || focusTarget === "OVERVIEW" || focusTarget === "CASE") {
            cam.fitToBox(scene, true);
            return;
        };

        console.log("focusTarget: ", focusTarget);

        const targetObj = componentRefs[focusTarget]?.current;
        if (!targetObj) return;

        cam.fitToBox(targetObj, true, { paddingLeft: 0.5, paddingRight: 0.5, paddingTop: 0.5, paddingBottom: 0.5 });
    }, [focusTarget, componentRefs, scene]);

    return <CameraControls ref={controls} />;
}
