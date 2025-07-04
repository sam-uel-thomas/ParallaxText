'use client'
import { useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import Image from 'next/image';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRef } from 'react';

export default function Home() {
    useEffect(() => {
        const lenis = new Lenis();

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }, []);

    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'end start']
    })

    return (
        <main className='bg-white overflow-hidden'>
            <div className='h-[100vh]' />
            <div ref={container} className='bg-[#B3FF1F] py-16'>
                <Slider word={"Design"} left="-55%" progress={scrollYProgress} direction="left" />
                <Slider word={"Adapt"} left="-15%" progress={scrollYProgress} direction="right" />
                <Slider word={"Innovate"} left="-40%" progress={scrollYProgress} direction="left" />
            </div>
            <div className='h-[100vh]' />
        </main>
    )
}

const Slider = ({ word, left, progress, direction }) => {
    const dir = direction == "left" ? -1 : 1;
    const x = useTransform(progress, [0,1], [-250 * dir, 250 * dir])
    return (
        <motion.div 
            className='relative flex whitespace-nowrap'
            style={{left, x}}
        >
                <Phrase word={word} />
                <Phrase word={word} />
                <Phrase word={word} />
                <Phrase word={word} />
                <Phrase word={word} />
                <Phrase word={word} />
        </motion.div>
    )
}

const Phrase = ({ word }) => {
    return (
        <div className='flex px-4 gap-8 items-center'>
            <p className='text-[7.5vw] text-black font-sans uppercase'>{word}</p>
            <span className='relative h-[7.5vw] aspect-square overflow-hidden'>
                <Image src={"/logo-icon.png"} height={96} width={100}/>
            </span>
        </div>
    )
}