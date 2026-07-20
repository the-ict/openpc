import * as THREE from "three";
import { MODEL_TYPES } from "@/src/shared/config/api/model/model.model";

export const COMPONENT_FIT_FACTOR: Record<MODEL_TYPES, number> = {
    CPU: 0.18,
    GPU: 0.72,
    RAM: 0.5,
    MOTHER_BOARD: 0.85,
    STORAGE: 0.45,
    POWER_SUPPLY: 0.55,
    COOLER: 0.5,
    RADIATOR: 0.6,
    CASE: 1,
};

export const NO_FIT = true;

export function fitAndCenter(
    clone: THREE.Object3D,
    caseSize: THREE.Vector3 = new THREE.Vector3(1, 1, 1),
    type?: string
): void {
    const factor = COMPONENT_FIT_FACTOR[(type as MODEL_TYPES) ?? "CASE"] ?? 1;

    if (NO_FIT) {
        return;
    }

    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());

    const longest = Math.max(caseSize.x, caseSize.y, caseSize.z) || 1;

    const sx = (caseSize.x * factor) / (size.x || 1);
    const sy = (caseSize.y * factor) / (size.y || 1);
    const sz = (caseSize.z * factor) / (size.z || 1);

    const scale = Math.min(sx, sy, sz, longest * factor);

    clone.scale.setScalar(scale);
}
