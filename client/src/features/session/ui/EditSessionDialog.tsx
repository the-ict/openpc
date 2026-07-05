"use client";

import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Modal, ModalTrigger, ModalContent } from "@/src/shared/ui/dialog";
import { ISession } from "@/src/shared/config/api/session/session.model";
import { useSession } from "../lib/hooks";
import { Edit } from "lucide-react";

interface Props {
    session: ISession;
    trigger?: React.ReactNode;
}

export default function EditSessionDialog({ session, trigger }: Props) {
    const [name, setName] = useState<string>(session.name);
    const [open, setOpen] = useState<boolean>(false);
    const [wasUpdating, setWasUpdating] = useState<boolean>(false);
    const { updateSession, isUpdatingSession } = useSession();

    useEffect(() => {
        if (isUpdatingSession) {
            setWasUpdating(true);
        } else if (wasUpdating) {
            setOpen(false);
            setWasUpdating(false);
        }
    }, [isUpdatingSession, wasUpdating]);

    const handleUpdateName = () => {
        if (name.trim() && name !== session.name) {
            updateSession({ id: session.id, data: { name: name.trim() } });
        }
    };
    return (
        <Modal open={open} onOpenChange={setOpen}>
            <ModalTrigger>
                {trigger || (
                    <button className="w-full text-left px-3 py-2 text-sm rounded hover:bg-[#333] transition-colors flex items-center gap-2">
                        <Edit className="w-4 h-4" />
                        Tahrirlash
                    </button>
                )}
            </ModalTrigger>
            <ModalContent>
                <Dialog.Title className="sr-only">Sessiyani tahrirlash</Dialog.Title>
                <div className="space-y-5">
                    <div className="border-b border-[#555] pb-3">
                        <h2 className="text-xl font-bold text-white">Sessiyani tahrirlash</h2>
                        <p className="text-sm text-neutral-500">Session ID: {session.id.slice(0, 8)}...</p>
                    </div>

                    <div className="space-y-3">
                        <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider">Sessiya nomi</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Sessiya nomini kiriting"
                            className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-[#555] text-white placeholder-neutral-500 focus:outline-none focus:border-[#C4D335] focus:ring-1 focus:ring-[#C4D335]"
                        />
                            <button
                                type="button"
                                onClick={handleUpdateName}
                                disabled={name.length <= 0 || isUpdatingSession}
                                className="w-full py-2.5 cursor-pointer rounded-xl bg-linear-to-r from-[#C4D335] to-[#E4E728] text-black font-semibold hover:opacity-90 transition-opacity text-sm disabled:opacity-50"
                            >
                                {isUpdatingSession ? "Saqlanmoqda..." : "Saqlash"}
                            </button>
                    </div>
                </div>
            </ModalContent>
        </Modal>
    );
}