"use client";

import React, { useEffect, useMemo, useRef } from 'react';
import { modelFileUrl } from '@/src/shared/config/URLS';
import { useCaseSockets } from '../lib/hooks';
import { useGLTF } from '@react-three/drei';
import { ComponentBuild } from '.';
import { Group } from 'three';


interface ModelComponentProps {
  set_component_refs: React.Dispatch<React.SetStateAction<Record<string, React.RefObject<Group | null>>>>;
  position: [number, number, number];
  rotation: [number, number, number];
  component: ComponentBuild,
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
    return clone;
  }, [scene, component.type]);

  return (
    <group ref={ref} position={position} rotation={rotation}>
      <primitive object={cloned} />
    </group>
  );
};

export function RenderCaseModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const cloned = useMemo(() => scene.clone(), [scene]);
  return <primitive object={cloned} name="case-model"/>;
};

interface SceneBuilderProps {
  components: ComponentBuild[];
  setComponentRef: React.Dispatch<React.SetStateAction<Record<string, React.RefObject<Group | null>>>>;
  showSockets?: boolean;
};

export default function SceneBuilder({ components, setComponentRef, showSockets }: SceneBuilderProps) {
  const case_component = components.find(c => c.type === "CASE");
  const caseUrl = case_component?.modelFile ? modelFileUrl(case_component.modelFile) : "";

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
