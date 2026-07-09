"use client";

import { Group } from 'three';
import { toast } from 'sonner';
import ModalSheet from './modalsSheet';
import { Loader2 } from 'lucide-react';
import SceneBuilder from "./SceneBuilder";
import { requirements } from '../lib/data';
import { Canvas } from '@react-three/fiber';
import CMControls from './CameraController';
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useAddModelToSession } from '../lib/hooks';
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
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
    const [focusTarget, setFocusTarget] = useState<MODEL_TYPES>("CASE");
    const [selectedType, setSelectedType] = useState<string>('all');
    const [hasSelectedCase, setHasSelectedCase] = useState(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    const params = useParams();

    const {data: sessionData} = useGetSession(params.id as string);

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

    return (
        <div className="flex h-screen w-screen bg-[#0A0A0A] text-[#FFFFFF] overflow-hidden font-sans select-none antialiased flex-col items-start">
            {isLoading && (
                <div className="fixed inset-0 z-100 bg-[#0A0A0A] flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-12 h-12 text-[#E4E728] animate-spin" />
                        <p className="text-neutral-400 text-sm">Loading builder...</p>
                    </div>
                </div>
            )}

            <header className="border-b border-[#555] bg-[#0A0A0A]/80 backdrop-blur-md sticky top-0 z-50 px-8 py-4 flex items-center justify-between w-full">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
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
                                className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-medium transition-all duration-200 cursor-pointer ${isDisabled
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

            <aside className="flex gap-3 items-start h-full w-full">
                <ModalSheet
                    activeBuild={activeBuild}
                    setActiveBuild={setActiveBuild}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    setSelectedType={setSelectedType}
                    selectedType={selectedType}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedCategory={selectedCategory}
                    hasSelectedCase={hasSelectedCase}
                    onChooseComponent={handleChooseComponent}
                />

                <main className="flex-10 h-full relative bg-[#1a1a1a] w-full">
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
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                                <p className="text-neutral-400 text-lg mb-2">Select a case first</p>
                                <p className="text-neutral-500 text-sm">Choose a case from the panel to start building</p>
                            </div>
                        </div>
                    )}
                </main>
            </aside>
        </div>
    );
};

export default BuilderPage;