"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const categories = [
  {
    title: "Textiles",
    image: "/textiles_background_1776919526471.png",
    count: "120+ Items"
  },
  {
    title: "Agriculture",
    image: "/agri_products_background_1776919542346.png",
    count: "85+ Items"
  },
  {
    title: "Industrial",
    image: "/industrial_chemicals_background_1776919559414.png",
    count: "50+ Items"
  },
  {
    title: "Garments",
    image: "/textiles_background_1776919526471.png",
    count: "200+ Items"
  },
  {
    title: "Spices",
    image: "/agri_products_background_1776919542346.png",
    count: "40+ Items"
  }
];

const CompactCategorySlider = () => {
  const [swiperInstance, setSwiperInstance] = React.useState<any>(null);

  return (
    <section className="compact-slider-section w-full py-16 bg-[#080808] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Interactive Showcase</h2>
          <p className="text-gray-500 text-sm">Click any category to focus and expand</p>
        </div>
        <div className="flex gap-2">
          <button className="compact-prev p-2 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all">
            <ChevronLeft size={18} />
          </button>
          <button className="compact-next p-2 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="relative px-6">
        <Swiper
          onSwiper={setSwiperInstance}
          slidesPerView={'auto'}
          spaceBetween={20}
          loop={true}
          centeredSlides={true}
          slideToClickedSlide={true}
          observer={true}
          observeParents={true}
          watchSlidesProgress={true}
          modules={[Autoplay, Navigation, Pagination]}
          className="compact-swiper w-full"
          navigation={{
            nextEl: '.compact-next',
            prevEl: '.compact-prev',
          }}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: '#compact-pagination-dots',
          }}
        >
          {[...categories, ...categories].map((item, index) => (
            <SwiperSlide 
              key={index} 
              className="compact-slide"
              onClick={() => {
                if (swiperInstance) swiperInstance.slideToLoop(index);
              }}
            >
              <div className="relative h-[320px] w-full rounded-3xl overflow-hidden group cursor-pointer border border-white/5 shadow-2xl transition-all duration-500">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent"></div>
                
                <div className="absolute inset-0 p-7 flex flex-col justify-end text-white">
                  <div className="mb-1">
                    <span className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.2em] opacity-80">
                      {item.count}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold leading-tight mt-1">{item.title}</h3>
                  </div>
                  
                  {/* Expanded Content Wrapper */}
                  <div className="expanded-content overflow-hidden max-h-0 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.4, 0, 0.2, 1)]">
                    <p className="text-sm text-white/60 mb-5 line-clamp-3 leading-relaxed">
                      Our premium {item.title.toLowerCase()} collection represents the pinnacle of quality and craftsmanship in the industry.
                    </p>
                    <button className="flex items-center gap-2 text-xs font-bold text-orange-500 group/btn bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:bg-orange-500 hover:text-white transition-all w-fit">
                      View Details <Plus size={14} className="group-hover/btn:rotate-90 transition-transform" />
                    </button>
                  </div>
                  
                  <div className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center transition-all duration-500 plus-icon border border-white/10">
                    <Plus size={18} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Pagination Container */}
      <div className="mt-8 flex justify-center">
        <div id="compact-pagination-dots" className="compact-pagination bg-white/5 backdrop-blur-xl p-2 px-4 rounded-full flex items-center gap-2 border border-white/10 w-fit"></div>
      </div>

      <style jsx global>{`
        .compact-slider-section .compact-swiper {
          overflow: visible !important;
          padding: 20px 0;
        }
        .compact-slider-section .compact-slide {
          width: 240px;
          transition: width 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: width;
        }
        .compact-slider-section .compact-slide.swiper-slide-active {
          width: 480px;
        }
        @media (max-width: 768px) {
          .compact-slider-section .compact-slide {
            width: 180px;
          }
          .compact-slider-section .compact-slide.swiper-slide-active {
            width: 300px;
          }
        }
        .compact-slider-section .compact-slide.swiper-slide-active .expanded-content {
          max-height: 200px;
          opacity: 1;
          margin-top: 12px;
        }
        .compact-slider-section .compact-slide.swiper-slide-active .plus-icon {
          rotate: 45deg;
          background: #f97316;
          color: white;
          border-color: #f97316;
        }
        .compact-slider-section .compact-slide:not(.swiper-slide-active) {
          filter: grayscale(0.5) brightness(0.7);
          opacity: 0.6;
        }
        .compact-slider-section .compact-slide.swiper-slide-active {
          filter: grayscale(0) brightness(1);
          opacity: 1;
        }
        .compact-slider-section .compact-pagination,
        .compact-slider-section #compact-pagination-dots {
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
        .compact-slider-section .compact-pagination .swiper-pagination-bullet,
        .compact-slider-section #compact-pagination-dots .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: white;
          opacity: 0.2;
          margin: 0 !important;
          transition: all 0.3s ease;
          flex-shrink: 0 !important;
        }
        .compact-slider-section .compact-pagination .swiper-pagination-bullet-active,
        .compact-slider-section #compact-pagination-dots .swiper-pagination-bullet-active {
          opacity: 1;
          background: #f97316;
          transform: scale(1.5);
        }
      `}</style>
    </section>
  );
};

export default CompactCategorySlider;
