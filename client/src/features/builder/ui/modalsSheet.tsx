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
import { IconMoneybagHeart } from "@tabler/icons-react";
import { Gamepad2, Search } from "lucide-react";
import ComponentCard from "./componentCard";
import { cpuModels } from "../lib/data";

interface PropsModalSheet {
  activeBuild: Record<string, number>;
  setActiveBuild: (props:Record<string, number>) => void;
  setPriceRange: (priceRange: [number, number]) => void;
  priceRange: [number,number];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setSelectedType: (type: string) => void;
  selectedType: string;
};

export default function ModalShet({}: PropsModalSheet) {
  return (
    <div className="flex-3 w-full h-full bg-[#222] px-8 py-5 space-y-7">
      <form className="flex items-center gap-3 justify-between w-full bg-[#333] px-6 py-3 rounded-full">
        <input type="text" className="h-full w-full bg-transparent outline-none border-none" placeholder="type of the thing you want!." />
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
              <input type="text" placeholder="From" className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-700 w-full" />
              <input type="text" placeholder="To" className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-700 w-full" />
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
            <Select>
              <SelectTrigger className="w-full bg-neutral-900 border border-neutral-800 text-neutral-200">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-[#0A0A0A] border border-neutral-800 w-full">
                <SelectGroup className="w-full">
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
        {
          cpuModels.map((cpu) => (
            <ComponentCard key={cpu.id} item={cpu} />
          ))
        }
      </div>
    </div>
  );
}