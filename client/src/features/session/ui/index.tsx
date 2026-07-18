"use client";

import Session from './Session';
import { formatUSD } from '../lib/fnc';
import { useSession } from '../lib/hooks';
import SessionSearch from './SessionSearch';
import NewSessionDialog from './NewSessionDialog';
import { ISession } from '@/src/shared/config/api/session/session.model';

export default function Index() {
  const { data, error, loading, token, createSession, isCreatingSession} = useSession();

  if (!loading && error && !token) {
    return null;
  };

  return (
    <div className="min-h-screen relative bg-[#0A0A0A] text-[#FFFFFF] font-sans selection:bg-[#C4D335] selection:text-[#0A0A0A]">
      <div className="flex">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide uppercase leading-tight text-white">
              Zborakalar
            </h1>
            <p className="text-gray-400 text-sm md:text-base mt-2 leading-relaxed">
              Kompyuter yig&apos;ish loyihalaringizni yarating va boshqaring
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-12">
            <div className="bg-[#111] rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <span className="text-[10px] sm:text-xs text-neutral-500 font-medium uppercase tracking-wider">Jami Konfiguratsiyalar</span>
              <p className="text-2xl sm:text-3xl font-bold mt-2 text-[#FFFFFF] font-mono">{data?.data.length || 0}</p>
            </div>
            <div className="bg-[#111] rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <span className="text-[10px] sm:text-xs text-neutral-500 font-medium uppercase tracking-wider">O&apos;rtacha Narx</span>
              <p className="text-2xl sm:text-3xl font-bold mt-2 text-[#C4D335] font-mono">{formatUSD(Array.isArray(data?.data) ? data?.data.reduce((acc, session) => acc + session.sessionModels.reduce((mAcc, sm) => mAcc + Number(sm.model.price), 0), 0) / (data.data.length || 1) : 0)}</p>
            </div>
            <div className="bg-[#111] rounded-xl sm:rounded-2xl p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
              <span className="text-[10px] sm:text-xs text-neutral-500 font-medium uppercase tracking-wider">Faol loyihalar</span>
              <p className="text-2xl sm:text-3xl font-bold mt-2 text-[#FFFFFF] font-mono">{data?.data.filter(s => s.status === 'In Progress').length} <span className="text-xs text-neutral-500 font-sans font-normal">ta oqim</span></p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-12">
            {data?.data.map((session: ISession) => (
              <Session key={session.id} session={session} />
            ))}
            <NewSessionDialog onCreateSession={createSession} isCreating={isCreatingSession} />
          </div>
        </main>
      </div>

      <SessionSearch />
    </div>
  );
}