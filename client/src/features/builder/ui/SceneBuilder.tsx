"use client";

import React, { useEffect, useMemo, useRef } from 'react';
import { getLocalModelUrl } from '@/src/shared/config/URLS';
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
  const modelUrl = getLocalModelUrl(component.type);

  const { scene } = useGLTF(modelUrl, true);
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
  const { scene } = useGLTF(url, true);
  const cloned = useMemo(() => scene.clone(), [scene]);
  return <primitive object={cloned} name="case-model"/>;
};

interface SceneBuilderProps {
  components: ComponentBuild[];
  setComponentRef: React.Dispatch<React.SetStateAction<Record<string, React.RefObject<Group | null>>>>;
};

export default function SceneBuilder({ components, setComponentRef }: SceneBuilderProps) {
  const case_component = components.find(c => c.type === "CASE");
  const caseUrl = case_component ? getLocalModelUrl(case_component.type) : "";

  const socket_points = useCaseSockets(caseUrl);
  const other_components = components.filter(c => c.type !== "CASE");

  const case_group_ref = useRef<Group | null>(null);

  if (!case_component) {
    return null;
  };

  return (
    <group ref={case_group_ref}>
      {case_component.modelFile && (
        <RenderCaseModel url={getLocalModelUrl(case_component.type)} />
      )}

      {other_components.length > 0 && (
        other_components.map((component, index) => {
          const socketList = socket_points[component.type];
          const socket = socketList?.[component.slot ?? 0];

          if (!socket) {
            return (
              <ModelComponent
                key={component.instanceId ?? index}
                component={component}
                set_component_refs={setComponentRef}
                position={[index * 0.3, 0.5, 0]}
                rotation={[0, 0, 0]}
              />
            );
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
