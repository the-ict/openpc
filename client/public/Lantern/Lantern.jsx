import { useGLTF } from '@react-three/drei'

export function Lantern() {
  const { nodes, materials, scene } = useGLTF('/Lantern/Lantern.glb')

  console.log("scene: ", scene);
  console.log(nodes, "nodes");
  console.log(materials, "materials");
  const firePart = scene.getObjectByName("LNT_Fire")
  console.log("firePart: ", firePart);
  return (
    <group dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.LNT_Body.geometry}
        material={materials['Material.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.LNT_Fire.geometry}
        material={materials['Material.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.LNT_Glass.geometry}
        material={materials['Material.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.LNT_Handle.geometry}
        material={materials['Material.001']}
      />
    </group>
  )
}

useGLTF.preload('/Lantern/Lantern.glb')
