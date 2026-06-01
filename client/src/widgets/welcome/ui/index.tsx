"use client"

import { ArrowUpRight } from 'lucide-react';
import { socialLinks } from '../lib/data';

export default function Welcome() {
    return (
        <div>
            <section id='welcome' className="min-h-screen text-white flex flex-col items-center justify-center px-4 py-20 font-sans select-none">
                <div className="max-w-3xl text-center flex flex-col items-center mb-20">
                    <h1 className="text-2xl md:text-4xl font-bold tracking-wide uppercase leading-tight max-w-2xl mb-6">
                        Orzuingizdagi kompyuterni yig'dirish uchun yagona kerak bo'lgan platforma
                    </h1>

                    <p className="text-gray-400 text-sm md:text-base max-w-xl mb-8 leading-relaxed">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dum my text.
                    </p>

                    <div className="flex items-center gap-6">
                        <button className="bg-[#C4D335] cursor-pointer text-black font-semibold px-8 py-3 rounded-full hover:bg-[#b3c22e] transition-colors duration-200 text-sm md:text-base">
                            Kirish
                        </button>

                        <a
                            href="#register"
                            className="text-[#C4D335] font-medium flex items-center gap-1 hover:underline text-sm md:text-base"
                        >
                            Ro'yxatdan o'tish
                            <ArrowUpRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                <div className="relative w-full max-w-3xl aspect-square bg-[#D9D9D9] border-2 border-[#3B82F6] flex items-center justify-center p-6 mx-auto">
                    <div className="absolute -left-10 top-12 w-24 h-12 bg-[#D4E34A]" />

                    <h2 className="text-black text-4xl md:text-5xl font-black uppercase tracking-wider text-center z-10 select-none">
                        Platform<br />Show Case
                    </h2>

                    <div className="absolute -right-10 bottom-12 w-24 h-12 bg-[#E50000]" />
                </div>
            </section>


            <div className="text-white flex flex-col items-center px-6 md:px-16 py-20 font-sans select-none w-full">
                <section className="w-full max-w-3xl mb-24" id='howitworks'>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                        Qanday ishaydi ?
                    </h2>
                    <p className="text-gray-400 text-xs md:text-sm max-w-2xl mb-8 leading-relaxed">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                        Ipsum has been the industry's standard dum my text.
                    </p>

                    <div className="relative w-full bg-[#D9D9D9] text-black rounded-[2.5rem] p-8 md:p-12 min-h-[320px] flex flex-col justify-between overflow-hidden group">

                        <div className="max-w-xl">
                            <h3 className="text-2xl md:text-4xl font-black uppercase tracking-wide leading-none mb-2">
                                HOHLAGAN
                            </h3>
                            <h3 className="text-2xl md:text-4xl font-black uppercase tracking-wide leading-none mb-4">
                                KOMPONENTNI QIDIRNG
                            </h3>
                            <p className="text-base md:text-xl font-medium font-mono lowercase text-gray-800 leading-tight">
                                slide showdaka bo'lishi <br /> kerak scroll animation
                            </p>
                        </div>

                        <div className="self-end mt-6 bg-[#E50000] text-white font-bold px-8 py-4 rounded-xl text-lg md:text-xl tracking-wider uppercase transition-transform duration-300 group-hover:scale-105">
                            komponent
                        </div>
                    </div>
                </section>

                <section className="w-full max-w-3xl mb-24" id='ourteam'>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                        Bizning jamoa - siz
                    </h2>
                    <p className="text-gray-400 text-xs md:text-sm max-w-2xl mb-8 leading-relaxed">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                        Ipsum has been the industry's standard dum my text.
                    </p>

                    <div className="flex flex-col gap-3 w-full">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                className="w-full bg-[#D9D9D9] text-black font-bold py-4 px-6 text-sm tracking-wider transition-colors duration-200 hover:bg-gray-300 flex items-center"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
};
