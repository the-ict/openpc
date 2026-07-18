"use client"

import { Bloom, EffectComposer, Outline } from '@react-three/postprocessing';
import { MODEL_TYPES } from '@/src/shared/config/api/model/model.model';
import AnimationCameraController from './AnimationCameraController';
import { useState, useEffect, useRef, Suspense } from "react";
import user_store from '@/src/shared/store/user.store';
import { UPLOAD_URL } from '@/src/shared/config/URLS';
import { useHeroComponents } from '../lib/hooks';
import { Environment } from '@react-three/drei';
import { ArrowUpRight } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { SplitText } from 'gsap/SplitText';
import { socialLinks } from '../lib/data';
import { useGSAP } from '@gsap/react';
import RenderCase from './RenderCase';
import { Group } from 'three';
import Link from 'next/link';
import gsap from 'gsap';

gsap.registerPlugin(SplitText);

const STEPS = [
    {
        type: "CPU",
        title: "Qadam 1 · Markaziy protsessor",
        description: "OpenPC — bu kompyuter yig'ishni qadam-baqadam osonlashtiruvchi platforma. Birinchi navbatda markaziy protsessor (CPU) tanlanadi: u tizimning asosiy tezligini belgilaydi va byudjetingizga mos variantlar filtrlar orqali topiladi.",
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
    {
        type: "MOTHER_BOARD",
        title: "Qadam 4 · Ona platasi",
        description: "Va nihoyat — ona platasi. Barcha qismlar ulanishi uchun asos bo'lib xizmat qiladi. Barcha qismlar yig'ilgach, tayyor konfiguratsiyani saqlab, xarid qilasiz.",
    },
];

export default function Welcome() {
    const [casePartsRefs, setCasePartsRefs] = useState<Record<string, React.RefObject<Group | null>>>({});
    const buildSectionRef = useRef<HTMLDivElement | null>(null);
    const [mounted, setMounted] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const progressRef = useRef<number>(0);

    const token = user_store.getState().token ?? "";

    const { data } = useHeroComponents();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const onScroll = () => {
            const el = buildSectionRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const total = rect.height - window.innerHeight;
            const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
            progressRef.current = p;
            setProgress(p);
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    useGSAP(() => {
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
    });

    const heroModels = data
        ? [data.cpu_model, data.gpu_model, data.ram_model, data.storage_model].filter(Boolean)
        : [];

    const activeStep = Math.min(STEPS?.length - 1, Math.floor(progress * STEPS?.length));
    const showBuildUI = progress > 0.001;

    const focusTarget: MODEL_TYPES | "OVERVIEW" = progress < 0.02 || progress > 0.98 ? "OVERVIEW" : (STEPS[activeStep].type as MODEL_TYPES);

    const outlineRef = useRef<any>(null);
    const dimRef = useRef<any>(null);
    const focusedObject = focusTarget === "OVERVIEW" ? undefined : casePartsRefs[focusTarget]?.current;

    useEffect(() => {
        const focused = outlineRef.current;
        const dim = dimRef.current;
        if (!focused || !dim) return;

        if (focusTarget === "OVERVIEW") {
            focused.selection.clear();
            dim.selection.clear();
            return;
        }

        const fMeshes: any[] = [];
        focusedObject?.traverse((child: any) => {
            if (child.isMesh) fMeshes.push(child);
        });
        focused.selection.set(fMeshes);

        const oMeshes: any[] = [];
        Object.entries(casePartsRefs).forEach(([type, ref]) => {
            if (type === focusTarget) return;
            ref.current?.traverse((child: any) => {
                if (child.isMesh) oMeshes.push(child);
            });
        });
        dim.selection.set(oMeshes);
    }, [focusTarget, focusedObject, casePartsRefs]);

    return (
        <div className='flex flex-col items-center'>
            <section id='welcome' className='text-white flex flex-col items-center mt-20 justify-center px-4 py-20 font-sans select-none'>
                <div className='max-w-3xl text-center flex flex-col items-center mb-20'>
                    <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide uppercase leading-tight max-w-2xl mb-6 hero-text'>
                        <span className='highlighted-text'>0 dan</span>kompyuter <span className=''>yig'ing!</span>
                    </h1>

                    <p className='text-gray-400 text-sm text-center md:text-base max-w-xl mb-8 leading-relaxed hero-p'>
                        Barcha ehtiyojlaringiz va byudjetingizga mos kompyuter yig'ishni
                        bizning platformamiz orqali boshlang.
                    </p>

                    <div className='flex flex-wrap items-center justify-center gap-4 sm:gap-6'>
                        {mounted && token?.length > 0 ? (
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

                <div className='flex flex-wrap items-center gap-4 sm:gap-10 justify-center'>
                    {heroModels?.length > 0 &&
                        heroModels.map((item) => (
                            <div className='text-center bg-[#1515FF] flex items-center flex-col p-3 sm:p-2 rounded-sm' key={item.id}>
                                <div>
                                    <img src={UPLOAD_URL + item.image} alt={item.type} className='w-16 h-16 sm:w-20 sm:h-20 md:w-25 md:h-25' />
                                </div>
                                <span className='text-white font-bold text-lg sm:text-2xl'>{item.type === "MOTHER_BOARD" ? "mother board" : item.type.toLowerCase()}</span>
                            </div>
                        ))
                    }
                </div>
            </section>

            <section ref={buildSectionRef} className='relative h-[400vh] w-full'>
                <div className='sticky top-0 h-screen w-full overflow-hidden'>
                    <Canvas
                        gl={{
                            toneMappingExposure: 1.5,
                            antialias: true,
                            alpha: true,
                            preserveDrawingBuffer: true,
                            powerPreference: "high-performance"
                        }}
                        dpr={[1, 2]}
                    >
                        <Suspense fallback={null}>
                            <ambientLight intensity={1.5} />
                            <directionalLight position={[5, 5, 5]} intensity={3} castShadow />
                            <directionalLight position={[-5, -5, -5]} intensity={1} />

                            <AnimationCameraController focusTarget={focusTarget} componentRefs={casePartsRefs} />

                            <Environment preset="city" />

                            {data?.case_model && <RenderCase cpu_model={data?.cpu_model ?? null} gpu_model={data?.gpu_model ?? null} ram_model={data?.ram_model ?? null} storage_model={data?.storage_model ?? null} case_model={data.case_model} setCasePartsRefs={setCasePartsRefs} />}

                            <EffectComposer>
                                <Bloom intensity={0.6} luminanceThreshold={0.2} mipmapBlur />
                                <Outline
                                    ref={dimRef}
                                    edgeStrength={4}
                                    visibleEdgeColor={0x000000}
                                    hiddenEdgeColor={0x000000}
                                    blur
                                    xRay={false}
                                />
                                <Outline
                                    ref={outlineRef}
                                    edgeStrength={10}
                                    visibleEdgeColor={0xC4D335}
                                    hiddenEdgeColor={0xC4D335}
                                    blur
                                    xRay={false}
                                />
                            </EffectComposer>
                        </Suspense>
                    </Canvas>

                    <div className={`pointer-events-none absolute inset-0 flex flex-col justify-between p-6 md:p-12 transition-opacity duration-500 ${showBuildUI ? "opacity-100" : "opacity-0"}`}>
                        <div className='flex items-start justify-between'>
                            <div className='max-w-sm'>
                                <p className='text-[#C4D335] text-xs md:text-sm font-semibold tracking-widest uppercase mb-2'>
                                    Qadam {activeStep + 1} / {STEPS?.length}
                                </p>
                                <h2 className='text-2xl md:text-4xl font-bold text-white mb-3'>
                                    {STEPS[activeStep].title}
                                </h2>
                                <p className='text-gray-300 text-xs md:text-sm leading-relaxed'>
                                    {STEPS[activeStep].description}
                                </p>
                            </div>

                            <ul className='flex flex-col gap-3 text-right'>
                                {STEPS.map((step, i) => (
                                    <li
                                        key={step.type}
                                        className={`text-sm md:text-base font-semibold tracking-wider transition-colors duration-300 ${i === activeStep ? "text-[#C4D335]" : i < activeStep ? "text-gray-400" : "text-gray-600"}`}
                                    >
                                        {i < activeStep ? "✓ " : ""}{step.type}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <div className='text-white flex flex-col items-center px-6 md:px-16 py-20 font-sans select-none w-full'>
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
