"use client";

import { Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { requirements, cpuModels } from '../lib/data';
import { Popover, PopoverContent, PopoverTrigger, PopoverPortal } from "@/src/shared/ui/popover";
import { Search, X, ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import { Modal, ModalTrigger, ModalPortal, ModalContent } from '@/src/shared/ui/dialog';

export const BuilderPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('cpu');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
    const [selectedType, setSelectedType] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedModelId, setSelectedModelId] = useState<number | null>(null);

    return (
        <div className="flex h-screen w-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden font-sans select-none">
            <aside className="w-full max-w-md h-full flex flex-col overflow-hidden z-10 shrink-0 bg-slate-950/60 border-r border-slate-700/50">
                <div className="flex-1 border-b border-slate-700/30 py-4 px-4">
                    <div className="px-2 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Components</div>
                    
                    <div className="space-y-2 overflow-y-auto h-full">
                        {requirements.map((req, idx) => (
                            <button
                                onClick={() => setSelectedCategory(req.name.toLowerCase())}
                                key={idx}
                                className={`w-full flex items-center cursor-pointer justify-between gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                    selectedCategory === req.name.toLowerCase()
                                        ? 'bg-linear-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/50 shadow-lg shadow-cyan-500/10'
                                        : 'border border-transparent text-slate-300 hover:bg-slate-800/30'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    {req.icon}
                                    <span className="text-sm font-medium">{req.name}</span>
                                </div>
                                <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex-none px-4 py-3 border-b border-slate-700/30 bg-slate-950/40">
                        <h2 className="text-sm font-semibold text-slate-200 capitalize mb-2">{selectedCategory}</h2>
                        
                        <div className="mb-2 flex items-center gap-2 px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg focus-within:border-cyan-500/50 transition-colors">
                            <Search className="w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 outline-none text-sm"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-200">
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Filters:</span>

                            <Popover>
                                <PopoverTrigger>
                                    <>
                                        Price
                                        <ChevronDown className="w-3 h-3" />
                                    </>
                                </PopoverTrigger>
                                <PopoverPortal>
                                    <PopoverContent>
                                        <div className="space-y-3">
                                            <label className="text-xs font-semibold text-slate-300">Price Range</label>
                                            <div className="flex items-center justify-between gap-2">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={priceRange[0]}
                                                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                                    className="w-20 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-slate-200 text-center"
                                                    placeholder="Min"
                                                />
                                                <span className="text-slate-400">-</span>
                                                <input
                                                    type="number"
                                                    max="10000"
                                                    value={priceRange[1]}
                                                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                                    className="w-20 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-slate-200 text-center"
                                                    placeholder="Max"
                                                />
                                            </div>
                                            <div className="text-xs text-cyan-400">${priceRange[0]} - ${priceRange[1]}</div>
                                        </div>
                                    </PopoverContent>
                                </PopoverPortal>
                            </Popover>

                            <Popover>
                                <PopoverTrigger>
                                    <>
                                        Type
                                        <ChevronDown className="w-3 h-3" />
                                    </>
                                </PopoverTrigger>
                                <PopoverPortal>
                                    <PopoverContent>
                                        <div className="space-y-2">
                                            {['all', 'gaming', 'workstation', 'budget', 'high-end'].map((type) => (
                                                <label key={type} className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-800/50 rounded cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="type"
                                                        value={type}
                                                        checked={selectedType === type}
                                                        onChange={(e) => setSelectedType(e.target.value)}
                                                        className="w-3 h-3 accent-cyan-500"
                                                    />
                                                    <span className="text-xs text-slate-300 capitalize">{type}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </PopoverContent>
                                </PopoverPortal>
                            </Popover>

                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setPriceRange([0, 5000]);
                                    setSelectedType('all');
                                }}
                                className="text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
                            >
                                Reset
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-3 py-3">
                        <div className="space-y-2">
                            {cpuModels.map((item, idx) => (
                                <Modal key={idx}>
                                    <ModalTrigger>
                                        <div
                                            className="flex items-center justify-between p-3 rounded-lg bg-slate-800/40 border border-slate-700/40 hover:border-cyan-500/40 hover:bg-slate-800/60 transition-all duration-200 group cursor-pointer w-full text-left"
                                        >
                                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                                <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center group-hover:bg-slate-600/50 transition-colors shrink-0">
                                                    <img src={item.img} alt={item.name} className="w-5 h-5 opacity-80" />
                                                </div>
                                                <div className="flex flex-col gap-0.5 min-w-0">
                                                    <span className="text-xs font-semibold text-slate-200 truncate">{item.name}</span>
                                                    <span className="text-xs text-slate-400">Xususiyatlari</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                <span className="text-sm font-bold text-cyan-400 whitespace-nowrap">${item.price}</span>
                                            </div>
                                        </div>
                                    </ModalTrigger>
                                    <ModalPortal>
                                        <ModalContent>
                                            <h2 className="text-lg font-bold mb-4 text-slate-100">{item.name}</h2>
                                            <div className="space-y-4 text-slate-300">
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className="w-16 h-16 rounded-lg bg-slate-700/50 flex items-center justify-center">
                                                        <img src={item.img} alt={item.name} className="w-10 h-10 opacity-80" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-base font-semibold text-slate-100">{item.name}</h3>
                                                        <p className="text-lg font-bold text-cyan-400">${item.price}</p>
                                                    </div>
                                                </div>
                                                <div className="border-t border-slate-700/50 pt-4">
                                                    <h4 className="font-semibold text-slate-200 mb-3">Specifications</h4>
                                                    <div className="space-y-2 text-sm">
                                                        <div className="flex justify-between">
                                                            <span className="text-slate-400">Type:</span>
                                                            <span className="text-slate-200 capitalize">{selectedCategory}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-slate-400">Category:</span>
                                                            <span className="text-slate-200 capitalize">Premium Component</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-slate-400">Availability:</span>
                                                            <span className="text-green-400 font-semibold">In Stock</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="w-full mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg transition-colors">
                                                    Add to Build
                                                </button>
                                            </div>
                                        </ModalContent>
                                    </ModalPortal>
                                </Modal>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            <main className="flex-1 h-full relative">
                <Canvas
                    gl={{ preserveDrawingBuffer: true }}
                    className="w-full h-full"
                >
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} />

                    <Stage environment="city" intensity={0.6}>
                        <mesh>
                            <boxGeometry args={[1.5, 1.5, 1.5]} />
                            <meshStandardMaterial color="#06b6d4" roughness={0.3} />
                        </mesh>
                    </Stage>
                </Canvas>
            </main>
        </div>
    );
};

export default BuilderPage;