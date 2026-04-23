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
    title: "Textiles & Garments",
    image: "/textiles_background_1776919526471.png",
    subtitle: "Premium Cotton"
  },
  {
    title: "Agri Products",
    image: "/agri_products_background_1776919542346.png",
    subtitle: "Organic Spices"
  },
  {
    title: "Industrial & Chemicals",
    image: "/industrial_chemicals_background_1776919559414.png",
    subtitle: "Adhesive Solutions"
  },
  {
    title: "Global Logistics",
    image: "/textiles_background_1776919526471.png",
    subtitle: "Worldwide Shipping"
  },
  {
    title: "Sustainable Agri",
    image: "/agri_products_background_1776919542346.png",
    subtitle: "Green Farming"
  }
];

const PanoramaSlider = () => {
  return (
    <section className="panorama-slider-section w-full py-24 bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-orange-500 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Immersive View</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
            Panoramic <span className="text-gray-600">Industries</span>
          </h2>
        </motion.div>
      </div>

      <div className="relative">
        <Swiper
          grabCursor={true}
          effect={'creative'}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: ['-120%', 0, -500],
              rotate: [0, 45, 0],
            },
            next: {
              shadow: true,
              translate: ['120%', 0, -500],
              rotate: [0, -45, 0],
            },
          }}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          speed={1000}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 1.5 },
            1024: { slidesPerView: 2.5 },
            1440: { slidesPerView: 3 },
          }}
          pagination={{
            clickable: true,
            el: '.panorama-pagination',
          }}
          modules={[EffectCreative, Pagination, Autoplay]}
          className="panorama-swiper !overflow-visible"
        >
          {categories.map((item, index) => (
            <SwiperSlide key={index} className="rounded-xl overflow-hidden shadow-2xl border border-white/5 bg-[#111]">
              <div className="relative aspect-video group cursor-pointer">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                
                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                  <span className="text-orange-500 font-bold text-xs uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {item.subtitle}
                  </span>
                  <h3 className="text-2xl md:text-4xl font-bold leading-tight translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {item.title}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Panorama Pagination */}
        <div className="mt-16 flex justify-center">
          <div className="panorama-pagination bg-white/5 backdrop-blur-xl p-2 px-4 rounded-full flex items-center gap-2 border border-white/10 w-fit"></div>
        </div>
      </div>

      <style jsx global>{`
        .panorama-slider-section .panorama-swiper {
          perspective: 1500px;
        }
        .panorama-slider-section .panorama-pagination {
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
        .panorama-slider-section .panorama-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: white;
          opacity: 0.2;
          margin: 0 !important;
          transition: all 0.3s ease;
          flex-shrink: 0 !important;
        }
        .panorama-slider-section .panorama-pagination .swiper-pagination-bullet-active {
          opacity: 1;
          background: #f97316;
          transform: scale(1.5);
        }
      `}</style>
    </section>
  );
};

export default PanoramaSlider;
