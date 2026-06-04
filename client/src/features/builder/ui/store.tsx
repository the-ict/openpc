import { Popover, PopoverContent, PopoverPortal, PopoverTrigger } from "@/src/shared/ui/popover";
import { cpuModels } from "@/src/features/builder/lib/data";
import { ChevronDown, Search, X } from "lucide-react";
import React from "react";

interface Props {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    priceRange: [number, number];
    setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
    selectedType: string;
    setSelectedType: React.Dispatch<React.SetStateAction<string>>;
};

export default function Store({ searchQuery, setSearchQuery, priceRange, setPriceRange, selectedType, setSelectedType }: Props) {
    return (
        <div className="w-screen h-screen fixed top-0 left-0 pointer-events-none z-90 bg-black/90">
            <div className="px-6 pt-6 pb-4 border-b border-slate-700/30 bg-slate-950/40">
                <div className="mb-4 flex items-center gap-2 px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg focus-within:border-cyan-500/50 transition-colors">
                    <Search className="w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 outline-none text-sm"
                    />
                    {searchQuery && (
                        <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-200">
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Filters:</span>

                    <Popover>
                        <PopoverTrigger>
                            <>
                                Price
                                <ChevronDown className="w-3 h-3" />
                            </>
                        </PopoverTrigger>
                        <PopoverPortal>
                            <PopoverContent>
                                <div className="space-y-3">
                                    <label className="text-xs font-semibold text-slate-300">Price Range</label>
                                    <div className="flex items-center justify-between gap-2">
                                        <input
                                            type="number"
                                            min="0"
                                            value={priceRange[0]}
                                            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                            className="w-20 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-slate-200 text-center"
                                            placeholder="Min"
                                        />
                                        <span className="text-slate-400">-</span>
                                        <input
                                            type="number"
                                            max="10000"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                            className="w-20 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-slate-200 text-center"
                                            placeholder="Max"
                                        />
                                    </div>
                                    <div className="text-xs text-cyan-400">${priceRange[0]} - ${priceRange[1]}</div>
                                </div>
                            </PopoverContent>
                        </PopoverPortal>
                    </Popover>

                    <Popover>
                        <PopoverTrigger>
                            <>
                                Type
                                <ChevronDown className="w-3 h-3" />
                            </>
                        </PopoverTrigger>
                        <PopoverPortal>
                            <PopoverContent>
                                <div className="space-y-2">
                                    {['all', 'gaming', 'workstation', 'budget', 'high-end'].map((type) => (
                                        <label key={type} className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-800/50 rounded cursor-pointer">
                                            <input
                                                type="radio"
                                                name="type"
                                                value={type}
                                                checked={selectedType === type}
                                                onChange={(e) => setSelectedType(e.target.value)}
                                                className="w-3 h-3 accent-cyan-500"
                                            />
                                            <span className="text-xs text-slate-300 capitalize">{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </PopoverContent>
                        </PopoverPortal>
                    </Popover>
                    <button
                        onClick={() => {
                            setSearchQuery('');
                            setPriceRange([0, 5000]);
                            setSelectedType('all');
                        }}
                        className="ml-auto px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
                    >
                        Reset Filters
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-3 max-w-full">
                    {cpuModels.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex items-center justify-between p-5 rounded-lg cursor-pointer  border border-slate-700/40 hover:border-cyan-500/40 hover:from-slate-800/70 hover:to-slate-800/40 transition-all duration-200 group w-full"
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <div className="w-12 h-12 rounded-lg bg-slate-700/50 flex items-center justify-center group-hover:bg-slate-600/50 transition-colors">
                                    <img src={item.img} alt={item.name} className="w-6 h-6 opacity-80" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold text-slate-200">{item.name}</span>
                                    <span className="text-xs text-slate-400">Component specs</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-base font-bold text-cyan-400">${item.price}</span>
                                <button className="px-3 py-1.5 bg-[#06b6d4] text-black cursor-pointer rounded-lg text-sm transition-colors">
                                    Select
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}