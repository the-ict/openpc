"use client";

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { categories } from '../lib/data';

export const BuilderPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>('kooler');
    const [searchQuery, setSearchQuery] = useState<string>('');

    return (
        <div className="flex h-screen w-screen bg-[#0A0A0A] overflow-hidden font-sans select-none">
            <aside className="w-70 h-full flex flex-col gap-3 p-4 overflow-y-auto bg-transparent z-10 shrink-0">
                {categories.map((category) => {
                    const isKooler = category.id === 'kooler';
                    const isActive = activeCategory === category.id;

                    return (
                        <div key={category.id} className="w-full flex flex-col gap-2">
                            <button
                                onClick={() => setActiveCategory(category.id)}
                                className={`w-full py-3 px-6 rounded-full font-bold text-base transition-all duration-200 text-center text-black
                  ${isKooler
                                        ? 'bg-[#C4D335] hover:bg-[#b3c22e]'
                                        : 'bg-[#999999] hover:bg-gray-400'
                                    }`}
                            >
                                {category.label}
                            </button>

                            {isKooler && isActive && (
                                <div className="w-full bg-[#2A2A2A] rounded-2xl p-3 flex flex-col gap-3 mt-1">
                                    <input
                                        type="text"
                                        placeholder="qidiring...."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-[#D9D9D9] text-black placeholder-gray-600 px-4 py-2 text-sm font-bold focus:outline-none"
                                    />

                                    <div className="w-full bg-[#D9D9D9] p-2 flex gap-3 text-black items-start cursor-pointer hover:bg-gray-300 transition-colors">
                                        <div className="w-16 h-16 bg-[#E52A1A] shrink-0" />

                                        <div className="flex flex-col text-sm font-bold leading-tight pt-1">
                                            <span>kooler 70</span>
                                            <span>75</span>
                                            <span className="mt-1">74.33$</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </aside>

            <main className="flex-1 h-full relative">
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 50 }}
                    gl={{ preserveDrawingBuffer: true }}
                    className="w-full h-full cursor-grab active:cursor-grabbing"
                >
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} />

                    <Stage environment="city" intensity={0.6}>
                        <mesh>
                            <boxGeometry args={[1.5, 1.5, 1.5]} />
                            <meshStandardMaterial color="#C4D335" roughness={0.3} />
                        </mesh>
                    </Stage>

                    <OrbitControls
                        enableZoom={true}
                        makeDefault
                        maxPolarAngle={Math.PI / 2}
                    />
                </Canvas>

                <div className="absolute top-4 right-4 pointer-events-none text-zinc-600 text-xs font-mono">
                    3D VIEWPORT CANVAS Active
                </div>
            </main>

        </div>
    );
};

export default BuilderPage;