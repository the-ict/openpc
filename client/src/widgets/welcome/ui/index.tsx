"use client"

import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { socialLinks } from '../lib/data';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Welcome() {
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
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dum my text.
                    </p>

                    <div className='flex items-center gap-6'>
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
                    </div>
                </div>

                <div className='relative showcase w-full max-w-3xl aspect-square bg-[#D9D9D9] border-2 border-[#3B82F6] flex items-center justify-center p-4 sm:p-6 mx-auto'>
                    <div className='hidden sm:block absolute -left-10 top-12 w-24 h-12 bg-[#D4E34A]' />

                    <h2 className='text-black text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-wider text-center z-10 select-none'>
                        Platform<br />Show Case
                    </h2>

                    <div className='hidden sm:block absolute -right-10 bottom-12 w-24 h-12 bg-[#E50000]' />
                </div>
            </section>


            <div className='text-white flex flex-col items-center px-6 md:px-16 py-20 font-sans select-none w-full'>
                <section className='w-full max-w-3xl mb-24' id='howitworks'>
                    <h1 className='text-3xl md:text-4xl font-bold mb-4 tracking-tight how-it-works-text'>
                        Qanday ishaydi ?
                    </h1>
                    <p className='text-gray-400 text-xs md:text-sm max-w-2xl mb-8 leading-relaxed how-p'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                        Ipsum has been the industry's standard dum my text.
                    </p>

                    <div className='cards w-full min-h-screen gap-4 sm:gap-5 flex-center flex-col relative'>
                        <div className='card1 card bg-red-500 h-80 sm:h-187.5 w-full flex rounded-xl sm:rounded-2xl content-center text-xl sm:text-[30px] sticky top-20'></div>
                        <div className='card2 card bg-blue-500 h-80 sm:h-187.5 w-full flex rounded-xl sm:rounded-2xl content-center text-xl sm:text-[30px] sticky top-20'></div>
                        <div className='card3 card bg-green-500 h-80 sm:h-187.5 w-full flex rounded-xl sm:rounded-2xl content-center text-xl sm:text-[30px] sticky top-20'></div>
                        <div className='card4 card bg-yellow-500 h-80 sm:h-187.5 w-full flex rounded-xl sm:rounded-2xl content-center text-xl sm:text-[30px] sticky top-20'></div>
                    </div>
                </section>

                <section className='w-full max-w-3xl mb-24' id='ourteam'>
                    <h1 className='text-3xl md:text-4xl font-bold mb-4 tracking-tight our-team-text'>
                        Bizning jamoa - siz
                    </h1>
                    <p className='text-gray-400 text-xs md:text-sm max-w-2xl mb-8 leading-relaxed'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                        Ipsum has been the industry's standard dum my text.
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
