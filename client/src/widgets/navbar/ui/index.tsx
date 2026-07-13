"use client";

import user_store from "@/src/shared/store/user.store";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { whereToIgnore } from "../lib/fnc";

export default function Navbar() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const token = user_store.getState().token;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (whereToIgnore().some((path) => pathname.includes(path))) {
    return null;
  };

  return (
    <div className="flex w-full items-center justify-center" id="home">
      <div className="max-w-3xl w-full flex relative items-center justify-between p-5 bg-white text-black mt-5">
        <h1 className="text-5xl font-bold">openpc</h1>
        <button className="bg-[#FFF04D] cursor-pointer text-black px-4 py-2 w-[30%] absolute right-0 h-full text-5xl">boshlash</button>
      </div>
    </div>
  )
};