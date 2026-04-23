"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';

const categories = [
  {
    title: "Textiles",
    image: "/textiles_background_1776919526471.png",
    color: "from-blue-500/20"
  },
  {
    title: "Agri",
    image: "/agri_products_background_1776919542346.png",
    color: "from-emerald-500/20"
  },
  {
    title: "Industrial",
    image: "/industrial_chemicals_background_1776919559414.png",
    color: "from-orange-500/20"
  },
  {
    title: "Global",
    image: "/textiles_background_1776919526471.png",
    color: "from-purple-500/20"
  }
];

const PerspectiveSlider = () => {
  return (
    <section className="perspective-slider-section w-full py-24 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="text-3xl font-bold text-white mb-2">Perspective View</h2>
        <p className="text-gray-500">A unique look into our diverse industries</p>
      </div>

      <div className="relative px-6">
        <Swiper
          grabCursor={true}
          effect={'creative'}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: [0, 0, -400],
              rotate: [0, 0, -10],
              opacity: 0,
            },
            next: {
              translate: ['100%', 0, 0],
            },
          }}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          speed={800}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: '.perspective-pagination',
          }}
          modules={[EffectCreative, Pagination, Autoplay]}
          className="perspective-swiper w-full max-w-4xl"
        >
          {categories.map((item, index) => (
            <SwiperSlide key={index} className="rounded-3xl overflow-hidden shadow-2xl">
              <div className={`relative aspect-[16/10] bg-gradient-to-br ${item.color} to-black p-1`}>
                <div className="relative w-full h-full rounded-[22px] overflow-hidden group">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                  
                  <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
                    <h3 className="text-5xl font-black italic uppercase tracking-tighter mb-2">{item.title}</h3>
                    <div className="h-1 w-20 bg-orange-500 rounded-full transition-all duration-500 group-hover:w-40"></div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Perspective Pagination */}
        <div className="mt-12 flex justify-center">
          <div className="perspective-pagination bg-white/5 backdrop-blur-xl p-2 px-4 rounded-full flex items-center gap-2 border border-white/10 w-fit"></div>
        </div>
      </div>

      <style jsx global>{`
        .perspective-slider-section .perspective-swiper {
          perspective: 1200px;
        }
        .perspective-slider-section .perspective-pagination {
          width: fit-content !important;
          display: flex !important;
          gap: 8px !important;
          padding: 10px 20px !important;
          position: relative !important;
          left: auto !important;
          transform: none !important;
          bottom: auto !important;
          margin: 0 auto !important;
        }
        .perspective-slider-section .perspective-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: white;
          opacity: 0.2;
          margin: 0 !important;
          transition: all 0.3s ease;
          flex-shrink: 0 !important;
        }
        .perspective-slider-section .perspective-pagination .swiper-pagination-bullet-active {
          opacity: 1;
          background: #f97316;
          transform: scale(1.5);
        }
      `}</style>
    </section>
  );
};

export default PerspectiveSlider;
