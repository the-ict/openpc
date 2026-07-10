"use client";

import { Group } from 'three';
import ModalSheet from './modalsSheet';
import { Loader2 } from 'lucide-react';
import SceneBuilder from "./SceneBuilder";
import { requirements } from '../lib/data';
import { Canvas } from '@react-three/fiber';
import CMControls from './CameraController';
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { type Socket, useAddModelToSession } from '../lib/hooks';
import { useGetSession } from '../../session/lib/hooks';
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { IModel, MODEL_TYPES } from '@/src/shared/config/api/model/model.model';

export interface ComponentBuild {
    id: string;
    type: MODEL_TYPES;
    modelFile: string;
    name: string;
};

export const BuilderPage: React.FC = () => {
    const [componentRefs, setComponentRefs] = useState<Record<string, React.RefObject<Group | null>>>({});
    const [selectedCategory, setSelectedCategory] = useState<MODEL_TYPES>('CASE');
    const [builtComponents, setBuiltComponents] = useState<ComponentBuild[]>([]);
    const [activeBuild, setActiveBuild] = useState<Record<string, number>>({});
    const [glassSocket, setGlassSocket] = useState<any>(null);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
    const [focusTarget, setFocusTarget] = useState<MODEL_TYPES>("CASE");
    const [selectedType, setSelectedType] = useState<string>('all');
    const [hasSelectedCase, setHasSelectedCase] = useState(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    const params = useParams();

    const { data: sessionData } = useGetSession(params.id as string);

    const {
        mutateAsync: addModelToSessionMutation,
        isPending: addModelToSessionPending
    } = useAddModelToSession();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (sessionData?.models) {
            const components: ComponentBuild[] = sessionData.models.map((model: any) => ({
                id: model.id,
                type: model.type,
                modelFile: model.model_file,
                name: model.name,
            }));

            const activeBuildState: Record<string, number> = {};
            sessionData.models.forEach((model: any) => {
                activeBuildState[model.type] = 1;
            });

            setBuiltComponents(components);
            setActiveBuild(activeBuildState);
        }
    }, [sessionData]);

    useEffect(() => {
        setHasSelectedCase(!!activeBuild['CASE']);
    }, [activeBuild]);

    const handleChooseComponent = async (model: IModel) => {
        try {
            if (!params.id) {
                throw new Error("There is no params");
            };

            const componentData: ComponentBuild = {
                id: model.id,
                type: model.type,
                modelFile: model.model_file,
                name: model.name,
            };

            setBuiltComponents(prev => {
                const filtered = prev.filter(c => c.type !== componentData.type);
                return [...filtered, componentData];
            });

            setActiveBuild(prev => ({
                ...prev,
                [model.type]: 1
            }));

            await addModelToSessionMutation({ session_id: params.id as string, model_id: model.id });
        } catch (error) {
            console.log("error: ", error);
        };
    };

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex flex-col h-screen w-screen bg-[#0A0A0A] text-[#FFFFFF] overflow-hidden font-sans select-none antialiased">
            {isLoading && (
                <div className="fixed inset-0 z-100 bg-[#0A0A0A] flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-12 h-12 text-[#E4E728] animate-spin" />
                        <p className="text-neutral-400 text-sm">Builder yuklanmoqda...</p>
                    </div>
                </div>
            )}

            <header className="border-b border-[#555] bg-[#0A0A0A]/80 backdrop-blur-md sticky top-0 z-50 px-3 sm:px-8 py-3 sm:py-4 flex items-center justify-between w-full">
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
                                onChooseComponent={handleChooseComponent}
                            />
                        </div>
                    </div>
                </div>

                <main className="flex-1 lg:flex-[10] h-full relative bg-[#1a1a1a] w-full">
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

                            <SceneBuilder components={builtComponents} setComponentRef={setComponentRefs} />

                            <CMControls focusTarget={focusTarget} componentRefs={componentRefs} />
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