import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import { Suspense } from 'react'
import { Model } from '../../../../public/models/Pcmodal'

export default function Welcome() {
    return (
        <div className="h-screen w-full bg-black">
            <Canvas shadows camera={{ position: [0, 0, 1], fov: 45 }}>
                <Suspense fallback={null}>
                    <Stage environment="city" intensity={0.6} adjustCamera={false}>
                        <Model />
                    </Stage>
                </Suspense>
                <OrbitControls makeDefault enableZoom={false} />
            </Canvas>
        </div>
    )
}
