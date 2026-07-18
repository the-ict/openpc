import * as THREE from "three";
import { MODEL_TYPES } from "@/src/shared/config/api/model/model.model";

export const COMPONENT_FIT_FACTOR: Record<MODEL_TYPES, number> = {
    CPU: 0.15,
    GPU: 0.6,
    RAM: 0.2,
    MOTHER_BOARD: 0.7,
    STORAGE: 0.18,
    POWER_SUPPLY: 0.3,
    COOLER: 0.5,
    RADIATOR: 0.5,
    CASE: 1,
};

export function fitAndCenter(clone: THREE.Object3D, caseLongest = 1, type?: string): void {
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    clone.position.sub(center);

    const longest = Math.max(size.x, size.y, size.z) || 1;
    const factor = COMPONENT_FIT_FACTOR[(type as MODEL_TYPES) ?? "CASE"] ?? 1;
    const scale = (caseLongest * factor) / longest;

    clone.scale.setScalar(scale);
}
