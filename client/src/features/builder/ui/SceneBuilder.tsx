"use client";

import { Group, Mesh } from 'three';
import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { UPLOAD_URL } from '@/src/shared/config/URLS';

interface ComponentBuild {
  id: string;
  type: string;
  modelFile: string;
  name: string;
};

interface SceneBuilderProps {
  components: ComponentBuild[];
  focusTarget?: string;
};

const COMPONENT_POSITIONS: Record<string, { position: [number, number, number]; rotation: [number, number, number]; scale: [number, number, number] }> = {
  case: { position: [0, 5, -30], rotation: [0, 0, 0], scale: [1, 1, 1] },
  motherboard: { position: [0, 0.5, 0], rotation: [0, 0, 0], scale: [0.8, 0.8, 0.8] },
  cpu: { position: [0, 0.8, 0], rotation: [0, 0, 0], scale: [0.3, 0.3, 0.3] },
  gpu: { position: [0.5, 0.3, 0], rotation: [0, -Math.PI / 2, 0], scale: [0.7, 0.7, 0.7] },
  ram: { position: [-0.3, 0.7, 0], rotation: [0, 0, 0], scale: [0.4, 0.4, 0.4] },
  storage: { position: [0, -0.3, 0.5], rotation: [0, 0, 0], scale: [0.5, 0.5, 0.5] },
  power_supply: { position: [0, -0.5, -0.5], rotation: [0, 0, 0], scale: [0.6, 0.6, 0.6] },
  cooler: { position: [0, 1.0, 0], rotation: [0, 0, 0], scale: [0.4, 0.4, 0.4] },
};

function ModelComponent({ component, position, rotation, scale }: { component: ComponentBuild; position: [number, number, number]; rotation: [number, number, number]; scale: [number, number, number] }) {
  const { nodes, materials } = useGLTF(UPLOAD_URL + component.modelFile);
  const groupRef = useRef<Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.position.set(...position);
      groupRef.current.rotation.set(...rotation);
      groupRef.current.scale.set(...scale);
    }
  }, [component, position, rotation, scale]);

  return (
    <group ref={groupRef}>
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      {Array.from({ length: 203 }).map((_, i) => (
        <mesh
          key={i}
          castShadow
          receiveShadow
          geometry={(nodes[`defaultMaterial${i === 0 ? '' : `_${i}`}`] as Mesh)?.geometry}
          material={materials.texturedFacets}
        />
      ))}
    </group>
  );
}

export default function SceneBuilder({ components, focusTarget }: SceneBuilderProps) {
  const caseComponent = components.find(c => c.type === 'case');
  const otherComponents = components.filter(c => c.type !== 'case');

  return (
    <group>
      {caseComponent && (
        <ModelComponent
          key={caseComponent.id}
          component={caseComponent}
          position={COMPONENT_POSITIONS.case.position}
          rotation={COMPONENT_POSITIONS.case.rotation}
          scale={COMPONENT_POSITIONS.case.scale}
        />
      )}

      {otherComponents.map(component => (
        <ModelComponent
          key={component.id}
          component={component}
          position={COMPONENT_POSITIONS[component.type]?.position || COMPONENT_POSITIONS.case.position}
          rotation={COMPONENT_POSITIONS[component.type]?.rotation || COMPONENT_POSITIONS.case.rotation}
          scale={COMPONENT_POSITIONS[component.type]?.scale || COMPONENT_POSITIONS.case.scale}
        />
      ))}
    </group>
  );
}
