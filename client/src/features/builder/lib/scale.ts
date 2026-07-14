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
    CASE: 1,
};

export function fitAndCenter(clone: THREE.Object3D, _caseLongest?: number, _type?: string): void {
    const box2 = new THREE.Box3().setFromObject(clone);
    const center = box2.getCenter(new THREE.Vector3());
    clone.position.sub(center);
}
