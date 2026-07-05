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
            <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[400px] max-h-[85vh] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-[#111] border border-[#555] p-6 shadow-lg focus:outline-none" {...props}>
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
        </>
    )
};

export { Modal, ModalTrigger, ModalPortal, ModalContent };