"use client";

import { useCaseSockets } from '../lib/hooks';
import React, { useEffect, useMemo, useRef } from 'react';
import { modelFileUrl } from '@/src/shared/config/URLS';
import { useGLTF } from '@react-three/drei';
import { ComponentBuild } from '.';
import * as THREE from "three";
import { Group } from 'three';


interface ModelComponentProps {
  component: ComponentBuild,
  set_component_refs: React.Dispatch<React.SetStateAction<Record<string, React.RefObject<Group | null>>>>;
  position: [number, number, number];
  rotation: [number, number, number];
};

function ModelComponent({ component, set_component_refs, position, rotation }: ModelComponentProps) {
  const modelUrl = modelFileUrl(component.modelFile);

  const { scene } = useGLTF(modelUrl);
  const ref = useRef<Group | null>(null);

  useEffect(() => {
    if (ref.current) {
      set_component_refs(prev => ({ ...prev, [component.instanceId]: ref }));
    };
  }, [ref, component.instanceId, set_component_refs]);

  const cloned = useMemo(() => {
    const clone = scene.clone();

    clone.traverse((child: any) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
        if (child.material.envMapIntensity !== undefined) {
          child.material.envMapIntensity = 0.01;
        }
      }
    });

    return clone;
  }, [scene, component.type]);

  return (
    <group ref={ref} position={position} rotation={rotation}>
      <primitive object={cloned} />
    </group>
  );
};

export function RenderCaseModel({ url, opacity }: { url: string; opacity?: number }) {
  const { scene } = useGLTF(url);

  const cloned = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if (child.name.toLowerCase().includes("glass")) {
        child.visible = false;
        return;
      }

      const mesh = child as THREE.Mesh;
      if (mesh.isMesh && mesh.material) {
        const apply = (m: THREE.Material) => {
          const mat = m as THREE.MeshStandardMaterial;
          if (mat.envMapIntensity !== undefined) {
            mat.envMapIntensity = 0.4;
          }
          if (opacity !== undefined) {
            m.transparent = true;
            m.opacity = opacity;
            m.depthWrite = false;
          }
        };
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(apply);
        } else {
          apply(mesh.material);
        }
      }
    });
    return clone;
  }, [scene, opacity]);

  return <primitive object={cloned} />;
};

interface SceneBuilderProps {
  components: ComponentBuild[];
  setComponentRef: React.Dispatch<React.SetStateAction<Record<string, React.RefObject<Group | null>>>>;
  showSockets?: boolean;
};

export default function SceneBuilder({ components, setComponentRef, showSockets }: SceneBuilderProps) {
  const case_component = components.find(c => c.type === "CASE");

  const caseUrl = case_component?.modelFile ? modelFileUrl(case_component.modelFile) : "";

  const { scene: caseScene } = useGLTF(caseUrl);

  const socket_points = useCaseSockets(caseUrl);
  const other_components = components.filter(c => c.type !== "CASE");

  const case_group_ref = useRef<Group | null>(null);

  if (!case_component) {
    return null;
  };

  return (
    <group ref={case_group_ref}>
      {case_component.modelFile && (
        <RenderCaseModel url={modelFileUrl(case_component.modelFile)} />
      )}

      {other_components.length > 0 && (
        other_components.map((component, index) => {
          const socketList = socket_points[component.type];
          console.log("socketList: ", socketList);
          const socket = socketList?.[component.slot ?? 0];
          console.log("component type: ", component.type, "component slot: ", component.slot);

          if (!socket) {
            console.warn(`Socket topilmadi: socket_${component.type}${component.slot ? "_" + component.slot : ""}. Artist bu nomni case'ga qo'shganmi?`);
            return null;
          };

          return (
            <ModelComponent
              key={component.instanceId ?? index}
              component={component}
              set_component_refs={setComponentRef}
              position={socket.position}
              rotation={socket.rotation}
            />
          )
        })
      )}
    </group>
  )
}
