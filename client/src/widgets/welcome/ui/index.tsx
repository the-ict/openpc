"use client";

import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { useState, useEffect, useRef, Suspense, useMemo, useCallback } from "react";
import user_store from '@/src/shared/store/user.store';
import { useHeroComponents } from '../lib/hooks';
import { Environment, useProgress } from '@react-three/drei';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { SplitText } from 'gsap/SplitText';
import { socialLinks } from '../lib/data';
import { useGSAP } from '@gsap/react';
import RenderCase from './RenderCase';
import { Group } from 'three';
import Link from 'next/link';
import gsap from 'gsap';
import AnimationCameraController from './AnimationCameraController';
import TypewriterText from './TypewriterText';

gsap.registerPlugin(SplitText);

const STEPS = [
    {
        type: "MOTHER_BOARD",
        title: "Qadam 1 · Ona platasi",
        description: "Coreform — bu kompyuter yig'ishni qadam-baqadam osonlashtiruvchi platforma. Birinchi navbatda ona platasi (MOTHER_BOARD) tanlanadi: u barcha qismlar ulanishi uchun asos bo'lib xizmat qiladi.",
    },
    {
        type: "GPU",
        title: "Qadam 2 · Grafik karta",
        description: "Keyingi qadam — grafik karta (GPU). U ekrandagi tasvirlarni chiqarish va og'ir dasturlar uchun javobgardir. Tanlagan qismlar darhol 3D ko'rinishda korpusga joylanadi.",
    },
    {
        type: "RAM",
        title: "Qadam 3 · Operativ xotira",
        description: "Endi operativ xotira (RAM). Dasturlar bir vaqtda qanchalik tez ishlashi aynan shu yerda hal bo'ladi. Sig'im va tezlikni ehtiyojlaringizga qarab tanlaysiz.",
    },
];

