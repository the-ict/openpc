"use client";

import { useSyncExternalStore } from "react";
import { whereToIgnore } from "../lib/fnc";
import { usePathname } from "next/navigation";
import user_store from '@/src/shared/store/user.store';
import Link from 'next/link';

export default function Navbar() {
  const pathname = usePathname();
  const token = useSyncExternalStore(
    user_store.subscribe,
    () => user_store.getState().token,
  );

  if (whereToIgnore().some((path) => pathname.includes(path))) {
    return null;
  }

  return (
    <header className="w-full flex items-center justify-center px-4 sm:px-6">
      <div className="max-w-7xl w-full flex items-center justify-between gap-3 sm:gap-4 bg-white text-black mt-4 sm:mt-5 rounded-lg px-4 sm:px-5 py-3 sm:py-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
          coreform
        </h1>

        {token ? (
          <Link href="/session" className="bg-[#C4D335] cursor-pointer text-black font-semibold px-5 sm:px-6 py-2 rounded-full text-sm sm:text-base md:text-lg transition-colors duration-200 hover:bg-[#b3c22e]">
            Zborakalar
          </Link>
        ) : (
          <Link href="/register" className="bg-[#C4D335] cursor-pointer text-black font-semibold px-5 sm:px-6 py-2 rounded-full text-sm sm:text-base md:text-lg transition-colors duration-200 hover:bg-[#b3c22e]">
            boshlash
          </Link>
        )}
      </div>
    </header>
  );
}
