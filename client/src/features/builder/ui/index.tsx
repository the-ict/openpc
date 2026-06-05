"use client";

import { CameraControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { requirements } from '../lib/data';
import React, { useState } from 'react';

export const BuilderPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('cpu');
    const [activeBuild, setActiveBuild] = useState<Record<string, number>>({});
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
    const [selectedType, setSelectedType] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');


    return (
        <div className="flex h-screen w-screen bg-[#0A0A0A] text-[#FFFFFF] overflow-hidden font-sans select-none antialiased flex-col items-start">
            <header className="border-b border-[#555] bg-[#0A0A0A]/80 backdrop-blur-md sticky top-0 z-50 px-8 py-4 flex items-center justify-between w-full">
                <div className="flex items-center gap-2 select-none">
                    <span className="text-xl font-bold tracking-tight italic">
                        open<span className="text-[#E4E728] not-italic">PC</span>
                    </span>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                    {requirements.map((req, idx) => {
                        const isSelected = selectedCategory === req.name.toLowerCase();
                        return (
                            <button
                                key={idx}
                                onClick={() => setSelectedCategory(req.name.toLowerCase())}
                                className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-medium transition-all duration-200 cursor-pointer ${isSelected
                                    ? 'bg-neutral-900 text-[#E4E728] border-neutral-800'
                                    : 'bg-transparent text-neutral-400 border-transparent hover:text-white hover:bg-neutral-900/40'
                                    }`}
                            >
                                {req.icon}
                                <span>{req.name}</span>
                            </button>
                        );
                    })}
                </div>
            </header>

            <main className="flex-1 h-full relative bg-radial from-neutral-900/40 to-[#0A0A0A] w-full">
                <Canvas camera={{ position: [0, 0, 5] }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <mesh>
                        <sphereGeometry args={[1, 32, 32]} />
                        <meshStandardMaterial color="hotpink" />
                    </mesh>

                    <CameraControls makeDefault />
                </Canvas>
            </main>
        </div>
    );
};

export default BuilderPage;