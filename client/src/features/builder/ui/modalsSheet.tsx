import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MODEL_TYPES } from "@/src/shared/config/api/model/model.model";
import { IconMoneybagHeart } from "@tabler/icons-react";
import { Gamepad2, Search } from "lucide-react";
import ComponentCard from "./componentCard";
import { useBuilder } from "../lib/hooks";
import ModelDetail from "./ModelDetail";
import { useState } from "react";

interface PropsModalSheet {
  activeBuild: Record<string, number>;
  setActiveBuild: (props: Record<string, number>) => void;
  setPriceRange: (priceRange: [number, number]) => void;
  priceRange: [number, number];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setSelectedType: (type: string) => void;
  selectedType: string;
  selectedCategory: string;
  hasSelectedCase: boolean;
  onChooseComponent?: (model: any) => void;
};

export default function ModalShet({
  searchQuery,
  setSearchQuery,
  priceRange,
  setPriceRange,
  selectedType,
  setSelectedType,
  selectedCategory,
  hasSelectedCase,
  onChooseComponent
}: PropsModalSheet) {
  const [selectedModel, setSelectedModel] = useState<any>(null);
  const [isModelDetailOpen, setIsModelDetailOpen] = useState(false);

  const { data, loading } = useBuilder({
    search: searchQuery,
    type: selectedCategory === 'all' ? undefined : selectedCategory,
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
  });

  const handleModelClick = (model: any) => {
    setSelectedModel(model);
    setIsModelDetailOpen(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex-3 w-full h-full bg-[#222] px-8 py-5 space-y-7">
      {!hasSelectedCase && (
        <div className="bg-[#111] border border-[#333] rounded-lg p-6 text-center">
          <p className="text-neutral-400 text-sm mb-2">Select a case first</p>
          <p className="text-neutral-500 text-xs">Choose a case from the Case category to start building your PC</p>
        </div>
      )}

      <form onSubmit={handleSearch} className={`flex items-center gap-3 justify-between w-full bg-[#333] px-6 py-3 rounded-full ${!hasSelectedCase ? 'opacity-50 pointer-events-none' : ''}`}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-full w-full bg-transparent outline-none border-none"
          placeholder="type of the thing you want!."
        />
        <button type="submit" className="cursor-pointer"><Search /></button>
      </form>
      <div className="flex items-center gap-3 justify-between w-full">
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex-1 flex font-bold items-center gap-3 bg-[#333] px-4 py-2 cursor-pointer rounded-full">
              <IconMoneybagHeart /> Price
            </button>
          </PopoverTrigger>
          <PopoverContent className="bg-[#0A0A0A] border border-neutral-800 text-white">
            <PopoverHeader>
              <PopoverTitle className="text-neutral-200">Change the price</PopoverTitle>
            </PopoverHeader>
            <div className="flex flex-col items-start justify-between gap-3">
              <input
                type="number"
                placeholder="From"
                value={priceRange[0] || ''}
                onChange={(e) => setPriceRange([Number(e.target.value) || 0, priceRange[1]])}
                className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-700 w-full"
              />
              <input
                type="number"
                placeholder="To"
                value={priceRange[1] || ''}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || 5000])}
                className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-700 w-full"
              />
            </div>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex-1 flex font-bold items-center gap-3 bg-[#333] px-4 py-2 cursor-pointer rounded-full">
              <Gamepad2 /> Type
            </button>
          </PopoverTrigger>
          <PopoverContent className="bg-[#0A0A0A] border border-neutral-800 text-white">
            <PopoverHeader>
              <PopoverTitle className="text-neutral-200">Select the type you want?</PopoverTitle>
            </PopoverHeader>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full bg-neutral-900 border border-neutral-800 text-neutral-200">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-[#0A0A0A] border border-neutral-800 w-full">
                <SelectGroup className="w-full">
                  <SelectItem value="all" className="text-neutral-200 focus:bg-neutral-900">All</SelectItem>
                  <SelectItem value="gaming" className="text-neutral-200 focus:bg-neutral-900">Gaming</SelectItem>
                  <SelectItem value="budget" className="text-neutral-200 focus:bg-neutral-900">Budget</SelectItem>
                  <SelectItem value="work" className="text-neutral-200 focus:bg-neutral-900">Work</SelectItem>
                  <SelectItem value="creative" className="text-neutral-200 focus:bg-neutral-900">Creative</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </PopoverContent>
        </Popover>
      </div>
      <div className="space-y-5">
        {loading ? (
          <p className="text-neutral-500 text-sm">Loading...</p>
        ) : data?.data && data.data.length > 0 ? (
          data.data.map((model) => (
            <ComponentCard
              key={model.id}
              item={model}
              onClick={() => handleModelClick(model)}
              onChoose={onChooseComponent}
            />
          ))
        ) : (
          <p className="text-neutral-500 text-sm">No models found</p>
        )}
      </div>

      {selectedModel && (
        <ModelDetail
          model={selectedModel}
          open={isModelDetailOpen}
          onClose={() => setIsModelDetailOpen(false)}
          add_to_build={onChooseComponent!}
        />
      )}
    </div>
  );
}