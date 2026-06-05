import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

const Modal = ({ children, props }: { children: React.ReactNode, props?: any }) => {
    return (
        <Dialog.Root {...props}>
            {children}
        </Dialog.Root>
    )
}

const ModalTrigger = ({ children, props }: { children: React.ReactNode, props?: any }) => {
    return (
        <Dialog.Trigger asChild {...props}>
            {children}
        </Dialog.Trigger>
    )
};

const ModalPortal = ({ children, props }: { children: React.ReactNode, props?: any }) => {
    return (
        <Dialog.Portal {...props}>
            {children}
        </Dialog.Portal>
    )
}

const ModalContent = ({ children, props }: { children: React.ReactNode, props?: any }) => {
    return (
        <>
            <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md max-h-[85vh] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-slate-900 border border-slate-700/50 p-6 shadow-lg focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out" {...props}>
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