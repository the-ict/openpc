"use client";

import * as THREE from "three";
import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { useQuery } from "@tanstack/react-query";
import { get_models } from "@/src/shared/config/api/model/model.requests";

export const useBuilder = (params?: { search?: string; type?: string; minPrice?: number; maxPrice?: number }) => {
    const { data: modelsData, error: modelsError, isFetching } = useQuery({
        queryKey: ["models", params],
        queryFn: () => get_models(params),
    });

    return {
        data: modelsData,
        error: modelsError,
        loading: isFetching,
    };
};


export interface Socket {
    position: [number,number,number];
    rotation:[number, number,number];
};

export const useCaseSockets = (caseUrl: string):Record<string, Socket> => {
    const { scene } = useGLTF(caseUrl);

    return useMemo(() => {
        const sockets: Record<string, Socket> = {};
        scene.updateWorldMatrix(true,true);
        
        scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                const key = child.name.replace("socket_", "");
                console.log("this is child: ", child);
                
                const worldPos = new THREE.Vector3();
                child.getWorldPosition(worldPos);

                const localPos = scene.worldToLocal(worldPos.clone());

                const worldQuat = new THREE.Quaternion();
                child.getWorldQuaternion(worldQuat);

                const euler = new THREE.Euler().setFromQuaternion(worldQuat);

                sockets[key] = {
                    position: [localPos.x, localPos.y, localPos.z],
                    rotation: [euler.x, euler.y, euler.z],
                };
            }
        });
        
        return sockets;
    }, [scene])
}