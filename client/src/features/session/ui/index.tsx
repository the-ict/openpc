"use client";

import { useState } from 'react';
import { formatUZS } from '../lib/fnc';
import { PCProject } from '../lib/modal';
import { projectsData } from '../lib/data';
import { Plus, ExternalLink } from 'lucide-react';
import SessionSearch from './SessionSearch';

export default function index() {
  const [projects] = useState<PCProject[]>(projectsData);

  return (
    <div className="min-h-screen relative bg-[#0A0A0A] text-[#FFFFFF] font-sans selection:bg-[#E4E728] selection:text-[#0A0A0A]">
      <div className="flex">
        <main className="flex-1 p-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-[#111] rounded-2xl p-6">
              <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider">Jami Konfiguratsiyalar</span>
              <p className="text-3xl font-bold mt-2 text-[#FFFFFF] font-mono">142</p>
            </div>
            <div className="bg-[#111] rounded-2xl p-6">
              <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider">O'rtacha Narx</span>
              <p className="text-3xl font-bold mt-2 text-[#E4E728] font-mono">24,500,000 UZS</p>
            </div>
            <div className="bg-[#111]  rounded-2xl p-6 sm:col-span-2 lg:col-span-1">
              <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider">Faol loyihalar</span>
              <p className="text-3xl font-bold mt-2 text-[#FFFFFF] font-mono">3 <span className="text-xs text-neutral-500 font-sans font-normal">ta oqim</span></p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group cursor-pointer bg-[#111]/30 relative rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between hover:bg-[#111]"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="font-semibold text-lg text-neutral-200 group-hover:text-white transition-colors">
                      {project.name}
                    </h3>
                  </div>

                  <div className="space-y-2 bg-neutral-900 border border-[#555] rounded-xl p-3.5 mb-6">
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-500">CPU</span>
                      <span className="text-neutral-300 font-medium truncate max-w-45">{project.cpu}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-500">GPU</span>
                      <span className="text-neutral-300 font-medium truncate max-w-45">{project.gpu}</span>
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

            <div className="border-2 border-dashed border-[#555] hover:border-neutral-800 rounded-2xl flex flex-col items-center justify-center p-8 text-center cursor-pointer group transition-all min-h-[250px]">
              <div className="w-12 h-12 rounded-full bg-neutral-900 border border-[#555] flex items-center justify-center mb-4 group-hover:scale-105 group-hover:border-neutral-700 transition-all">
                <Plus className="w-5 h-5 text-neutral-400 group-hover:text-[#E4E728]" />
              </div>
              <p className="font-medium text-sm text-neutral-400 group-hover:text-neutral-200 transition-colors">Yangi loyiha qo'shish</p>
              <p className="text-xs text-neutral-600 mt-1 max-w-45">3D muhitda yangi kompyuter yig'ishni boshlang</p>
            </div>
          </div>
        </main>
      </div>

      <SessionSearch />
    </div>
  );
}