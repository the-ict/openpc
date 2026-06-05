"use client";

import { solitreo } from "@/src/shared/fonts";
import { usePathname } from "next/navigation";
import { whereToIgnore } from "../lib/fnc";

export default function Navbar() {
  const pathname = usePathname();

  if (whereToIgnore().some((path) => pathname.includes(path))) {
    return null;
  };
  return (
    <div className="flex-between lg:mx-10 py-10" id="home">
      <div>
        <h1 className={`${solitreo.className} ${solitreo.variable} text-3xl`}>
          open<span className="text-[#E4E728]">Pc</span>
        </h1>
      </div>
      <ul className="flex-center gap-12.5">
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
      <button className="cursor-pointer bg-[#efefef] text-black font-bold hover:bg-[#ffffff] transition-all px-6 py-3 rounded-full">
        Urunib ko'rish
      </button>
    </div>
  )
};