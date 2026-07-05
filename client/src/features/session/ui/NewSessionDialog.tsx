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
                <button className="group cursor-pointer bg-gradient-to-b from-[#111]/50 to-[#111]/30 border-2 border-dashed border-[#555] hover:border-[#C4D335]/50 rounded-2xl flex flex-col items-center justify-center p-8 text-center transition-all duration-300 min-h-[250px]">
                    <div className="w-14 h-14 rounded-full bg-neutral-900 border border-[#555] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-[#C4D335]/50 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400 group-hover:text-[#C4D335] transition-colors">
                            <path d="M5 12h14" />
                            <path d="M12 5v14" />
                        </svg>
                    </div>
                    <p className="font-semibold text-base text-neutral-300 group-hover:text-white transition-colors mb-1">Yangi sessiya yaratish</p>
                    <p className="text-xs text-neutral-500 group-hover:text-neutral-400 transition-colors">Yangi kompyuter konfiguratsiyasi boshlang</p>
                </button>
            </ModalTrigger>
            <ModalContent>
                <Dialog.Title className="sr-only">Yangi Sessiya</Dialog.Title>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <h2 className="text-2xl font-bold text-white mb-1">Yangi Sessiya</h2>
                    <p className="text-sm text-neutral-500">Kompyuter konfiguratsiyangiz uchun nom kiriting</p>
                    
                    <div className="space-y-2">
                        <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider">Sessiya nomi</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Masalan: Gaming PC"
                            className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-[#555] text-white placeholder-neutral-500 focus:outline-none focus:border-[#C4D335] focus:ring-1 focus:ring-[#C4D335]"
                            required
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <Dialog.Close asChild>
                            <button
                                type="button"
                                className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-800 text-neutral-300 hover:bg-neutral-700 transition-colors font-medium"
                            >
                                Bekor qilish
                            </button>
                        </Dialog.Close>
                        <button
                            type="submit"
                            disabled={isCreating || !name.trim()}
                            className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#C4D335] to-[#E4E728] text-black font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isCreating ? "Yaratilmoqda..." : "Yaratish"}
                        </button>
                    </div>
                </form>
            </ModalContent>
        </Modal>
    );
}