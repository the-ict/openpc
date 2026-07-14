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
                console.log("key: ", child);

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

        const COMPONENT_TYPES = ["CPU", "GPU", "RAM", "STORAGE", "MOTHER_BOARD", "POWER_SUPPLY", "COOLER", "CASE"];
        COMPONENT_TYPES.forEach((type) => {
            if (sockets[type]) return;
            const match = Object.keys(sockets).find((k) => k === type || k.startsWith(type + "_"));
            if (match) sockets[type] = sockets[match];
        });

        const caseCenter = new THREE.Vector3();
        new THREE.Box3().setFromObject(scene).getCenter(caseCenter);
        Object.values(sockets).forEach((s) => {
            s.position[0] -= caseCenter.x;
            s.position[1] -= caseCenter.y;
            s.position[2] -= caseCenter.z;
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