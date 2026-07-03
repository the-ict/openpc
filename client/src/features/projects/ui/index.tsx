"use client";

import { useState } from 'react';
import { Plus, Search, ExternalLink } from 'lucide-react';
import { formatUZS } from '../lib/fnc';
import { PCProject } from '../lib/modal';
import { projectsData } from '../lib/data';

export default function Projects() {
  const [projects] = useState<PCProject[]>(projectsData);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FFFFFF] font-sans selection:bg-[#E4E728] selection:text-[#0A0A0A]">

      <header className="border-b border-neutral-900 bg-[#0A0A0A]/80 backdrop-blur-md sticky top-0 z-50 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 select-none">
          <span className="text-xl font-bold tracking-tight italic">
            open<span className="text-[#E4E728] not-italic">PC</span>
          </span>
        </div>

        <div className="relative w-full max-w-xl mx-8 hidden md:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Loyihalar, komponentlar yoki foydalanuvchilarni qidirish..."
            className="w-full bg-neutral-900/60 border border-neutral-800 rounded-full pl-11 pr-4 py-2 text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-[#E4E728]/50 transition-colors duration-200"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="bg-neutral-900 border border-[#555] cursor-pointer hover:bg-neutral-800 text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#E4E728]" />
            <span className="hidden sm:inline">Yaratish</span>
          </button>

          <div className="w-9 h-9 rounded-full border border-[#555] bg-neutral-900 overflow-hidden flex items-center justify-center cursor-pointer hover:border-neutral-700 transition-colors">
            <span className="text-xs font-semibold text-neutral-400">AA</span>
          </div>
        </div>
      </header>

      <div className="flex">
        <main className="flex-1 p-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-neutral-900/40 border border-[#555] rounded-2xl p-6">
              <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider">Jami Konfiguratsiyalar</span>
              <p className="text-3xl font-bold mt-2 text-[#FFFFFF] font-mono">142</p>
            </div>
            <div className="bg-neutral-900/40 border border-[#555] rounded-2xl p-6">
              <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider">O'rtacha Narx</span>
              <p className="text-3xl font-bold mt-2 text-[#E4E728] font-mono">24,500,000 UZS</p>
            </div>
            <div className="bg-neutral-900/40 border border-[#555] rounded-2xl p-6 sm:col-span-2 lg:col-span-1">
              <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider">Faol loyihalar</span>
              <p className="text-3xl font-bold mt-2 text-[#FFFFFF] font-mono">3 <span className="text-xs text-neutral-500 font-sans font-normal">ta oqim</span></p>
            </div>
          </div>

          {/* PROJECTS GRID CARD VIEW */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group cursor-pointer relative bg-neutral-900/30 hover:bg-neutral-900/60 border border-[#555] hover:border-neutral-800 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="font-semibold text-lg text-neutral-200 group-hover:text-white transition-colors">
                      {project.name}
                    </h3>
                  </div>

                  {/* Build Specifications Spec Box */}
                  <div className="space-y-2 bg-neutral-900 border border-[#555] rounded-xl p-3.5 mb-6">
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-500">CPU</span>
                      <span className="text-neutral-300 font-medium truncate max-w-[180px]">{project.cpu}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-500">GPU</span>
                      <span className="text-neutral-300 font-medium truncate max-w-[180px]">{project.gpu}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="border-t border-[#555] pt-4 flex items-end justify-between">
                    <div>
                      <span className="text-[10px] text-neutral-500 block uppercase tracking-wider font-medium">Taxminiy Narxi</span>
                      <span className="text-base font-bold font-mono text-[#E4E728]">{formatUZS(project.priceUZS)}</span>
                    </div>
                    <button className="text-neutral-400 hover:text-white p-2 rounded-lg bg-neutral-900/50 hover:bg-neutral-900 border border-[#555] transition-all">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-[11px] text-neutral-600 mt-3 font-mono text-right">
                    Yangilandi: {project.updatedAt}
                  </div>
                </div>
              </div>
            ))}

            {/* CREATE BLANK NEW PROJECT PLACEHOLDER CARD */}
            <div className="border-2 cursor-pointer border-dashed border-[#555] hover:border-neutral-800 rounded-2xl flex flex-col items-center justify-center p-8 text-center cursor-pointer group transition-all min-h-[250px]">
              <div className="w-12 h-12 rounded-full bg-neutral-900 border border-[#555] flex items-center justify-center mb-4 group-hover:scale-105 group-hover:border-neutral-700 transition-all">
                <Plus className="w-5 h-5 text-neutral-400 group-hover:text-[#E4E728]" />
              </div>
              <p className="font-medium text-sm text-neutral-400 group-hover:text-neutral-200 transition-colors">Yangi loyiha qo'shish</p>
              <p className="text-xs text-neutral-600 mt-1 max-w-[180px]">3D muhitda yangi kompyuter yig'ishni boshlang</p>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}