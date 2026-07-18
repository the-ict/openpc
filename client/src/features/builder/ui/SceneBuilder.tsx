"use client";

import React, { useEffect, useMemo, useRef } from 'react';
import { modelFileUrl } from '@/src/shared/config/URLS';
import { useCaseSockets, type Socket, type SocketsByType } from '../lib/hooks';
import { useGLTF, Html, Line } from '@react-three/drei';
import { ComponentBuild } from '.';
import { Group } from 'three';
import { fitAndCenter } from '../lib/scale';
import * as THREE from "three";

const SOCKET_DISPLAY: Record<string, string> = {
  CPU: "CPU",
  GPU: "GPU",
  RAM: "RAM",
  STORAGE: "STORAGE",
  MOTHER_BOARD: "MOTHERBOARD",
  POWER_SUPPLY: "POWER SUPPLY",
  COOLER: "COOLER",
  RADIATOR: "RADIATOR",
  CASE: "CASE",
};

function SocketMarkers({ sockets, components }: { sockets: SocketsByType; components: ComponentBuild[] }) {
  return (
    <>
      {Object.entries(sockets).map(([type, socketList]) =>
        socketList.map((socket, idx) => {
          const comp = components.find((c) => c.type === type && c.slot === idx);
          const color = comp ? "#C4D335" : "#ff5555";
          const label = (SOCKET_DISPLAY[type] || type) + (socketList.length > 1 ? ` ${idx + 1}` : "");

          return (
            <group key={`${type}_${idx}`} position={socket.position}>
              <mesh>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshBasicMaterial color={color} />
              </mesh>

              <Line points={[[0, 0, 0], [0, 0.45, 0]]} color={color} lineWidth={2} />

              <Html position={[0, 0.6, 0]} center distanceFactor={undefined} className="pointer-events-none select-none">
                <div
                  style={{ borderColor: color }}
                  className="whitespace-nowrap rounded-md border bg-black/80 px-2 py-1 text-center shadow-lg backdrop-blur-sm"
                >
                  <div className="text-[11px] font-bold tracking-wide" style={{ color }}>
                    {label}
                  </div>
                  <div className="text-[10px] text-white/90">
                    {comp ? comp.name : "Bo'sh"}
                  </div>
                </div>
              </Html>
            </group>
          );
        })
      )}
    </>
  );
}


interface ModelComponentProps {
  component: ComponentBuild,
  set_component_refs: React.Dispatch<React.SetStateAction<Record<string, React.RefObject<Group | null>>>>;
  position: [number, number, number];
  rotation: [number, number, number];
  caseLongest: number;
};

function ModelComponent({ component, set_component_refs, position, rotation, caseLongest }: ModelComponentProps) {
  const modelUrl = modelFileUrl(component.modelFile);

  const { scene } = useGLTF(modelUrl);
  const ref = useRef<Group | null>(null);

  useEffect(() => {
    if (ref.current) {
      set_component_refs(prev => ({ ...prev, [component.instanceId]: ref }));
    };
  }, [ref, component.instanceId, set_component_refs]);

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    console.log("bbox size:", box.getSize(new THREE.Vector3()));
    console.log("bbox center:", box.getCenter(new THREE.Vector3()));
    console.log("root position/scale/rotation:", scene.position, scene.scale, scene.rotation);
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

    fitAndCenter(clone, caseLongest, component.type);

    return clone;
  }, [scene, caseLongest, component.type]);

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
  const caseLongest = useMemo(
    () => {
      const size = new THREE.Box3().setFromObject(caseScene).getSize(new THREE.Vector3());
      return Math.max(size.x, size.y, size.z) || 1;
    },
    [caseScene]
  );

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
          const socket = socketList?.[component.slot ?? 0];

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
              caseLongest={caseLongest}
            />
          )
        })
      )}

      {showSockets && (
        <SocketMarkers sockets={socket_points} components={other_components} />
      )}
    </group>
  )
}
