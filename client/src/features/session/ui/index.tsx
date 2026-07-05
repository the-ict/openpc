"use client";

import Session from './Session';
import { formatUZS } from '../lib/fnc';
import { useSession } from '../lib/hooks';
import SessionSearch from './SessionSearch';
import NewSessionDialog from './NewSessionDialog';
import { ISession } from '@/src/shared/config/api/session/session.model';

export default function index() {
  const { data, error, loading, token, createSession, isCreatingSession} = useSession();

  console.log('data: ', data);

  if (!loading && error && !token) {
    return null;
  };

  return (
    <div className="min-h-screen relative bg-[#0A0A0A] text-[#FFFFFF] font-sans selection:bg-[#E4E728] selection:text-[#0A0A0A]">
      <div className="flex">
        <main className="flex-1 p-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-[#111] rounded-2xl p-6">
              <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider">Jami Konfiguratsiyalar</span>
              <p className="text-3xl font-bold mt-2 text-[#FFFFFF] font-mono">{data?.data.length || 0}</p>
            </div>
            <div className="bg-[#111] rounded-2xl p-6">
              <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider">O'rtacha Narx</span>
              <p className="text-3xl font-bold mt-2 text-[#E4E728] font-mono">{formatUZS(Array.isArray(data?.data) ? data?.data.reduce((acc, session) => acc + session.models.reduce((mAcc, model) => mAcc + Number(model.price), 0), 0) / (data.data.length || 1) : 0)}</p>
            </div>
            <div className="bg-[#111]  rounded-2xl p-6 sm:col-span-2 lg:col-span-1">
              <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider">Faol loyihalar</span>
              <p className="text-3xl font-bold mt-2 text-[#FFFFFF] font-mono">{data?.data.filter(s => s.status === 'In Progress').length} <span className="text-xs text-neutral-500 font-sans font-normal">ta oqim</span></p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
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