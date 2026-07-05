import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

const Modal = ({ children, open, onOpenChange, props }: { children: React.ReactNode, open?: boolean, onOpenChange?: (open: boolean) => void, props?: any }) => {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange} {...props}>
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

const ModalContent = ({ children, className, props }: { children: React.ReactNode, className?: string, props?: any }) => {
    return (
        <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
            <Dialog.Content className={`fixed left-1/2 top-1/2 z-50 max-h-[85vh] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-[#111] border border-[#555] p-6 shadow-lg focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] ${className || ''}`} {...props}>
                {children}
                <Dialog.Close asChild>
                    <button
                        className="absolute cursor-pointer right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 hover:bg-[#333] hover:text-white focus:outline-none"
                        aria-label="Close"
                    >
                        <Cross2Icon className="h-4 w-4" />
                    </button>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Portal>
    )
};

export { Modal, ModalTrigger, ModalPortal, ModalContent };