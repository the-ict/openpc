"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Modal, ModalTrigger, ModalContent } from "@/src/shared/ui/dialog";

interface AddModelDialogProps {
    sessionId: string;
    onAddModel: (data: { sessionId: string; modelId: string }) => void;
    isAdding: boolean;
}

export default function AddModelDialog({ sessionId, onAddModel, isAdding }: AddModelDialogProps) {
    const [modelId, setModelId] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (modelId.trim()) {
            onAddModel({ sessionId, modelId: modelId.trim() });
            setModelId("");
        };
    };

    return (
        <Modal>
            <ModalTrigger>
                <button className="text-neutral-400 hover:text-white p-2 rounded-lg bg-[#222] border border-[#222] transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                    </svg>
                </button>
            </ModalTrigger>
            <ModalContent>
                <Dialog.Title className="sr-only">Model Qo&apos;shish</Dialog.Title>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-xl font-bold text-white">Model Qo&apos;shish</h2>
                    <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-2">Model ID</label>
                        <input
                            type="text"
                            value={modelId}
                            onChange={(e) => setModelId(e.target.value)}
                            placeholder="Model ID ni kiriting"
                            className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-[#C4D335]"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isAdding || !modelId.trim()}
                        className="w-full cursor-pointer bg-[#C4D335] text-black font-semibold py-2 rounded-full hover:bg-[#b3c22e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isAdding ? "Qo&apos;shilmoqda..." : "Qo&apos;shish"}
                    </button>
                </form>
            </ModalContent>
        </Modal>
    );
}
