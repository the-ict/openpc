"use client"

import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { socialLinks } from '../lib/data';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Welcome() {
    useGSAP(() => {
        const howItWorksTimeline = gsap.timeline();
        const ourTeamTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#ourteam',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none none',
            }
        });
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
            scrollTrigger: {
                trigger: '#howitworks',
                start: 'top 20%',
            },
        });

        howItWorksTimeline.from(howItWorksText.words, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power3.out',
        });

        howItWorksTimeline.from(".how-p", {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out',
        }, '-=0.5');

        howItWorksTimeline.from("#howitworks", {
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#howitworks',
                start: 'top 100%',
                end: 'bottom 90%',
                markers: true,
                pin: true,
                scrub: 1,
            }
        }, '-=0.5');

        const ourTeamText = SplitText.create('.our-team-text', {
            type: 'words',
            wordsClass: 'word'
        });

        ourTeamTimeline.from(ourTeamText.words, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.05,
            scrollTrigger: {
                trigger: '#ourteam',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none none',
            }
        });

        ourTeamTimeline.from(ourTeamText.words, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power3.out',
        });
    })

    return (
        <div>
            <section id='welcome' className="min-h-screen text-white flex flex-col items-center justify-center px-4 py-20 font-sans select-none">
                <div className="max-w-3xl text-center flex flex-col items-center mb-20">
                    <h1 className="text-2xl md:text-4xl font-bold tracking-wide uppercase leading-tight max-w-2xl mb-6 hero-text">
                        <span className='highlighted-text'>Orzuingizdagi</span>kompyuterni yig'dirish uchun <span className='highlighted-text'>yagona</span> kerak bo'lgan <span className='highlighted-text'>platforma</span>.
                    </h1>

                    <p className="text-gray-400 text-sm md:text-base max-w-xl mb-8 leading-relaxed hero-p">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dum my text.
                    </p>

                    <div className="flex items-center gap-6">
                        <button className="bg-[#C4D335] button-1 cursor-pointer text-black font-semibold px-8 py-3 rounded-full hover:bg-[#b3c22e] transition-colors duration-200 text-sm md:text-base">
                            Kirish
                        </button>

                        <a
                            href="#register"
                            className="text-[#C4D335] button-2 font-medium flex items-center gap-1 hover:underline text-sm md:text-base"
                        >
                            Ro'yxatdan o'tish
                            <ArrowUpRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                <div className="relative showcase w-full max-w-3xl aspect-square bg-[#D9D9D9] border-2 border-[#3B82F6] flex items-center justify-center p-6 mx-auto">
                    <div className="absolute -left-10 top-12 w-24 h-12 bg-[#D4E34A]" />

                    <h2 className="text-black text-4xl md:text-5xl font-black uppercase tracking-wider text-center z-10 select-none">
                        Platform<br />Show Case
                    </h2>

                    <div className="absolute -right-10 bottom-12 w-24 h-12 bg-[#E50000]" />
                </div>
            </section>


            <div className="text-white flex flex-col items-center px-6 md:px-16 py-20 font-sans select-none w-full">
                <section className="w-full max-w-3xl mb-24" id='howitworks'>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight how-it-works-text">
                        Qanday ishaydi ?
                    </h1>
                    <p className="text-gray-400 text-xs md:text-sm max-w-2xl mb-8 leading-relaxed how-p">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                        Ipsum has been the industry's standard dum my text.
                    </p>

                    <div className="tutorial-slider relative w-full bg-[#D9D9D9] text-black rounded-[2.5rem] p-8 md:p-12 min-h-[80vh] flex flex-col justify-between overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#D9D9D9] to-[#C4D335] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10 bg-red-500"></div>
                        <div className="relative z-10 bg-blue-500"></div>
                    </div>
                </section>

                <section className="w-full max-w-3xl mb-24" id='ourteam'>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight our-team-text">
                        Bizning jamoa - siz
                    </h1>
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
