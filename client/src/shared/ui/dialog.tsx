import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

const Modal = ({children}: {children: React.ReactNode}) => {
    return (
        <Dialog.Root>
            {children}
        </Dialog.Root>
    )
}

const ModalTrigger = ({children}: {children: React.ReactNode}) => {
    return (
        <Dialog.Trigger asChild>
            {children}
        </Dialog.Trigger>
    )
};

const ModalPortal = ({children}: {children: React.ReactNode}) => {
    return (
        <Dialog.Portal>
            {children}
        </Dialog.Portal>
    )
}

const ModalContent = ({children}: {children: React.ReactNode}) => {
    return (
        <>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
            <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md max-h-[85vh] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-slate-900 border border-slate-700/50 p-6 shadow-lg focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out">
                {children}
                <Dialog.Close asChild>
                    <button
                        className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-slate-800 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                        aria-label="Close"
                    >
                        <Cross2Icon className="h-4 w-4" />
                    </button>
                </Dialog.Close>
            </Dialog.Content>
        </>
    )
}

export { Modal, ModalTrigger, ModalPortal, ModalContent };