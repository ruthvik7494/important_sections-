"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Shirt, Leaf, Factory, ChevronRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const categories = [
  {
    title: "Textiles & Garments",
    description: "Private label and branded supply. MCQ flexible for trial orders.",
    tags: ["T-shirts", "Hoodies", "Bed linen", "Terry towels", "Beach shawls"],
    icon: Shirt,
    image: "/textiles_background_1776919526471.png",
    color: "bg-orange-600"
  },
  {
    title: "Agri Products",
    description: "Sourced from established agri production belts across India. Organic and conventional supply available.",
    tags: ["Tea", "Rice", "Turmeric", "Ginger", "Plantain"],
    icon: Leaf,
    image: "/agri_products_background_1776919542346.png",
    color: "bg-emerald-600"
  },
  {
    title: "Industrial & Chemicals",
    description: "Full technical documentation and compliance support available on request.",
    tags: ["Wood adhesive", "PVC adhesive", "Rubber adhesive", "Super glue"],
    icon: Factory,
    image: "/industrial_chemicals_background_1776919559414.png",
    color: "bg-blue-600"
  }
];

const CategoryCarousel = () => {
  return (
    <section className="category-carousel-section w-full py-20 bg-[#080808] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row items-end justify-between gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-[1.5px] bg-orange-500"></div>
            <span className="text-orange-500 uppercase tracking-[0.2em] text-xs font-bold">Our Expertise</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Industry <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400">Categories</span>
          </h2>
          <p className="text-gray-400 max-w-xl text-base leading-relaxed">
            We bridge the gap between quality production and global demand with our carefully curated category-specific solutions.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex gap-3 mb-1"
        >
          <button className="swiper-button-prev-custom group p-3 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">
            <ChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={20} />
          </button>
          <button className="swiper-button-next-custom group p-3 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">
            <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </button>
        </motion.div>
      </div>

      <div className="relative px-6">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          loop={true}
          speed={800}
          modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
          className="category-swiper w-full max-w-[1400px] h-[480px] md:h-[580px]"
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          pagination={{
            clickable: true,
            el: '.category-pagination',
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1.2,
            slideShadows: false,
          }}
          watchSlidesProgress={true}
        >
          {[...categories, ...categories].map((category, index) => (
            <SwiperSlide key={index} className="rounded-[32px] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] border border-white/5 !w-[92%] md:!w-[700px]">
              <div className="relative w-full h-full group">
                {/* Background Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/5"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent"></div>
                </div>

                {/* Content Container */}
                <div className="relative h-full p-8 md:p-12 flex flex-col justify-between text-white z-10">
                  {/* Top Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center mb-6 shadow-lg border border-white/10`}>
                      <category.icon size={24} />
                    </div>
                    <h3 className="text-3xl md:text-5xl font-bold mb-4 leading-tight tracking-tight">{category.title}</h3>
                    <p className="text-base md:text-lg text-gray-300 max-w-xl mb-6 font-medium leading-relaxed opacity-80">{category.description}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {category.tags.map((tag, tIndex) => (
                        <span 
                          key={tIndex} 
                          className="px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-xs md:text-sm font-medium hover:bg-white/15 transition-all duration-300 cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Bottom Section */}
                  <div className="flex items-center justify-between mt-auto">
                    <button className="flex items-center gap-2.5 text-orange-500 font-bold text-base group/btn hover:text-white transition-colors duration-300">
                      Explore Category 
                      <div className="w-9 h-9 rounded-full border border-orange-500/30 flex items-center justify-center group-hover/btn:bg-orange-500 group-hover/btn:border-orange-500 transition-all duration-300">
                        <ArrowRight size={18} className="group-hover/btn:translate-x-0.5 transition-transform" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Custom Pagination Container */}
        <div className="mt-12 flex justify-center">
          <div className="category-pagination bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full flex items-center gap-3 border border-white/20 w-fit"></div>
        </div>
      </div>

      <style jsx global>{`
        .category-carousel-section .category-pagination {
          width: fit-content !important;
          position: relative !important;
          bottom: 0 !important;
          left: auto !important;
          transform: none !important;
          margin: 0 auto !important;
          padding: 12px 24px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 6px !important;
        }
        .category-carousel-section .category-pagination .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.2) !important;
          width: 10px !important;
          height: 10px !important;
          opacity: 1 !important;
          margin: 0 !important;
          transition: all 0.3s ease !important;
          flex-shrink: 0 !important;
        }
        .category-carousel-section .category-pagination .swiper-pagination-bullet-active {
          background: #f97316 !important;
          width: 24px !important;
          border-radius: 6px !important;
        }
        .category-swiper .swiper-slide {
          background: transparent !important;
          transition: all 0.5s ease;
        }
        .category-swiper {
          overflow: visible !important;
          padding-bottom: 50px !important;
        }
        .category-swiper .swiper-slide:not(.swiper-slide-active) {
          filter: grayscale(1) brightness(0.4);
          opacity: 0.4;
          transform: scale(0.85) !important;
        }
        .category-swiper .swiper-slide-active {
          filter: grayscale(0) brightness(1);
          opacity: 1;
          transform: scale(1) !important;
        }
      `}</style>
    </section>
  );
};

export default CategoryCarousel;
