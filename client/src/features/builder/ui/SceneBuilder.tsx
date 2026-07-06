"use client";

import { useEffect, useMemo } from 'react';
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

function ModelComponent({ component }: { component: ComponentBuild; position: [number, number, number]; rotation: [number, number, number]; scale: [number, number, number] }) {
  const { scene, materials } = useGLTF(UPLOAD_URL + component.modelFile);
  const cloned = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    Object.values(materials).forEach((mat: any) => {
      if (mat.envMapIntensity !== undefined) mat.envMapIntensity = 1.8;
    });

    cloned.rotation.x = 0.5;
  }, [materials]);

  return <primitive object={cloned} />;
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
