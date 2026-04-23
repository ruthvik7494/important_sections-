"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Pagination, Autoplay, Parallax } from 'swiper/modules';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const categories = [
  {
    title: "Textiles & Garments",
    description: "Private label and branded supply. MCQ flexible for trial orders.",
    image: "/textiles_background_1776919526471.png",
  },
  {
    title: "Agri Products",
    description: "Sourced from established agri production belts across India. Organic and conventional supply available.",
    image: "/agri_products_background_1776919542346.png",
  },
  {
    title: "Industrial & Chemicals",
    description: "Full technical documentation and compliance support available on request.",
    image: "/industrial_chemicals_background_1776919559414.png",
  }
];

const SuperFlowSection = () => {
  return (
    <section className="super-flow-section w-full h-screen relative bg-black overflow-hidden">
      <Swiper
        grabCursor={true}
        effect={'fade'}
        fadeEffect={{
          crossFade: true
        }}
        speed={1500}
        parallax={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: '.custom-pagination',
        }}
        modules={[EffectFade, Pagination, Autoplay, Parallax]}
        className="w-full h-full"
      >
        {categories.map((item, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            {/* Background Image with Parallax */}
            <div 
              className="absolute inset-0 w-full h-full"
              data-swiper-parallax="20%"
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Slashed Overlay Effect (Mimicking Super Flow) */}
            <div className="absolute inset-0 z-10 pointer-events-none opacity-20">
              <div className="absolute top-0 left-[-10%] w-[1px] h-[150%] bg-white/30 rotate-[25deg]"></div>
              <div className="absolute top-0 left-[30%] w-[1px] h-[150%] bg-white/30 rotate-[25deg]"></div>
              <div className="absolute top-0 left-[70%] w-[1px] h-[150%] bg-white/30 rotate-[25deg]"></div>
              <div className="absolute top-0 left-[110%] w-[1px] h-[150%] bg-white/30 rotate-[25deg]"></div>
            </div>

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
              <div className="overflow-hidden">
                <h2 
                  className="text-6xl md:text-[120px] font-bold text-white mb-8 tracking-tighter leading-[0.9]"
                  data-swiper-parallax="-300"
                >
                  {item.title}
                </h2>
              </div>
              <div className="overflow-hidden">
                <p 
                  className="text-lg md:text-2xl text-white/80 max-w-3xl font-medium"
                  data-swiper-parallax="-100"
                >
                  {item.description}
                </p>
              </div>

              {/* Action Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-16"
              >
                <button className="px-12 py-5 bg-white text-black rounded-[40px] font-bold text-xl hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-2xl">
                  Learn More
                </button>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Pagination Container */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30">
          <div className="custom-pagination bg-black/30 backdrop-blur-xl px-6 py-3 rounded-full flex items-center gap-3 border border-white/10 w-fit"></div>
        </div>
      </Swiper>

      <style jsx global>{`
        .super-flow-section .custom-pagination {
          width: fit-content !important;
          display: flex !important;
          gap: 12px !important;
          padding: 12px 24px !important;
          position: relative !important;
          left: auto !important;
          transform: none !important;
          bottom: auto !important;
        }
        .super-flow-section .custom-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: white;
          opacity: 0.3;
          margin: 0 !important;
          transition: all 0.3s ease;
          flex-shrink: 0 !important;
        }
        .super-flow-section .custom-pagination .swiper-pagination-bullet-active {
          opacity: 1;
          background: #3b82f6;
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
};

export default SuperFlowSection;
