"use client";

import { Lantern} from "../../../../public/Lantern/Lantern";
import CameraController from "./CameraController";
import { Canvas } from '@react-three/fiber';
import { requirements } from '../lib/data';
import React, { useState } from 'react';
import ModalSheet from './modalsSheet';


export const BuilderPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('cpu');
    const [activeBuild, setActiveBuild] = useState<Record<string, number>>({});
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
    const [selectedType, setSelectedType] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [focusTarget, setFocusTarget] = useState<string>("cpu");
    const [focusFire, setFocusFire] = useState<boolean>(false);

    return (
        <div className="flex h-screen w-screen bg-[#0A0A0A] text-[#FFFFFF] overflow-hidden font-sans select-none antialiased flex-col items-start">
            <header className="border-b border-[#555] bg-[#0A0A0A]/80 backdrop-blur-md sticky top-0 z-50 px-8 py-4 flex items-center justify-between w-full">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                    {requirements.map((req, idx) => {
                        const isSelected = selectedCategory === req.name.toLowerCase();
                        return (
                            <button
                                key={idx}
                                onClick={() => {
                                    setSelectedCategory(req.name.toLowerCase());
                                    setFocusTarget(req.name);
                                }}
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

            <aside className="flex gap-3 items-start h-full w-full">
                <ModalSheet activeBuild={activeBuild} setActiveBuild={setActiveBuild} priceRange={priceRange} setPriceRange={setPriceRange} setSelectedType={setSelectedType} selectedType={selectedType} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <main className="flex-10 h-full relative bg-radial from-neutral-900/40 to-[#0A0A0A] w-full">
                    <Canvas camera={{ position: [0, 0, 5] }}>
                        <ambientLight intensity={1.5} />
                        <directionalLight
                            position={[5, 5, 5]}
                            intensity={3}
                            castShadow
                        />
                        <directionalLight position={[-5, -5, -5]} intensity={1} />

                        <Lantern />

                        <CameraController focusTarget={focusFire ? 'fire' : focusTarget} />
                    </Canvas>
                </main>
            </aside>
        </div>
    );
};

export default BuilderPage;