import { IModel } from "@/src/shared/config/api/model/model.model";
import React, { useEffect, useMemo, useRef } from "react";
import { modelFileUrl } from "@/src/shared/config/URLS";
import { useGLTF } from "@react-three/drei";
import { Vec3 } from "./RenderCase";
import * as THREE from "three";

interface Props {
    model: IModel;
    socket: { position: Vec3; rotation: Vec3 };
    caseSize: Vec3;
    setCasePartsRefs: React.Dispatch<React.SetStateAction<Record<string, React.RefObject<THREE.Group | null>>>>;
};

export default function RenderModel({ model, socket, caseSize, setCasePartsRefs }: Props) {
    const { scene } = useGLTF(modelFileUrl(model.model_file));
    const ref = useRef<THREE.Group>(null);

    const cloned = useMemo(() => {
        const clone = scene.clone();

        clone.traverse((child) => {
            const mesh = child as THREE.Mesh;
            if (mesh.isMesh && mesh.material) {
                if (Array.isArray(mesh.material)) {
                    mesh.material = mesh.material.map((m) => m.clone());
                } else {
                    mesh.material = mesh.material.clone();
                }
            }
        });

        return clone;
    }, [scene]);

    useEffect(() => {
        if (ref.current) {
            setCasePartsRefs((prev) => {
                if (prev[model.type] === ref) return prev;
                return { ...prev, [model.type]: ref };
            });
        }
    }, [ref, model.type]);

    return (
        <group ref={ref} position={socket.position} rotation={socket.rotation}>
            <primitive object={cloned} />
        </group>
    );
}
