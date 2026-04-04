"use client"

import Image from 'next/image';
import heroImg from  "../assets/hero-premium.png"
import PixelShatterText from './PixelShatterText';
import { useEffect, useState } from 'react';

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [fontSize, setFontSize] = useState(80);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setFontSize(50);
      } else {
        setFontSize(90);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImg}
          alt="Premium organic landscape"
          fill
          style={{ objectFit: 'cover' }}
          className="opacity-50 scale-105"
          preload={true}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center justify-center mt-14">
        {/* Canvas Container for Desktop/Tablet */}
        {!isMobile ? (
          <div className="w-full h-[300px] lg:h-[300px] pointer-events-auto">
            <PixelShatterText
              text="A-VADH<br />PURE AS AVATH"
              fontSize={fontSize}
              fontFamily="Syncopate, sans-serif"
              color="#FFFFFF"
              density={1.5}
              mouseRadius={150}
            />
          </div>
        ) : (
          /* Normal Text for Mobile */
          <div className="w-full text-center px-6 py-10">
            <h1 className="font-syncopate text-5xl font-bold text-white leading-tight uppercase tracking-tighter">
              A-VADH<br />PURE AS AVATH
            </h1>
          </div>
        )}

        {/* Info Text */}
        <div className="relative text-center px-6 max-w-4xl mx-auto opacity-0 animate-fade-in-up md:-mt-16 sm:mt-0" style={{ animationDelay: '0.4s' }}>
          <p className="font-outfit text-[10px] md:text-sm tracking-[0.6em] uppercase text-cream/70 mb-4 md:mb-6 font-light">
            Luxury · Traditional · Pure
          </p>
          <p className="font-outfit text-base md:text-lg text-cream-dark/60 max-w-2xl mx-auto mb-8 font-light italic leading-relaxed">
            "A legacy of purity, from rural Ayodhya to your home."
          </p>
          <div className="flex gap-4 justify-center">
            <button className="font-outfit text-[10px] md:text-xs tracking-[.4em] uppercase px-8 md:px-12 py-4 md:py-5 bg-white/5 border border-white/20 text-cream backdrop-blur-sm rounded-full hover:bg-white hover:text-black transition-all duration-500 hover:tracking-[.6em]">
              Our Collection
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
