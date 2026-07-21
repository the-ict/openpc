"use client";

import * as THREE from "three";


import { CameraControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

interface Props {
    casePartsRefs: Record<string, React.RefObject<THREE.Group | null>>;
    currentStep: number;
    steps: Array<{ type: string }>;
    scrollProgress: number;
}

export default function AnimationCameraController({
    casePartsRefs,
    currentStep,
    steps,
    scrollProgress,
}: Props) {
    const controls = useRef<CameraControls | null>(null);
    const scene = useThree((state) => state.scene);
    const initialFitDone = useRef(false);

    useEffect(() => {
        if (controls.current && scene) {
            const caseModel = scene.getObjectByName("case-model");

            if (caseModel && !initialFitDone.current) {
                setTimeout(() => {
                    controls.current?.fitToBox(caseModel, true, {
                        paddingLeft: 0.15,
                        paddingRight: 0.15,
                        paddingTop: 0.15,
                        paddingBottom: 0.15,
                    });
                    initialFitDone.current = true;
                }, 100);
            }
        }
    }, [scene]);

    useEffect(() => {
        if (!controls.current || !initialFitDone.current) return;

        if (scrollProgress < 0.01) {
            const caseModel = scene.getObjectByName("case-model");
            if (caseModel) {
                controls.current.fitToBox(caseModel, true, { paddingLeft: 0.15, paddingRight: 0.15, paddingTop: 0.15, paddingBottom: 0.15 });
            }
            return;
        }

        const currentStepType = steps[currentStep]?.type;
        const targetRef = casePartsRefs[currentStepType];

        if (targetRef && targetRef.current) {
            const targetPosition = targetRef.current.position;
            const target = new THREE.Box3().setFromObject(targetRef.current);
            console.log('target: ', target);

            const distance = 0.1;

            const targetX = targetPosition.x + distance;
            const targetY = targetPosition.y + distance;
            const targetZ = targetPosition.z + distance;

            controls.current.setLookAt(
                targetX, targetY, targetZ,
                targetPosition.x, targetPosition.y, targetPosition.z,
                true
            );
        }
    }, [currentStep, scrollProgress]);

    return (
        <CameraControls
            ref={controls}
            smoothTime={0.8}
            draggingSmoothTime={0.1}
            infinityDolly={true}
            mouseButtons={{ left: 0, middle: 0, right: 0, wheel: 0 }}
            touches={{ one: 0, two: 0, three: 0 }}
            minZoom={0.1}
            maxZoom={10}
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
        />
    );
}