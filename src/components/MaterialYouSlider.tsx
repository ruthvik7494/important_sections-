"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Shirt, Leaf, Factory, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const categories = [
  {
    title: "Textiles & Garments",
    description: "Private label and branded supply. MCQ flexible for trial orders.",
    image: "/textiles_background_1776919526471.png",
    color: "bg-orange-500",
    icon: Shirt
  },
  {
    title: "Agri Products",
    description: "Sourced from established agri production belts across India.",
    image: "/agri_products_background_1776919542346.png",
    color: "bg-emerald-500",
    icon: Leaf
  },
  {
    title: "Industrial & Chemicals",
    description: "Full technical documentation and compliance support available.",
    image: "/industrial_chemicals_background_1776919559414.png",
    color: "bg-blue-500",
    icon: Factory
  }
];

const MaterialYouSlider = () => {
  return (
    <section className="material-you-section w-full py-16 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-orange-500 font-bold tracking-widest uppercase text-[10px] mb-2 block"
        >
          Modern Solutions
        </motion.span>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Material <span className="text-gray-500 font-light italic text-2xl md:text-3xl">Experience 03</span>
        </h2>
      </div>

      <div className="relative px-6">
        <Swiper
          slidesPerView={'auto'}
          centeredSlides={true}
          spaceBetween={16}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: '.material-pagination',
          }}
          modules={[Autoplay, Navigation, Pagination]}
          className="material-swiper w-full max-w-[1200px] h-[350px] md:h-[450px]"
        >
          {[...categories, ...categories].map((item, index) => (
            <SwiperSlide key={index} className="material-slide">
              <div className="relative w-full h-full rounded-[40px] overflow-hidden group">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
                
                {/* Floating Icon Block */}
                <div className={`absolute top-6 left-6 w-10 h-10 ${item.color} rounded-2xl flex items-center justify-center text-white shadow-xl z-20`}>
                  <item.icon size={20} />
                </div>

                {/* Content - Only visible/full when active */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white z-10 transition-all duration-500 slide-content">
                  <div className="mb-2 flex items-end justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl md:text-3xl font-bold mb-1 leading-tight truncate">{item.title}</h3>
                      <p className="text-white/70 max-w-sm text-xs md:text-sm font-medium opacity-0 translate-y-3 transition-all duration-500 description line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    <button className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-white hover:text-black transition-all group/btn ml-4 shrink-0">
                      <ArrowUpRight size={18} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Material Pagination */}
        <div className="mt-8 flex justify-center">
          <div className="material-pagination bg-white/5 backdrop-blur-xl p-1.5 px-3 rounded-full flex items-center gap-1.5 border border-white/10"></div>
        </div>
      </div>

      <style jsx global>{`
        .material-you-section .material-slide {
          width: 220px;
          transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .material-you-section .material-slide.swiper-slide-active {
          width: 600px;
        }
        @media (max-width: 768px) {
          .material-you-section .material-slide {
            width: 70%;
          }
          .material-you-section .material-slide.swiper-slide-active {
            width: 85%;
          }
        }
        .material-you-section .material-slide.swiper-slide-active .description {
          opacity: 1;
          translate: 0;
        }
        .material-you-section .material-pagination {
          width: fit-content !important;
          display: flex !important;
          gap: 6px !important;
          padding: 8px 16px !important;
          position: relative !important;
          left: auto !important;
          transform: none !important;
          bottom: auto !important;
          margin: 0 auto !important;
        }
        .material-you-section .material-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: white;
          opacity: 0.2;
          margin: 0 !important;
          transition: all 0.4s ease;
          flex-shrink: 0 !important;
        }
        .material-you-section .material-pagination .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 4px;
          opacity: 1;
          background: #f97316;
        }
        .material-you-section .material-swiper {
          overflow: visible !important;
        }
      `}</style>
    </section>
  );
};

export default MaterialYouSlider;
