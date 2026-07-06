"use client";

import { useEffect, useMemo, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as Dialog from "@radix-ui/react-dialog";
import { UPLOAD_URL } from "@/src/shared/config/URLS";
import { Modal, ModalContent } from "@/src/shared/ui/dialog";
import { IModel } from "@/src/shared/config/api/model/model.model";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Environment, OrbitControls, useGLTF, Bounds } from '@react-three/drei';
import { Cpu, HardDrive, Box, Fan, MemoryStick, CardSim, Power } from "lucide-react";

interface Props {
    model: IModel;
    open: boolean;
    onClose: () => void;
    add_to_build: (model: any) => void;
};

const typeIcons: Record<string, any> = {
    CPU: Cpu,
    GPU: CardSim,
    RAM: MemoryStick,
    STORAGE: HardDrive,
    MOTHER_BOARD: Box,
    POWER_SUPPLY: Power,
    COOLER: Fan,
    CASE: Box,
};

function Model({ url }: { url: string }) {
    const { scene, materials } = useGLTF(url);

    console.log("url: ", url);
    const cloned = useMemo(() => scene.clone(), [scene]);

    useEffect(() => {
        Object.values(materials).forEach((mat: any) => {
            if (mat.envMapIntensity !== undefined) mat.envMapIntensity = 1.8;
        });
    }, [materials]);

    return <primitive object={cloned} />;
};

function ModelViewer({ url }: { url: string }) {
    return (
        <div className="w-full h-64 bg-[#fff] rounded-lg overflow-hidden">
            <Canvas
                gl={{ 
                    toneMappingExposure: 1.5,
                    antialias: true,
                    alpha: true,
                    preserveDrawingBuffer: true
                }}
                dpr={[1, 2]}
            >
                <ambientLight intensity={2.5} />
                <directionalLight position={[10, 10, 5]} intensity={2.5} castShadow />
                <directionalLight position={[-10, -5, -5]} intensity={1.2} />
                <Environment preset="city" />
                <OrbitControls enableZoom enablePan enableRotate />

                <Suspense fallback={null}>
                    <Bounds fit clip observe margin={1.2}>
                        <Model url={url} />
                    </Bounds>
                </Suspense>

                <EffectComposer>
                    <Bloom intensity={0.6} luminanceThreshold={0.2} mipmapBlur />
                </EffectComposer>
            </Canvas>
        </div>
    );
}

export default function ModelDetail({ model, open, onClose, add_to_build }: Props) {
    const imageUrl = UPLOAD_URL + model.image;
    const modelFileUrl = UPLOAD_URL + model.model_file;
    const TypeIcon = typeIcons[model.type] || Box;

    return (
        <Modal open={open} onOpenChange={onClose}>
            <ModalContent className="w-[40vw] max-h-[90vh] overflow-y-auto">
                <Dialog.Title className="sr-only">Model Details</Dialog.Title>

                <div className="space-y-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-[#E4E728]/10 flex items-center justify-center">
                                <TypeIcon className="w-6 h-6 text-[#E4E728]" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">{model.name}</h2>
                                <p className="text-neutral-400 text-sm">{model.brand} • {model.type}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-3">3D Preview</h3>
                        <ModelViewer url={modelFileUrl} />
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-3">Product Image</h3>
                        <img
                            src={imageUrl}
                            alt={model.name}
                            className="w-full h-48 object-cover rounded-lg"
                            crossOrigin="anonymous"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#111] rounded-lg p-4 border border-[#333]">
                            <p className="text-neutral-400 text-xs uppercase tracking-wider mb-1">Price</p>
                            <p className="text-2xl font-bold text-[#E4E728]">${model.price}</p>
                        </div>
                        <div className="bg-[#111] rounded-lg p-4 border border-[#333]">
                            <p className="text-neutral-400 text-xs uppercase tracking-wider mb-1">Type</p>
                            <p className="text-lg font-semibold text-white">{model.type}</p>
                        </div>
                        <div className="bg-[#111] rounded-lg p-4 border border-[#333]">
                            <p className="text-neutral-400 text-xs uppercase tracking-wider mb-1">Brand</p>
                            <p className="text-lg font-semibold text-white">{model.brand}</p>
                        </div>
                        <div className="bg-[#111] rounded-lg p-4 border border-[#333]">
                            <p className="text-neutral-400 text-xs uppercase tracking-wider mb-1">Model ID</p>
                            <p className="text-xs font-mono text-neutral-300">{model.id.slice(0, 8)}...</p>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-[#333]">
                        <button
                            onClick={onClose}
                            className="cursor-pointer flex-1 px-4 py-3 rounded-xl bg-neutral-800 text-neutral-300 hover:bg-neutral-700 transition-colors font-medium"
                        >
                            Close
                        </button>
                        <button onClick={() => {
                            add_to_build(model)
                            onClose();
                        }} className="flex-1 px-4 py-3 rounded-xl bg-linear-to-r from-[#C4D335] to-[#E4E728] text-black font-semibold hover:opacity-90 transition-opacity cursor-pointer">
                            Add to Build
                        </button>
                    </div>
                </div>
            </ModalContent>
        </Modal>
    );
}
