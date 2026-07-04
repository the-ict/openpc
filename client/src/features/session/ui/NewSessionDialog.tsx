"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Modal, ModalTrigger, ModalContent } from "@/src/shared/ui/dialog";

interface NewSessionDialogProps {
    onCreateSession: (name: string) => void;
    isCreating: boolean;
}

export default function NewSessionDialog({ onCreateSession, isCreating }: NewSessionDialogProps) {
    const [name, setName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onCreateSession(name.trim());
            setName("");
        }
    };

    return (
        <Modal>
            <ModalTrigger>
                <button className="border-2 border-dashed border-[#555] hover:border-neutral-800 rounded-2xl flex flex-col items-center justify-center p-8 text-center cursor-pointer group transition-all min-h-[250px]">
                    <div className="w-12 h-12 rounded-full bg-neutral-900 border border-[#555] flex items-center justify-center mb-4 group-hover:scale-105 group-hover:border-neutral-700 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400 group-hover:text-[#E4E728]">
                            <path d="M5 12h14" />
                            <path d="M12 5v14" />
                        </svg>
                    </div>
                    <p className="font-medium text-sm text-neutral-400 group-hover:text-neutral-200 transition-colors">Yangi sessiya yaratish</p>
                    <p className="text-xs text-neutral-600 mt-1">Yangi kompyuter konfiguratsiyasi boshlang</p>
                </button>
            </ModalTrigger>
            <ModalContent>
                <Dialog.Title className="sr-only">Yangi Sessiya</Dialog.Title>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-xl font-bold text-white">Yangi Sessiya</h2>
                    <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-2">Sessiya nomi</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Masalan: Gaming PC"
                            className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-[#E4E728]"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isCreating || !name.trim()}
                        className="w-full cursor-pointer bg-[#C4D335] text-black font-semibold py-2 rounded-full hover:bg-[#b3c22e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isCreating ? "Yaratilmoqda..." : "Yaratish"}
                    </button>
                </form>
            </ModalContent>
        </Modal>
    );
}
