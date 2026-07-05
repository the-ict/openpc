import * as React from "react";
import { DropdownMenu as RadixDropdownMenu } from "radix-ui";


export const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
    return (
        <RadixDropdownMenu.Root>
            {children}
        </RadixDropdownMenu.Root>
    )
};

export const DropdownMenuTrigger = ({ children }: { children: React.ReactNode }) => {
    return (
        <RadixDropdownMenu.Trigger className="outline-none cursor-pointer">
            {children}
        </RadixDropdownMenu.Trigger>
    )
};

export const DropdownMenuContent = ({ children }: { children: React.ReactNode }) => {
    return (
        <RadixDropdownMenu.Portal>
            <RadixDropdownMenu.Content className="p-2 bg-[#111] text-white rounded-lg border border-[#555] min-w-45 z-50">
                {children}
            </RadixDropdownMenu.Content>
        </RadixDropdownMenu.Portal>
    )
};

export const DropdownMenuItem = ({children, className, ...props}: {children: React.ReactNode; className?: string} & React.ComponentProps<typeof RadixDropdownMenu.Item>) => {
    return (
        <RadixDropdownMenu.Item {...props} className={`cursor-pointer flex items-center justify-between gap-3 px-3 py-2 text-sm rounded hover:bg-[#333] transition-colors outline-none ${className || ''}`}>
            {children}
        </RadixDropdownMenu.Item>
    )
};