"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { UPLOAD_URL } from '@/src/shared/config/URLS';
import { useCaseSockets } from '../lib/hooks';
import { useGLTF } from '@react-three/drei';
import { Group } from 'three';

interface ComponentBuild {
  id: string;
  type: string;
  modelFile: string;
  name: string;
};

interface SceneBuilderProps {
  components: ComponentBuild[];
};

interface ModelComponentProps {
  component: ComponentBuild,
  set_component_refs: React.Dispatch<React.SetStateAction<React.RefObject<Group | null>[]>>;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

function ModelComponent({ component, set_component_refs, position, scale, rotation }: ModelComponentProps) {
  const modelUrl = UPLOAD_URL + component.modelFile;
  console.log("Loading model from:", modelUrl);
  
  const { scene } = useGLTF(modelUrl);
  const ref = useRef<Group | null>(null);

  useEffect(() => {
    if (ref.current) {
      set_component_refs(prev => [...prev, ref]);
      console.log("ref setted up");
    };
  }, [ref.current]);

  const cloned = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child: any) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
        if (child.material.envMapIntensity !== undefined) {
          child.material.envMapIntensity = 1.8;
        }
      }
    });
    return clone;
  }, [scene]);

  return (
    <group ref={ref} position={position} scale={scale} rotation={rotation}>
      <primitive object={cloned} />
    </group>
  );
};

function renderCaseModel(url: string) {
  console.log("Loading case model from:", url);
  console.log("Full URL check:", UPLOAD_URL, url);
  
  const { scene } = useGLTF(url);

  const cloned = useMemo(() => {
    const clone = scene.clone();
    return clone;
  }, [scene]);

  return <primitive object={cloned} />;
};

export default function SceneBuilder({ components }: SceneBuilderProps) {
  const [component_refs, set_component_refs] = useState<React.RefObject<Group | null>[]>([]);
  console.log("components: ", components);
  const case_component = components.find(c => c.type.toLowerCase() === "case");
  
  console.log("case_component:", case_component);
  console.log("case_component?.modelFile:", case_component?.modelFile);
  console.log("UPLOAD_URL:", UPLOAD_URL);
  
  const caseUrl = case_component?.modelFile ? UPLOAD_URL + case_component.modelFile : "";
  console.log("Final case URL:", caseUrl);
  
  const socket_points = useCaseSockets(caseUrl);
  const other_components = components.filter(c => c.type.toLowerCase() !== "case");

  console.log("socket_points: ", socket_points);

  useEffect(() => {
    console.log("component_refs: ", component_refs);
  }, [component_refs]);

  const case_group_ref = useRef<Group | null>(null);

  if (!case_component) {
    return null;
  };

  return (
    <group ref={case_group_ref}>
      {renderCaseModel(UPLOAD_URL + case_component.modelFile)}

      {other_components.length > 0 && (
        other_components.map((component, index) => {
          const socket = socket_points[component.type];
          if (!socket) {
            console.warn(`Socket topilmadi: socket_${component.type}. Artist bu nomni case'ga qo'shganmi?`);
          };

          return (
            <ModelComponent
              key={index}
              component={component}
              set_component_refs={set_component_refs}
              position={socket.position}
              rotation={socket.rotation}
              scale={[1, 1, 1]}
            />
          )
        })
      )}
    </group>
  )
}