export default function Welcome() {
    // 3D qismlarning ref'larini saqlash
    const [casePartsRefs, setCasePartsRefs] = useState<Record<string, React.RefObject<Group | null>>>({});
    const [scrollProgress, setScrollProgress] = useState(0);
    const [smoothedProgress, setSmoothedProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    
    const buildSectionRef = useRef<HTMLDivElement | null>(null);
    const [mounted, setMounted] = useState<boolean>(false);
    const rafRef = useRef<number | null>(null);
    const targetProgressRef = useRef(0);

    const token = user_store.getState().token ?? "";
    const { data } = useHeroComponents();

    const { active, progress, loaded, total } = useProgress();
    const [showPage, setShowPage] = useState(false);
    const hasCaseModel = !!data?.case_model;
    const apiLoaded = !!data;

    useEffect(() => {
        if (!apiLoaded) return;

        if (!hasCaseModel) {
            setShowPage(true);
            return;
        }

        if (total > 0) {
            if (loaded === total && !active) {
                setShowPage(true);
            }
            return;
        }

        const id = setTimeout(() => setShowPage(true), 100);
        return () => clearTimeout(id);
    }, [apiLoaded, hasCaseModel, total, loaded, active]);

    useEffect(() => {
        setMounted(true);
    }, []);

    // --- Scroll Progress Calculation (top-level hook) ---
    const calculateProgress = useCallback(() => {
        if (!buildSectionRef.current) return;

        const rect = buildSectionRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        const sectionTop = rect.top;
        const sectionHeight = rect.height;

        let progress = 0;
        
        if (sectionTop <= 0) {
            const scrolledAmount = -sectionTop;
            progress = Math.min(Math.max(scrolledAmount / (sectionHeight - viewportHeight), 0), 1);
        }
        
        targetProgressRef.current = progress;

        const totalSteps = STEPS.length;
        const stepIndex = Math.min(Math.floor(progress * totalSteps), totalSteps - 1);
        
        if (stepIndex !== currentStep) {
            setCurrentStep(stepIndex);
        }
    }, [currentStep]);

    // --- Smooth Scroll Progress with RAF ---
    useEffect(() => {
        const animate = () => {
            // Smooth interpolation towards target progress
            setSmoothedProgress(prev => {
                const next = prev + (targetProgressRef.current - prev) * 0.15;
                return next;
            });
            rafRef.current = requestAnimationFrame(animate);
        };

        const handleScroll = () => {
            calculateProgress();
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        calculateProgress();
        animate();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [calculateProgress]);

    // GSAP Hero Animations
    useGSAP(() => {
        const heroTimeline = gsap.timeline();
        const heroText = SplitText.create('.hero-text', { type: 'words', wordsClass: 'word' });

        heroTimeline.from(heroText.words, { opacity: 0, y: 50, duration: 0.8, stagger: 0.05, ease: 'power3.out' })
            .from(".hero-p", { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out' }, '-=0.5')
            .from(".button-1", { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out' }, '-=0.5')
            .from(".button-2", { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out' }, '-=0.5');
    });

    const heroModels = useMemo(() => data
        ? [data.cpu_model, data.gpu_model, data.ram_model, data.storage_model].filter(Boolean)
        : [], [data]);

    return (
        <div className='relative'>
            <div className={`flex flex-col items-center bg-[#050505]`}>
                {/* HERO SECTION */}
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

                {/* --- 3D BUILD ANIMATION SECTION --- */}
                <section ref={buildSectionRef} className='relative min-h-[300vh] sm:min-h-[400vh] w-full'>
                    
                    {/* O'tish Matni (Home dan Build ga) */}
                    <div 
                        className='absolute top-0 z-99 left-0 w-full h-screen flex items-center justify-center pointer-events-none transition-opacity duration-500' 
                        style={{ opacity: smoothedProgress > 0.1 ? 0 : 1 }}
                    >
                        <div className='text-center max-w-2xl px-4 sm:px-6'>
                            <h3 className='text-[#C4D335] text-xs sm:text-sm md:text-base font-semibold tracking-widest uppercase mb-2 sm:mb-3'>
                                KOMPYUTERNI YIG'ISH JARAYONI
                            </h3>
                            <h2 className='text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight'>
                                Kompyuteringizni real vaqtda yig'ilishini kuzating
                            </h2>
                            <p className='text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed'>
                                Skroll qiling va har bir komponent qayerga va qanday o'rnatilishini batafsil ko'ring.
                            </p>
                        </div>
                    </div>

                    {/* Sticky Canvas Kontayner */}
                    <div className='sticky top-0 h-screen w-full overflow-hidden'>
                        <Canvas
                            gl={{ toneMappingExposure: 1.5, antialias: true, alpha: true, powerPreference: "high-performance" }}
                            dpr={[1, 2]}
                            camera={{ position: [0, 0, 5], fov: 50 }}
                        >
                            <Suspense fallback={null}>
                                <ambientLight intensity={1} />
                                <directionalLight position={[5, 5, 5]} intensity={2} />
                                <Environment preset="city" />

                                <AnimationCameraController 
                                    casePartsRefs={casePartsRefs} 
                                    currentStep={currentStep}
                                    steps={STEPS}
                                    scrollProgress={smoothedProgress}
                                />

                                {data?.case_model && (
                                    <RenderCase 
                                        cpu_model={data?.cpu_model ?? null} 
                                        gpu_model={data?.gpu_model ?? null} 
                                        ram_model={data?.ram_model ?? null} 
                                        storage_model={data?.storage_model ?? null} 
                                        case_model={data.case_model} 
                                        setCasePartsRefs={setCasePartsRefs} 
                                    />
                                )}

                                <EffectComposer>
                                    <Bloom intensity={0.4} luminanceThreshold={0.8} mipmapBlur />
                                </EffectComposer>
                            </Suspense>
                        </Canvas>

                        {/* --- Step Overlay Info --- */}
                        <div
                            className={`pointer-events-none absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-12 transition-opacity duration-500 ${
                                smoothedProgress > 0.1 ? "opacity-100" : "opacity-0"
                            }`}
                        >
                            <TypewriterText
                                scrollProgress={smoothedProgress}
                                text="Siz faqat kuzating, komponentlar o'z joyiga tushadi"
                                highlightWord="komponentlar"
                            />
                        </div>
                    </div>
                </section>

                {/* TEAM SECTION */}
                <div className='text-white flex flex-col items-center px-4 sm:px-6 md:px-16 py-12 sm:py-20 font-sans select-none w-full bg-[#050505]'>
                    <section className='w-full max-w-3xl mb-16 sm:mb-24' id='ourteam'>
                        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 tracking-tight our-team-text'>Bizning jamoa - siz</h1>
                        <p className='text-gray-400 text-xs sm:text-sm max-w-2xl mb-6 sm:mb-8 leading-relaxed'>
                            Bizning jamoa doimiy ravishda yangi komponentlar bazasini kengaytiradi va platformani yaxshilash ustida ishlaydi.
                        </p>
                        <div className='flex flex-col gap-2 sm:gap-3 w-full'>
                            {socialLinks.map((link) => (
                                <div key={link.name} className='w-full cursor-pointer bg-[#D9D9D9] text-black font-bold py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm tracking-wider transition-colors duration-200 hover:bg-gray-300 flex items-center'>
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