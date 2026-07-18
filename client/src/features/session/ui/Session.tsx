"use client";

import { formatUSD } from '../lib/fnc';
import { IModel } from '@/src/shared/config/api/model/model.model';
import { Delete, Edit, EllipsisVertical, Share } from 'lucide-react';
import { ISession } from '@/src/shared/config/api/session/session.model'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/src/shared/ui/dropdown-menu';
import { useSession } from '../lib/hooks';
import EditSessionDialog from './EditSessionDialog';
import Link from 'next/link';

interface Props {
    session: ISession;
};

export default function Session({ session }: Props) {
    const { deleteSession, isDeletingSession } = useSession();

    const handleDelete = () => {
        if (confirm(`Sessiyani o'chirishni tasdiqlang: "${session.name}"`)) {
            deleteSession(session.id);
        }
    };

    return (
        <div
            key={session.id}
            className="group cursor-pointer bg-[#111]/40 rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between hover:bg-[#1a1a1a] border border-[#222] hover:border-[#333]"
        >
            <div>
                <Link href={"/builder/" + session.id} key={session.id}>
                    <div className="flex items-start justify-between gap-4 mb-4">
                        <h3 className="font-semibold text-lg text-neutral-200 group-hover:text-white transition-colors">
                            {session.name}
                        </h3>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${session.status === 'Completed' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'}`}>
                            {session.status === 'Completed' ? 'Tugallangan' : 'Jarayonda'}
                        </span>
                    </div>
                </Link>

                <div className="space-y-2 bg-neutral-900 border border-[#222] rounded-xl p-3.5 mb-6">
                    {
                        session.sessionModels.length > 0 ? (
                            session.sessionModels.map((sm) => (
                                <div key={sm.id} className="flex justify-between text-xs">
                                    <span className="text-neutral-500">{sm.model.name}</span>
                                    <span className="text-neutral-300 font-medium truncate max-w-45">{formatUSD(Number(sm.model.price))}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-neutral-500 text-xs">Hozircha model qo&apos;shilmagan</p>
                        )
                    }
                </div>
            </div>

            <div>
                <div className="border-t border-[#222] pt-4 flex items-end justify-between">
                    <div>
                        <span className="text-[10px] text-[#C4D335] block uppercase tracking-widest font-semibold">Taxminiy Narxi</span>
                        <span className="text-base font-bold font-mono text-[#C4D335]">{formatUSD(session.sessionModels.reduce((acc: number, sm) => acc + Number(sm.model.price), 0))}</span>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <EllipsisVertical className='w-4 h-4 text-neutral-500 hover:text-white transition-colors' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={handleDelete} disabled={isDeletingSession}>
                                O&apos;chirish
                                <Delete className='w-4 h-4 text-red-400' />
                            </DropdownMenuItem>
                            <EditSessionDialog
                                session={session}
                                trigger={
                                    <button className="w-full text-left px-3 py-2 text-sm rounded hover:bg-[#333] transition-colors flex items-center gap-2 justify-between cursor-pointer">
                                        O&apos;zgartirish
                                        <Edit className='w-4 h-4 text-blue-400' />
                                    </button>
                                }
                            />
                            <DropdownMenuItem>
                                Ulashish
                                <Share className='w-4 h-4 text-green-400' />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="text-[11px] text-neutral-600 mt-3 font-mono text-right">
                    Yangilandi: {session.updatedAt.toLocaleString()}
                </div>
            </div>
        </div>
    )
}
