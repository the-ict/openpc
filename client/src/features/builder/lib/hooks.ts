"use client";

import * as THREE from "three";
import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { useMutation, useQuery } from "@tanstack/react-query";
import { get_models } from "@/src/shared/config/api/model/model.requests";
import { add_model_to_session } from "@/src/shared/config/api/session/session.requests";

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
    position: [number, number, number];
    rotation: [number, number, number];
};

export const useCaseSockets = (caseUrl: string): Record<string, Socket> => {
    const { scene } = useGLTF(caseUrl);

    return useMemo(() => {
        const sockets: Record<string, Socket> = {};
        scene.updateWorldMatrix(true, true);

        scene.traverse((child) => {
            if (child.name.startsWith('socket_')) {
                const key = child.name.replace('socket_', '').toUpperCase();

                const worldPos = new THREE.Vector3();
                child.getWorldPosition(worldPos);
                const localPos = scene.worldToLocal(worldPos.clone());

                const worldQuat = new THREE.Quaternion();
                child.getWorldQuaternion(worldQuat);
                const euler = new THREE.Euler().setFromQuaternion(worldQuat);

                const worldScale = new THREE.Vector3();
                child.getWorldScale(worldScale);

                sockets[key] = {
                    position: [localPos.x, localPos.y, localPos.z],
                    rotation: [euler.x, euler.y, euler.z],
                };
            }
        });

        return sockets;
    }, [scene]);
};


export const useAddModelToSession = () => {
    return useMutation({
        mutationKey: ["add-model-to-session"],
        mutationFn: ({ session_id, model_id }: { session_id: string, model_id: string }) => add_model_to_session(session_id, model_id),
    });
};