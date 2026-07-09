"use client";

import React, { useEffect, useMemo, useRef } from 'react';
import { UPLOAD_URL } from '@/src/shared/config/URLS';
import { useCaseSockets } from '../lib/hooks';
import { useGLTF } from '@react-three/drei';
import { ComponentBuild } from '.';
import { Group } from 'three';
import * as THREE from "three";


interface SceneBuilderProps {
  components: ComponentBuild[];
  setComponentRef: React.Dispatch<React.SetStateAction<Record<string, React.RefObject<Group | null>>>>;
};

interface ModelComponentProps {
  component: ComponentBuild,
  set_component_refs: React.Dispatch<React.SetStateAction<Record<string, React.RefObject<Group | null>>>>;
  position: [number, number, number];
  rotation: [number, number, number];
};

function ModelComponent({ component, set_component_refs, position, rotation }: ModelComponentProps) {
  const modelUrl = UPLOAD_URL + component.modelFile;

  const { scene } = useGLTF(modelUrl);
  const ref = useRef<Group | null>(null);

  console.log("model component scene scale: ", scene.scale);

  useEffect(() => {
    if (ref.current) {
      set_component_refs(prev => ({ ...prev, [component.type]: ref }));
    };
  }, [ref, component.type, set_component_refs]);

  useEffect(() => {
    scene.traverse((obj) => {
      console.log(obj.name, obj.type, obj.scale);
    });
  }, [scene]);

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
  }, [scene]);

  return (
    <group ref={ref} position={position} rotation={rotation}>
      <primitive object={cloned} />
    </group>
  );
};

function renderCaseModel(url: string) {
  const { scene } = useGLTF(url);

  const cloned = useMemo(() => {
    const clone = scene.clone();
    return clone;
  }, [scene]);

  return <primitive object={cloned} />;
};

export default function SceneBuilder({ components, setComponentRef }: SceneBuilderProps) {
  const case_component = components.find(c => c.type === "CASE");

  const caseUrl = case_component?.modelFile ? UPLOAD_URL + case_component.modelFile : "";

  const socket_points = useCaseSockets(caseUrl);
  const other_components = components.filter(c => c.type !== "CASE");

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
