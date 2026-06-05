"use client";

import { usePathname } from "next/navigation";
import { whereToIgnore } from "../../navbar/lib/fnc";

export default function Footer() {
  const pathname = usePathname();

  if (whereToIgnore().some((path) => pathname.includes(path))) {
    return null;
  };
  return (
    <footer className="w-full flex justify-center py-8">
      <div className="text-5xl md:text-6xl font-normal tracking-tight flex items-center gap-2 select-none">
        <span className="text-white font-light">by</span>
        <span className="text-[#E50000] font-black tracking-wide">damn</span>
      </div>
    </footer>
  )
}
