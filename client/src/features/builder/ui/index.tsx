"use client";

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stage } from '@react-three/drei';
import { Search, X, ChevronDown, Plus, Check } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger, PopoverPortal } from "@/src/shared/ui/popover";
import { Modal, ModalTrigger, ModalPortal, ModalContent } from '@/src/shared/ui/dialog';
import { requirements, cpuModels } from '../lib/data';

export const BuilderPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('cpu');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
    const [selectedType, setSelectedType] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [activeBuild, setActiveBuild] = useState<Record<string, number>>({});

    const formatPrice = (usdAmount: number) => {
        return `$${usdAmount.toLocaleString()}`;
    };

    return (
        <div className="flex h-screen w-screen bg-[#0A0A0A] text-[#FFFFFF] overflow-hidden font-sans select-none antialiased">
            <aside className="w-full max-w-md h-full flex flex-col overflow-hidden z-10 shrink-0 bg-[#0A0A0A] border-r border-neutral-900">
                
                <div className="px-6 py-4 border-b border-neutral-900 flex items-center justify-between bg-[#0A0A0A]">
                    <div className="text-xl font-bold tracking-tight italic">
                        open<span className="text-[#E4E728] not-italic">PC</span>
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                        3D Configurator
                    </span>
                </div>
                <div className="flex-none border-b border-neutral-900 bg-neutral-950/40 p-4">
                    <div className="text-[11px] font-mono tracking-widest text-neutral-500 uppercase mb-3 px-1">
                        Komponentlar
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                        {requirements.map((req, idx) => {
                            const isSelected = selectedCategory === req.name.toLowerCase();
                            return (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedCategory(req.name.toLowerCase())}
                                    className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-medium transition-all duration-200 cursor-pointer ${
                                        isSelected
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
                </div>

                <div className="flex-none px-5 py-4 border-b border-neutral-900 bg-neutral-950/20">
                    <div className="flex items-center gap-2 px-3 py-2.5 bg-neutral-900 border border-neutral-900 rounded-xl focus-within:border-neutral-800 transition-all duration-200">
                        <Search className="w-4 h-4 text-neutral-500" />
                        <input
                            type="text"
                            placeholder="Komponent qidirish..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1 bg-transparent text-neutral-200 placeholder-neutral-600 outline-none text-sm"
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="text-neutral-500 hover:text-neutral-200">
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                        <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">Filtr:</span>

                        <Popover>
                            <PopoverTrigger props={{ className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900/60 border border-neutral-900 text-xs text-neutral-300 hover:border-neutral-800 transition-colors" }}>
                                Narx <ChevronDown className="w-3 h-3 text-neutral-500" />
                            </PopoverTrigger>
                            <PopoverPortal>
                                <PopoverContent props={{ className: "bg-[#0A0A0A] border border-neutral-800 p-4 rounded-xl shadow-2xl space-y-3 z-50" }}>
                                    <label className="text-xs font-medium text-neutral-400 block">Narx oralig'ini kiriting</label>
                                    <div className="flex items-center justify-between gap-2">
                                        <input
                                            type="number"
                                            value={priceRange[0]}
                                            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                            className="w-24 px-2 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-center outline-none focus:border-neutral-700"
                                            placeholder="Min"
                                        />
                                        <span className="text-neutral-600">-</span>
                                        <input
                                            type="number"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                            className="w-24 px-2 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-center outline-none focus:border-neutral-700"
                                            placeholder="Max"
                                        />
                                    </div>
                                </PopoverContent>
                            </PopoverPortal>
                        </Popover>

                        <Popover>
                            <PopoverTrigger props={{ className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900/60 border border-neutral-900 text-xs text-neutral-300 hover:border-neutral-800 transition-colors" }}>
                                Turi <ChevronDown className="w-3 h-3 text-neutral-500" />
                            </PopoverTrigger>
                            <PopoverPortal>
                                <PopoverContent props={{ className: "bg-[#0A0A0A] border border-neutral-800 p-2 rounded-xl shadow-2xl space-y-1 z-50 min-w-[140px]" }}>
                                    {['all', 'gaming', 'workstation', 'budget'].map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setSelectedType(type)}
                                            className={`w-full text-left px-3 py-1.5 text-xs rounded-lg capitalize transition-colors ${
                                                selectedType === type ? 'bg-neutral-900 text-[#E4E728]' : 'text-neutral-400 hover:bg-neutral-900/40 hover:text-white'
                                            }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </PopoverContent>
                            </PopoverPortal>
                        </Popover>

                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setPriceRange([0, 5000]);
                                setSelectedType('all');
                            }}
                            className="text-[11px] text-neutral-600 hover:text-neutral-400 font-medium ml-auto transition-colors"
                        >
                            Tozalash
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-neutral-950/10">
                    {cpuModels.map((item, idx) => {
                        const isAdded = activeBuild[selectedCategory] === item.id;
                        return (
                            <Modal key={idx}>
                                <div className="group relative bg-neutral-900/20 hover:bg-neutral-900/50 border border-neutral-900/60 hover:border-neutral-800 rounded-xl p-3 flex items-center justify-between transition-all duration-200">
                                    <ModalTrigger props={{ className: "flex items-center gap-3 flex-1 min-w-0 text-left cursor-pointer" }}>
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <div className="w-11 h-11 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
                                                <img src={item.img} alt={item.name} className="w-6 h-6 object-contain opacity-70 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-xs font-bold text-neutral-200 group-hover:text-white transition-colors truncate">{item.name}</span>
                                                <span className="text-[11px] text-neutral-500 font-mono mt-0.5">Batafsil ko'rish</span>
                                            </div>
                                        </div>
                                    </ModalTrigger>

                                    <div className="flex items-center gap-3 ml-2 shrink-0">
                                        <span className="text-xs font-mono font-bold text-neutral-300">{formatPrice(item.price)}</span>
                                        <button 
                                            onClick={() => setActiveBuild(prev => ({ ...prev, [selectedCategory]: item.id }))}
                                            className={`p-1.5 rounded-lg border transition-all duration-200 ${
                                                isAdded 
                                                    ? 'bg-[#E4E728] text-[#0A0A0A] border-[#E4E728]' 
                                                    : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
                                            }`}
                                        >
                                            {isAdded ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5" />}
                                        </button>
                                    </div>
                                </div>

                                <ModalPortal>
                                    <ModalContent props={{ className: "bg-[#0A0A0A] border border-neutral-900 text-white p-6 max-w-md w-full rounded-2xl shadow-2xl" }}>
                                        <div className="flex items-start gap-4 pb-4 border-b border-neutral-900">
                                            <div className="w-16 h-16 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
                                                <img src={item.img} alt={item.name} className="w-10 h-10 object-contain" />
                                            </div>
                                            <div>
                                                <h3 className="text-base font-bold text-white">{item.name}</h3>
                                                <p className="text-lg font-mono font-bold text-[#E4E728] mt-1">{formatPrice(item.price)}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="py-4 space-y-2.5 text-xs font-medium">
                                            <div className="flex justify-between">
                                                <span className="text-neutral-500">Kategoriya:</span>
                                                <span className="text-neutral-200 uppercase tracking-wider font-mono text-[11px]">{selectedCategory}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-neutral-500">Holati:</span>
                                                <span className="text-emerald-400">Omborda Mavjud</span>
                                            </div>
                                        </div>

                                        <button 
                                            onClick={() => setActiveBuild(prev => ({ ...prev, [selectedCategory]: item.id }))}
                                            className="w-full py-3 mt-2 bg-[#E4E728] text-[#0A0A0A] font-bold text-xs rounded-xl hover:bg-[#d0max-value] transition-colors"
                                        >
                                            Konfiguratsiyaga qo'shish
                                        </button>
                                    </ModalContent>
                                </ModalPortal>
                            </Modal>
                        );
                    })}
                </div>
            </aside>

            <main className="flex-1 h-full relative bg-radial from-neutral-900/40 to-[#0A0A0A]">
                <div className="absolute top-6 right-6 z-20 bg-[#0A0A0A]/80 backdrop-blur-md border border-neutral-900 px-5 py-3.5 rounded-2xl flex flex-col pointer-events-auto">
                    <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">Umumiy Narxi</span>
                    <span className="text-lg font-bold font-mono text-[#E4E728] mt-0.5">
                        {formatPrice(Object.keys(activeBuild).length * 1250 || 0)}
                    </span>
                </div>

                <Canvas gl={{ preserveDrawingBuffer: true }} className="w-full h-full">
                    <ambientLight intensity={0.4} />
                    <directionalLight position={[5, 15, 5]} intensity={0.8} />
                    <Stage environment="city" intensity={0.5}>
                        <mesh>
                            <boxGeometry args={[1.4, 1.4, 1.4]} />
                            <meshStandardMaterial color="#262626" roughness={0.1} metalness={0.8} />
                        </mesh>
                    </Stage>
                </Canvas>
            </main>
        </div>
    );
};

export default BuilderPage;