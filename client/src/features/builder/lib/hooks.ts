"use client";

import * as THREE from "three";
import { useMemo } from "react";
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

export type SocketsByType = Record<string, Socket[]>;

export const useCaseSockets = (caseUrl: string): SocketsByType => {
    const { scene } = useGLTF(caseUrl);

    return useMemo(() => {
        const raw: { base: string; index: number; socket: Socket }[] = [];
        scene.updateWorldMatrix(true, true);

        scene.traverse((child) => {
            if (child.name.startsWith('socket_')) {
                const rest = child.name.replace('socket_', '').toUpperCase();
                console.log("socket node: ", child.name);

                let base = rest;
                let index = 0;
                const suffixMatch = rest.match(/^(.+?)_(\d+)$/);
                if (suffixMatch) {
                    base = suffixMatch[1];
                    index = parseInt(suffixMatch[2], 10) - 1;
                };

                const worldPos = new THREE.Vector3();
                child.getWorldPosition(worldPos);
                const localPos = scene.worldToLocal(worldPos.clone());

                const worldQuat = new THREE.Quaternion();
                child.getWorldQuaternion(worldQuat);
                const euler = new THREE.Euler().setFromQuaternion(worldQuat);

                raw.push({
                    base,
                    index,
                    socket: {
                        position: [localPos.x, localPos.y, localPos.z],
                        rotation: [euler.x, euler.y, euler.z],
                    },
                });
            }
        });

        const sockets: SocketsByType = {};
        raw.forEach(({ base, index, socket }) => {
            if (!sockets[base]) sockets[base] = [];
            sockets[base][index] = socket;
        });

        const cleaned: SocketsByType = {};
        Object.entries(sockets).forEach(([base, arr]) => {
            cleaned[base] = arr.filter(Boolean);
        });

        return cleaned;
    }, [scene]);
};


export const useAddModelToSession = () => {
    return useMutation({
        mutationKey: ["add-model-to-session"],
        mutationFn: ({ session_id, model_id, slot }: { session_id: string, model_id: string, slot?: number }) => add_model_to_session(session_id, model_id, slot),
    });
};