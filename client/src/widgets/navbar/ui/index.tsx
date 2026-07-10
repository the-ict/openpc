"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { whereToIgnore } from "../lib/fnc";
import { usePathname } from "next/navigation";
import { solitreo } from "@/src/shared/fonts/fonts";
import user_store from "@/src/shared/store/user.store";
import { Menu, X } from "lucide-react";

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
    <div className="flex-between mx-4 sm:mx-6 lg:mx-10 py-6 sm:py-10 relative" id="home">
      <div>
        <Link href={"/"}>
          <h1 className={`${solitreo.className} ${solitreo.variable} text-2xl sm:text-3xl`}>
            open<span className="text-[#E4E728]">Pc</span>
          </h1>
        </Link>
      </div>

      <button
        className="lg:hidden cursor-pointer p-2 text-white"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <ul className="hidden lg:flex-center gap-8 lg:gap-12.5">
        <li className="cursor-pointer">
          <a href="#home">Bosh sahifa</a>
        </li>
        <li className="cursor-pointer">
          <a href="#howitworks">Qanday ishlaydi?</a>
        </li>
        <li className="cursor-pointer">
          <a href="#ourteam">Biz haqimizda</a>
        </li>
      </ul>

      <div className="hidden lg:block">
        {
          mounted && token.length > 0
            ? (
              <Link href={"/session"}>
                <button className="cursor-pointer bg-[#efefef] text-black font-bold hover:bg-[#ffffff] transition-all px-4 py-2 rounded-full text-sm lg:text-base">
                  Zborkalar
                </button>
              </Link>
            ) : (
              <Link href={"/register"}>
                <button className="cursor-pointer bg-[#efefef] text-black font-bold hover:bg-[#ffffff] transition-all px-4 py-2 rounded-full text-sm lg:text-base">
                  Sinab ko'ring !
                </button>
              </Link>
            )
        }
      </div>

      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#0A0A0A] border-t border-neutral-800 z-50 lg:hidden">
          <div className="flex flex-col items-center gap-4 py-6 px-4">
            <ul className="flex flex-col items-center gap-4">
              <li className="cursor-pointer" onClick={() => setMenuOpen(false)}>
                <a href="#home">Bosh sahifa</a>
              </li>
              <li className="cursor-pointer" onClick={() => setMenuOpen(false)}>
                <a href="#howitworks">Qanday ishlaydi?</a>
              </li>
              <li className="cursor-pointer" onClick={() => setMenuOpen(false)}>
                <a href="#ourteam">Biz haqimizda</a>
              </li>
            </ul>
            {
              mounted && token.length > 0
                ? (
                  <Link href={"/session"} onClick={() => setMenuOpen(false)}>
                    <button className="cursor-pointer bg-[#efefef] text-black font-bold hover:bg-[#ffffff] transition-all px-4 py-2 rounded-full text-sm">
                      Zborkalar
                    </button>
                  </Link>
                ) : (
                  <Link href={"/register"} onClick={() => setMenuOpen(false)}>
                    <button className="cursor-pointer bg-[#efefef] text-black font-bold hover:bg-[#ffffff] transition-all px-4 py-2 rounded-full text-sm">
                      Sinab ko'ring !
                    </button>
                  </Link>
                )
            }
          </div>
        </div>
      )}
    </div>
  )
};