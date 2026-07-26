"use client";

import { ArrowUpRight, PcCase, Cpu, Eye } from 'lucide-react';
import user_store from '@/src/shared/store/user.store';
import { useState, useEffect } from "react";
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { socialLinks } from '../lib/data';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import gsap from 'gsap';

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Welcome() {
    const [mounted, setMounted] = useState<boolean>(false);
    const token = user_store.getState().token ?? "";

    useEffect(() => {
        setMounted(true);
    }, []);

    useGSAP(() => {
        const heroTimeline = gsap.timeline();
        const heroText = SplitText.create('.hero-text', { type: 'words', wordsClass: 'word' });

        heroTimeline.from(heroText.words, { opacity: 0, y: 50, duration: 0.8, stagger: 0.05, ease: 'power3.out' })
            .from(".hero-p", { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out' }, '-=0.5')
            .from(".button-1", { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out' }, '-=0.5')
            .from(".button-2", { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out' }, '-=0.5');
    });

    useGSAP(() => {
        gsap.from(".features-title", { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: ".features-section", start: "top 75%" } });
        gsap.from(".features-sub", { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: ".features-section", start: "top 72%" } });
        gsap.from(".feature-card", { opacity: 0, y: 60, duration: 0.8, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: ".features-section", start: "top 65%" } });
    });

    useGSAP(() => {
        gsap.from(".team-title", { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: ".team-section", start: "top 75%" } });
        gsap.from(".team-sub", { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: ".team-section", start: "top 72%" } });
        gsap.from(".team-link", { opacity: 0, y: 30, duration: 0.6, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: ".team-section", start: "top 65%" } });
    });

    const features = [
        {
            icon: <PcCase className="w-7 h-7 text-[#C4D335]" />,
            title: "1. Korpusni tanlang",
            description: "Ko'plab korpuslar orasidan o'zingizga yoqqanini tanlang va yig'ishni boshlang",
        },
        {
            icon: <Cpu className="w-7 h-7 text-[#C4D335]" />,
            title: "2. Komponentlarni qo'shing",
            description: "CPU, GPU, RAM va boshqa qismlarni real vaqtda 3D ko'rinishda joylashtiring",
        },
        {
            icon: <Eye className="w-7 h-7 text-[#C4D335]" />,
            title: "3. 3D da ko'ring",
            description: "Har bir komponentni 360° aylantirib, yig'ilgan qurilmangizni to'liq ko'zdan kechiring",
        },
    ];

    return (
        <div className='relative'>
            <div className={`flex flex-col items-center bg-[#050505]`}>
                <section id='welcome' className='text-white flex flex-col items-center mt-12 sm:mt-20 justify-center px-4 py-12 sm:py-20 font-sans select-none'>
                    <div className='max-w-3xl w-full text-center flex flex-col items-center mb-16 sm:mb-20'>
                        <h1 className='text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight max-w-2xl mb-4 sm:mb-6 hero-text'>
                            <span className='highlighted-text'>0 dan</span> kompyuter <span>yig'ing!</span>
                        </h1>
                        <p className='text-gray-400 text-xs sm:text-sm md:text-base max-w-xl mb-6 sm:mb-8 leading-relaxed hero-p'>
                            Barcha ehtiyojlaringiz va byudjetingizga mos kompyuter yig'ishni bizning platformamiz orqali boshlang.
                        </p>
                        <div className='flex flex-wrap items-center justify-center gap-3 sm:gap-6'>
                            {mounted && token?.length > 0 ? (
                                <Link href="/session" className='bg-[#C4D335] button-1 cursor-pointer text-black font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-[#b3c22e] transition-colors duration-200 text-xs sm:text-sm md:text-base'>
                                    Zborakalar
                                </Link>
                            ) : (
                                <>
                                    <Link href={"/login"} className='bg-[#C4D335] button-1 cursor-pointer text-black font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-[#b3c22e] transition-colors duration-200 text-xs sm:text-sm md:text-base'>
                                        Kirish
                                    </Link>
                                    <Link href="/register" className='text-[#C4D335] button-2 font-medium flex items-center gap-1 hover:underline text-xs sm:text-sm md:text-base'>
                                        Ro'yxatdan o'tish <ArrowUpRight className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                <section className="w-full px-4 sm:px-6 md:px-16 py-20 sm:py-28 bg-[#050505] features-section">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-4 features-title">
                            Qanday ishlaydi?
                        </h2>
                        <p className="text-gray-400 text-sm sm:text-base text-center max-w-xl mx-auto mb-16 features-sub">
                            Coreform bilan kompyuter yig'ish hech qachon bunday oson bo'lmagan
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {features.map((feature, i) => (
                                <div key={i} className="bg-[#0A0A0A] border border-[#222] rounded-2xl p-8 text-center hover:border-[#C4D335]/30 transition-colors duration-300 feature-card">
                                    <div className="w-14 h-14 rounded-full bg-[#C4D335]/10 flex items-center justify-center mx-auto mb-6">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-white font-bold text-lg mb-3">{feature.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div className='text-white flex flex-col items-center px-4 sm:px-6 md:px-16 py-12 sm:py-20 font-sans select-none w-full bg-[#050505]'>
                    <section className='w-full max-w-3xl mb-16 sm:mb-24 team-section' id='ourteam'>
                        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 tracking-tight team-title'>Bizning jamoa - siz</h1>
                        <p className='text-gray-400 text-xs sm:text-sm max-w-2xl mb-6 sm:mb-8 leading-relaxed team-sub'>
                            Bizning jamoa doimiy ravishda yangi komponentlar bazasini kengaytiradi va platformani yaxshilash ustida ishlaydi.
                        </p>
                        <div className='flex flex-col gap-2 sm:gap-3 w-full'>
                            {socialLinks.map((link) => (
                                <div key={link.name} className='w-full cursor-pointer bg-[#D9D9D9] text-black font-bold py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm tracking-wider transition-colors duration-200 hover:bg-gray-300 flex items-center team-link'>
                                    <img src={link.icon.src} alt={link.name} className='w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3' />
                                    <a href={link.url} target="_blank" rel="noopener noreferrer">{link.name}</a>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
};
