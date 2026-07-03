import { useGLTF } from '@react-three/drei'

export function Lantern() {
  const { nodes, materials } = useGLTF('/Lantern/Lantern.glb');

  console.log(nodes);
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
