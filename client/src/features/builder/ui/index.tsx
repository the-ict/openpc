"use client";

import { IModel, MODEL_TYPES } from '@/src/shared/config/api/model/model.model';
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useGetSession } from '../../session/lib/hooks';
import { useAddModelToSession } from '../lib/hooks';
import { useProgress } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import CMControls from './CameraController';
import { useParams } from 'next/navigation';
import { requirements } from '../lib/data';
import SceneBuilder from "./SceneBuilder";
import ModalSheet from './modalsSheet';
import { Loader2 } from 'lucide-react';
import { Group } from 'three';

export interface ComponentBuild {
    id: string;
    instanceId: string;
    slot: number;
    type: MODEL_TYPES;
    modelFile: string;
    name: string;
};

export const BuilderPage: React.FC = () => {
    const [componentRefs, setComponentRefs] = useState<Record<string, React.RefObject<Group | null>>>({});
    const [selectedCategory, setSelectedCategory] = useState<MODEL_TYPES>('CASE');
    const [builtComponents, setBuiltComponents] = useState<ComponentBuild[]>([]);
    const [selectingModelId, setSelectingModelId] = useState<string | null>(null);
    const [loadingCount, setLoadingCount] = useState(0);
    const [activeBuild, setActiveBuild] = useState<Record<string, number>>({});
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
    const [focusTarget, setFocusTarget] = useState<MODEL_TYPES>("CASE");
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [hasSelectedCase, setHasSelectedCase] = useState(false);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const params = useParams();

    const { data: sessionData } = useGetSession(params.id as string);

    const {
        mutateAsync: addModelToSessionMutation,
    } = useAddModelToSession();
    useEffect(() => {
        if (sessionData?.sessionModels) {
            const components: ComponentBuild[] = sessionData.sessionModels.map((sm: any) => ({
                id: sm.model.id,
                instanceId: sm.id,
                slot: sm.slot ?? 0,
                type: sm.model.type,
                modelFile: sm.model.model_file,
                name: sm.model.name,
            }));

            const activeBuildState: Record<string, number> = {};
            sessionData.sessionModels.forEach((sm: any) => {
                activeBuildState[sm.model.type] = (activeBuildState[sm.model.type] ?? 0) + 1;
            });

            setBuiltComponents(components);
            setActiveBuild(activeBuildState);
        }
    }, [sessionData]);

    useEffect(() => {
        setHasSelectedCase((activeBuild['CASE'] ?? 0) > 0);
    }, [activeBuild]);

    const handleChooseComponent = async (model: IModel) => {
        try {
            if (!params.id) {
                throw new Error("There is no params");
            };

            setSelectingModelId(model.id);
            setLoadingCount(c => c + 1);
            setFocusTarget(model.type);

            const currentCount = builtComponents.filter(c => c.type === model.type).length;

            const requirement = requirements.find(r => r.type === model.type);
            const maxSlots = requirement?.maxSlots ?? 1;

            if (currentCount >= maxSlots) return;

            const componentData: ComponentBuild = {
                id: model.id,
                instanceId: `local_${model.id}_${Date.now()}_${currentCount}`,
                slot: currentCount,
                type: model.type,
                modelFile: model.model_file,
                name: model.name,
            };

            setBuiltComponents(prev => [...prev, componentData]);

            setActiveBuild(prev => ({
                ...prev,
                [model.type]: (prev[model.type] ?? 0) + 1
            }));

            await addModelToSessionMutation({ session_id: params.id as string, model_id: model.id, slot: currentCount });
        } catch (error) {
            setLoadingCount(c => Math.max(0, c - 1));
            setSelectingModelId(null);
        }
    };

    const handleLoadComplete = useCallback(() => {
        setLoadingCount(c => {
            const next = Math.max(0, c - 1);
            if (next <= 0) setSelectingModelId(null);
            return next;
        });
    }, []);

    return (
        <div className="flex flex-col h-screen w-screen bg-[#0A0A0A] text-[#FFFFFF] overflow-hidden font-sans select-none antialiased">
            <header className="border-b border-[#222] bg-[#0A0A0A]/80 backdrop-blur-md sticky top-0 z-50 px-3 sm:px-8 py-3 sm:py-4 flex items-center justify-between w-full">
                <button
                    className="lg:hidden cursor-pointer p-2 text-white mr-2"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-label="Sidebar"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" />
                    </svg>
                </button>
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 flex-1">
                    {requirements.map((req, idx) => {
                        const isSelected = selectedCategory === req.type
                        const isCase = req.type === 'CASE';
                        const isDisabled = !hasSelectedCase && !isCase;

                        return (
                            <button
                                key={idx}
                                onClick={() => {
                                    if (isDisabled) return;
                                    setSelectedCategory(req.type);
                                    setFocusTarget(req.type);
                                }}
                                disabled={isDisabled}
                                className={`shrink-0 flex items-center gap-1 lg:gap-2 px-2.5 lg:px-4 py-2 lg:py-2.5 rounded-lg lg:rounded-xl border text-[10px] lg:text-xs font-medium transition-all duration-200 cursor-pointer ${isDisabled
                                    ? 'bg-neutral-900/30 text-neutral-600 border-neutral-800 cursor-not-allowed opacity-50'
                                    : isSelected
                                        ? 'bg-neutral-900 text-[#C4D335] border-neutral-800'
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

            <aside className="flex flex-1 gap-0 lg:gap-3 items-start w-full overflow-hidden">
                <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block lg:flex-[3] w-full lg:w-auto h-full overflow-y-auto`}>
                    <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setSidebarOpen(false)} />
                    <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative left-0 top-0 h-full z-50 lg:z-auto transition-transform duration-300 lg:transition-none`}>
                        <div className="h-full overflow-y-auto w-[85vw] lg:w-auto">
                            <ModalSheet
                                activeBuild={activeBuild}
                                setActiveBuild={setActiveBuild}
                                priceRange={priceRange}
                                setPriceRange={setPriceRange}
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                selectedCategory={selectedCategory}
                                hasSelectedCase={hasSelectedCase}
                                selectingModelId={selectingModelId}
                                onChooseComponent={handleChooseComponent}
                            />
                        </div>
                    </div>
                </div>
                <main className="flex-1 lg:flex-10 h-full relative bg-[#1a1a1a] w-full">
                    {loadingCount > 0 && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50">
                            <div className="flex flex-col items-center gap-3">
                                <Loader2 className="w-8 h-8 animate-spin text-[#C4D335]" />
                                <p className="text-white text-sm font-medium">Model yuklanmoqda...</p>
                            </div>
                        </div>
                    )}
                    {hasSelectedCase ? (
                        <Canvas
                            gl={{
                                toneMappingExposure: 1.5,
                                antialias: true,
                                alpha: true,
                                preserveDrawingBuffer: true,
                                powerPreference: "high-performance"
                            }}
                            dpr={[1, 2]}
                        >
                            <ambientLight intensity={1.5} />
                            <directionalLight position={[5, 5, 5]} intensity={3} castShadow />
                            <directionalLight position={[-5, -5, -5]} intensity={1} />

                            <Suspense fallback={<Loader />}>
                                <SceneBuilder components={builtComponents} setComponentRef={setComponentRefs} />
                            </Suspense>

                            <CMControls focusTarget={focusTarget} componentRefs={componentRefs} builtComponents={builtComponents} />
                            <EffectComposer>
                                <Bloom intensity={0.6} luminanceThreshold={0.2} mipmapBlur />
                            </EffectComposer>
                        </Canvas>
                    ) : (
                        <div className="flex items-center justify-center h-full px-4">
                            <div className="text-center">
                                <p className="text-neutral-400 text-base sm:text-lg mb-2">Avval korpusni tanlang</p>
                                <p className="text-neutral-500 text-xs sm:text-sm">Kompyuterni yig'ishni boshlash uchun paneldan korpus tanlang</p>
                            </div>
                        </div>
                    )}
                </main>
            </aside>
        </div>
    );
};

export default BuilderPage;

const Loader = () => {
    const { progress } = useProgress()

    useEffect(() => {
        console.log("progress: ", progress);
    }, [progress])

    return <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#C4D335]" />
            <p className="text-white text-sm font-medium">{progress} % loaded</p>
        </div>
    </div>
};