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
        <RadixDropdownMenu.Trigger>
            {children}
        </RadixDropdownMenu.Trigger>
    )
};

export const DropdownMenuContent = ({ children }: { children: React.ReactNode }) => {
    return (
        <RadixDropdownMenu.Portal>
            <RadixDropdownMenu.Content>
                {children}
            </RadixDropdownMenu.Content>
        </RadixDropdownMenu.Portal>
    )
};

export const DropdownMenuItem = ({children}: {children: React.ReactNode}) => {
    return (
        <RadixDropdownMenu.Item>
            {children}
        </RadixDropdownMenu.Item>
    )
};