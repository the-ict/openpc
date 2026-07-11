"use client"

import { useState, useEffect } from "react";
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { socialLinks } from '../lib/data';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';
import user_store from '@/src/shared/store/user.store';
import BuilderPage from "@/public/icons/builder.png";
import HowItWorks2 from "@/public/icons/session.png";
import HowItWorks1 from "@/public/icons/register.png";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Welcome() {
    const [mounted, setMounted] = useState<boolean>(false);
    const token = user_store.getState().token;

    useEffect(() => {
        setMounted(true);
    }, []);

    useGSAP(() => {
        const howItWorksTimeline = gsap.timeline();
        const heroTimeline = gsap.timeline();

        const heroText = SplitText.create('.hero-text', {
            type: 'words',
            wordsClass: 'word'
        });

        heroTimeline.from(heroText.words, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power3.out',
        });

        heroTimeline.from(".hero-p", {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out',
        }, '-=0.5');

        heroTimeline.from(".button-1", {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out',
        }, '-=0.5');

        heroTimeline.from(".button-2", {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out',
        }, '-=0.5');

        heroTimeline.from(".showcase", {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out',
        }, '-=0.5');

        const howItWorksText = SplitText.create('.how-it-works-text', {
            type: 'words',
            wordsClass: 'word',
        });

        howItWorksTimeline.from(howItWorksText.words, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: ".how-it-works-text",
                start: "top 80%",
                end: "top 50%",
            }
        });

        howItWorksTimeline.from(".how-p", {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out',
        }, '-=0.5');

        ScrollTrigger.create({
            trigger: ".cards",
            scrub: true,
            start: "top top",
            end: "bottom bottom",
        });

        const cards = gsap.utils.toArray(".card");

        cards.forEach((card) => {
            gsap.from(card as Element, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card as Element,
                    start: "top 80%",
                    end: "bottom 20%",
                    scrub: true,
                }
            });
        });
    });
    return (
        <div>
            <section id='welcome' className='min-h-screen text-white flex flex-col items-center justify-center px-4 py-20 font-sans select-none'>
                <div className='max-w-3xl text-center flex flex-col items-center mb-20'>
                    <h1 className='text-2xl md:text-4xl font-bold tracking-wide uppercase leading-tight max-w-2xl mb-6 hero-text'>
                        <span className='highlighted-text'>Orzuingizdagi</span>kompyuterni yig'dirish uchun <span className='highlighted-text'>yagona</span> kerak bo'lgan <span className='highlighted-text'>platforma</span>.
                    </h1>

                    <p className='text-gray-400 text-sm md:text-base max-w-xl mb-8 leading-relaxed hero-p'>
                        Barcha ehtiyojlaringiz va byudjetingizga mos kompyuter yig'ishni
                        bizning platformamiz orqali boshlang. Oldindan tayyorlangan konfiguratsiyalar
                        yoki o'zingiz xohlagandek sozlang.
                    </p>

                    <div className='flex items-center gap-6'>
                        {mounted && token.length > 0 ? (
                            <Link href="/session" className='bg-[#C4D335] button-1 cursor-pointer text-black font-semibold px-8 py-3 rounded-full hover:bg-[#b3c22e] transition-colors duration-200 text-sm md:text-base'>
                                Zborakalar
                            </Link>
                        ) : (
                            <>
                                <Link href={"/login"} className='bg-[#C4D335] button-1 cursor-pointer text-black font-semibold px-8 py-3 rounded-full hover:bg-[#b3c22e] transition-colors duration-200 text-sm md:text-base'>
                                    Kirish
                                </Link>

                                <Link
                                    href="/register"
                                    className='text-[#C4D335] button-2 font-medium flex items-center gap-1 hover:underline text-sm md:text-base'
                                >
                                    Ro'yxatdan o'tish
                                    <ArrowUpRight className='w-4 h-4' />
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                <img src={BuilderPage.src} alt="Builder Page" className='relative showcase w-full max-w-[60vw] flex items-center justify-center sm:p-6 mx-auto' />
            </section>


            <div className='text-white flex flex-col items-center px-6 md:px-16 py-20 font-sans select-none w-full'>
                <section className='w-full max-w-3xl mb-24' id='howitworks'>
                    <h1 className='text-3xl md:text-4xl font-bold mb-4 tracking-tight how-it-works-text'>
                        Qanday ishaydi ?
                    </h1>
                    <p className='text-gray-400 text-xs md:text-sm max-w-2xl mb-8 leading-relaxed how-p'>
                        Bir necha oddiy qadam orqali o'zingizga mos kompyuterni yig'ing.
                        Platformamiz har bir qismning mosligini tekshiradi va eng yaxshi
                        narx takliflarini taqdim etadi.
                    </p>

                    <div className='cards min-h-screen gap-4 sm:gap-5 flex-center flex-col relative'>
                        <img src={HowItWorks1.src} alt="Step 1" className='card1 card h-80 sm:h-187.5 w-full rounded-xl sm:rounded-2xl sticky top-20 object-cover'/>
                        <img src={HowItWorks2.src} alt="Step 2" className='card2 card h-80 sm:h-187.5 w-full rounded-xl sm:rounded-2xl sticky top-20 object-cover'/>
                    </div>
                </section>

                <section className='w-full max-w-3xl mb-24' id='ourteam'>
                    <h1 className='text-3xl md:text-4xl font-bold mb-4 tracking-tight our-team-text'>
                        Bizning jamoa - siz
                    </h1>
                    <p className='text-gray-400 text-xs md:text-sm max-w-2xl mb-8 leading-relaxed'>
                        Bizning jamoa doimiy ravishda yangi komponentlar bazasini kengaytiradi
                        va platformani yaxshilash ustida ishlaydi. Sizning fikr-mulohazalaringiz
                        bizning eng kuchli vositamiz.
                    </p>

                    <div className='flex flex-col gap-3 w-full'>
                        {socialLinks.map((link) => (
                            <div key={link.name} className='w-full cursor-pointer bg-[#D9D9D9] text-black font-bold py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm tracking-wider transition-colors duration-200 hover:bg-gray-300 flex items-center'>
                                <img src={link.icon.src} alt={link.name} className='w-5 h-5 sm:w-6 sm:h-6 mr-2' />
                                <a
                                    key={link.name}
                                    href={link.url}
                                >
                                    {link.name}
                                </a>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
};
