"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { UPLOAD_URL } from "@/src/shared/config/URLS";
import { Modal, ModalContent } from "@/src/shared/ui/dialog";
import { IModel } from "@/src/shared/config/api/model/model.model";
import { Cpu, HardDrive, Box, Fan, MemoryStick, CardSim, Power, Loader2 } from "lucide-react";

interface Props {
    model: IModel;
    open: boolean;
    onClose: () => void;
    add_to_build: (model: any) => void;
    isSelected?: boolean;
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

export default function ModelDetail({ model, open, onClose, add_to_build, isSelected }: Props) {
    const imageUrl = UPLOAD_URL + model.image;
    const TypeIcon = typeIcons[model.type] || Box;

    return (
        <Modal open={open} onOpenChange={onClose}>
            <ModalContent className="w-[90vw] sm:w-[60vw] lg:w-[40vw] max-h-[90vh] overflow-y-auto">
                <Dialog.Title className="sr-only">Model ma'lumotlari</Dialog.Title>

                <div className="space-y-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-[#C4D335]/10 flex items-center justify-center">
                                <TypeIcon className="w-6 h-6 text-[#C4D335]" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">{model.name}</h2>
                                <p className="text-neutral-400 text-sm">{model.brand} • {model.type}</p>
                            </div>
                        </div>
                    </div>


                    <div>
                        <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-3">Mahsulot tasviri</h3>
                        <img
                            src={imageUrl}
                            alt={model.name}
                            className="w-full h-48 object-cover rounded-lg"
                            crossOrigin="anonymous"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="bg-[#111] rounded-lg p-4 border border-[#333]">
                            <p className="text-neutral-400 text-xs uppercase tracking-wider mb-1">Narxi</p>
                            <p className="text-2xl font-bold text-[#C4D335]">${model.price}</p>
                        </div>
                        <div className="bg-[#111] rounded-lg p-4 border border-[#333]">
                            <p className="text-neutral-400 text-xs uppercase tracking-wider mb-1">Turi</p>
                            <p className="text-lg font-semibold text-white">{model.type}</p>
                        </div>
                        <div className="bg-[#111] rounded-lg p-4 border border-[#333]">
                            <p className="text-neutral-400 text-xs uppercase tracking-wider mb-1">Brend</p>
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
                            Yopish
                        </button>
                        <button onClick={() => {
                            add_to_build(model)
                            onClose();
                        }} disabled={isSelected} className="flex-1 px-4 py-3 rounded-xl bg-[#C4D335] text-black font-semibold hover:bg-[#b3c22e] disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center justify-center gap-2">
                            {isSelected ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                            {isSelected ? "Qo'shilmoqda" : "Yig'ilmaga qo'shish"}
                        </button>
                    </div>
                </div>
            </ModalContent>
        </Modal>
    );
}
