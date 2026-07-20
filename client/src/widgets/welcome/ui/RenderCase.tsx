import { useCaseSockets, Socket, SocketsByType } from "@/src/features/builder/lib/hooks";
import { RenderCaseModel } from "@/src/features/builder/ui/SceneBuilder";
import { IModel } from "@/src/shared/config/api/model/model.model";
import { modelFileUrl } from "@/src/shared/config/URLS";
import { useGLTF } from "@react-three/drei";
import RenderModel from "./RenderModel";
import * as THREE from "three";
import React from "react";

export type Vec3 = [number, number, number];

interface RenderCaseProps {
    case_model: IModel;
    cpu_model: IModel | null;
    gpu_model: IModel | null;
    ram_model: IModel | null;
    storage_model: IModel | null;
    setCasePartsRefs: React.Dispatch<React.SetStateAction<Record<string, React.RefObject<THREE.Group | null>>>>;
}

const RenderCase = ({ cpu_model, gpu_model, ram_model, storage_model, case_model, setCasePartsRefs }: RenderCaseProps) => {
    const caseUrl = modelFileUrl(case_model.model_file);
    const { scene: caseScene } = useGLTF(caseUrl);
    const sockets = useCaseSockets(caseUrl);

    console.log("sockets: ", sockets);

    const caseBox = React.useMemo(() => {
        const box = new THREE.Box3().setFromObject(caseScene);
        const size = box.getSize(new THREE.Vector3());
        return {
            center: box.getCenter(new THREE.Vector3()),
            size,
            caseSize: [size.x || 1, size.y || 1, size.z || 1] as Vec3,
        };
    }, [caseScene]);

    const resolveSocket = React.useCallback((sockets: SocketsByType, type: string): Socket => {
        const list = sockets[type];
        return (list && list[0]) ?? { position: [0, 0, 0], rotation: [0, 0, 0] };
    }, []);

    const components: IModel[] = [cpu_model, gpu_model, ram_model, storage_model].filter(
        (m): m is IModel => Boolean(m)
    );

    return (
        <group>
            {case_model.model_file && (
                <RenderCaseModel url={caseUrl} opacity={0.18} />
            )}

            {components.map((model: IModel) => {
                const socket_point = resolveSocket(sockets, model.type);
                console.log("socket point for welcome: ", socket_point);

                if (!sockets[model.type]) {
                    console.warn(
                        `Socket topilmadi: socket_${model.type} (${model.type}). Model markazda ko'rsatiladi.`
                    );
                }

                return (
                    <RenderModel
                        key={model.id}
                        model={model}
                        socket={socket_point}
                        caseSize={caseBox.caseSize}
                        setCasePartsRefs={setCasePartsRefs}
                    />
                );
            })}
        </group>
    );
};

export default RenderCase;
