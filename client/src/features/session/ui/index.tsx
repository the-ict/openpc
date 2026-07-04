"use client";

import { formatUZS } from '../lib/fnc';
import { useSession } from '../lib/hooks';
import SessionSearch from './SessionSearch';
import NewSessionDialog from './NewSessionDialog';
import AddModelDialog from './AddModelDialog';
import { ISession } from '@/src/shared/config/api/session/session.model';
import { IModel } from '@/src/shared/config/api/model/model.model';
import { Share2 } from 'lucide-react';

export default function index() {
  const { data, error, loading, token, createSession, isCreatingSession, addModel, isAddingModel } = useSession();

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
              <div
                key={session.id}
                className="group cursor-pointer bg-[#111]/30 relative rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between hover:bg-[#111]"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="font-semibold text-lg text-neutral-200 group-hover:text-white transition-colors">
                      {session.name}
                    </h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${session.status === 'Completed' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'}`}>
                      {session.status === 'Completed' ? 'Tugallangan' : 'Jarayonda'}
                    </span>
                  </div>

                  <div className="space-y-2 bg-neutral-900 border border-[#555] rounded-xl p-3.5 mb-6">
                    {
                      session.models.length > 0 ? (
                        session.models.map((model: IModel) => (
                          <div key={model.id} className="flex justify-between text-xs">
                            <span className="text-neutral-500">{model.name}</span>
                            <span className="text-neutral-300 font-medium truncate max-w-45">{model.price}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-neutral-500 text-xs">Hozircha model qo'shilmagan</p>
                      )
                    }
                  </div>
                </div>

                <div>
                  <div className="border-t border-[#555] pt-4 flex items-end justify-between">
                    <div>
                      <span className="text-[10px] text-neutral-500 block uppercase tracking-wider font-medium">Taxminiy Narxi</span>
                      <span className="text-base font-bold font-mono text-[#E4E728]">{formatUZS(session.models.reduce((acc: number, model: IModel) => acc + Number(model.price), 0))}</span>
                    </div>
                    <Share2 className='w-4 h-4'/>
                  </div>

                  <div className="text-[11px] text-neutral-600 mt-3 font-mono text-right">
                    Yangilandi: {session.updatedAt.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}

            <NewSessionDialog onCreateSession={createSession} isCreating={isCreatingSession} />
          </div>
        </main>
      </div>

      <SessionSearch />
    </div>
  );
}