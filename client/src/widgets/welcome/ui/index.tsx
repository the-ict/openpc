"use client"

import { Model } from '../../../../public/models/Pcmodal'
import { OrbitControls, Stage } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { functionItems } from '../lib/data';
import { Search } from "lucide-react";
import { Suspense } from 'react'


export default function Welcome() {
    return (
        <div className="h-screen w-full bg-black relative">
            <div className="absolute top-0 left-0 z-10 h-[80px] w-full px-5 py-3 flex items-center justify-between">
                <ul className='flex-center gap-5'>
                    <li className='cursor-pointer'>Bosh sahifa</li>
                    <li className='cursor-pointer'>Pc yarating</li>
                    <li className='cursor-pointer'>Komponentlar</li>
                    <li className='cursor-pointer'>O'yin uchun pc</li>
                </ul>
                <div className='flex-between gap-3 py-2 px-4 bg-[#333] rounded-full'>
                    <Search />
                    <input type="text" className='outline-none border-none' placeholder='Qidirish..' />
                </div>
            </div>

            <div className='absolute top-[10%] left-[10%] w-[20%] justify-between h-[70%] p-5 flex flex-col z-10'>
                {
                    functionItems.map((item, _) => {
                        if (item.id <= 3) {
                            return (
                                <div className='flex cursor-pointer items-center justify-center gap-2 p-5 h-[180px] w-[180px] flex-col text-center border rounded-2xl' key={_}>
                                    {<item.icon />}
                                    <span className='text-sm'>
                                        {item.name}
                                    </span>
                                </div>
                            )
                        } else null;
                    })
                }
            </div>
            <div className='absolute top-[10%] right-[10%] w-[20%] justify-between h-[70%] p-5 flex flex-col z-10'>
                {
                    functionItems.map((item, _) => {
                        if (item.id > 3) {
                            return (
                                <div className='flex cursor-pointer items-center justify-center gap-2 p-5 h-[180px] w-[180px] flex-col text-center border rounded-2xl' key={_}>
                                    {<item.icon />}
                                    <span className='text-sm'>
                                        {item.name}
                                    </span>
                                </div>
                            )
                        } else null;
                    })
                }
            </div>

            <div className='absolute bottom-0 h-[30%] w-full z-10'>
                <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 1200 300"
                    preserveAspectRatio="none"
                >
                    <path
                        d="
            M0,180
            L250,180
            Q300,180 320,220
            L350,280
            Q360,295 390,295
            L810,295
            Q840,295 850,280
            L880,220
            Q900,180 950,180
            L1200,180
          "
                        fill="transparent"
                        stroke="#ffd500"
                        strokeWidth="2"
                    />
                </svg>

                WELCOME TO THE FUTURE OF CUSTOM PC
                <div className={`absolute left-[3%] bottom-[20%] w-[300px] font-bold`}>
                </div>

                <div className={`absolute right-[3%] bottom-[20%] w-[300px] font-bold`}>
                    WELCOME TO THE FUTURE OF CUSTOM PC
                </div>
            </div>
            <Canvas shadows camera={{ position: [-0.8, 0, 1], fov: 45 }}>
                <Suspense fallback={null}>
                    <Stage environment="city" intensity={0.6} adjustCamera={false}>
                        <Model />
                    </Stage>
                </Suspense>
                <OrbitControls makeDefault enableZoom={false} />
            </Canvas>
        </div>
    )
}
