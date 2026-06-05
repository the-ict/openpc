import * as React from "react";
import * as Pop from "@radix-ui/react-popover";

interface PopoverProps {
    children: React.ReactNode;
    props?: any;
}

const Popover: React.FC<PopoverProps> = ({ children, props }) => {
    return (
        <Pop.Root {...props}>
            {children}
        </Pop.Root>
    )
}

const PopoverTrigger: React.FC<PopoverProps> = ({ children, props }) => {
    return (
        <Pop.Trigger className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg transition-colors" {...props}>
            {children}
        </Pop.Trigger>
    )
};

const PopoverPortal: React.FC<PopoverProps> = ({ children, props }) => {
    return (
        <Pop.Portal {...props}>
            {children}
        </Pop.Portal>
    )
};

const PopoverContent: React.FC<PopoverProps> = ({ children, props }) => {
    return (
        <Pop.Content className="bg-slate-900 rounded-lg p-4 w-64 shadow-lg border border-slate-700/50 z-100" {...props}>
            {children}
            <Pop.Arrow className="fill-slate-900" />
        </Pop.Content>
    )
};

export { Popover, PopoverTrigger, PopoverPortal, PopoverContent };
  