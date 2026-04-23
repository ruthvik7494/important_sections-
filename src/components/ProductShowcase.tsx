"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Leaf, Shirt, Box, ArrowRight } from "lucide-react";

const products = [
  {
    id: 1,
    title: "Agri Products",
    image: "https://images.unsplash.com/photo-1595841696677-54897f2896c3?auto=format&fit=crop&q=80&w=1000",
    icon: <Leaf className="w-6 h-6 text-white" />,
    desc: "Sourced from established agri production belts across India. Organic and conventional supply available.",
    tags: ["Tea", "Rice", "Turmeric", "Ginger", "Plantain"],
    labels: [
      { text: "BASMATI RICE", top: "10%", left: "40%" },
      { text: "WHOLE TURMERIC", top: "18%", left: "55%" },
      { text: "DRIED GINGER", top: "38%", left: "78%" }
    ]
  },
  {
    id: 2,
    title: "Textiles & Garments",
    image: "https://images.unsplash.com/photo-1524234107056-1c1f48f64ab8?auto=format&fit=crop&q=80&w=1000",
    icon: <Shirt className="w-6 h-6 text-white" />,
    desc: "Private label and branded supply. MOQ flexible for trial orders.",
    tags: ["T-shirts", "Hoodies", "Bed linen", "Terry towels", "Beach shawls"],
    labels: [
      { text: "COTTON FABRICS", top: "15%", left: "45%" },
      { text: "LUXURY LINEN", top: "25%", left: "60%" },
      { text: "PREMIUM TOWELS", top: "40%", left: "75%" }
    ]
  },
  {
    id: 3,
    title: "Industrial & Chemicals",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000",
    icon: <Box className="w-6 h-6 text-white" />,
    desc: "Full technical documentation and compliance support available on request.",
    tags: ["Wood adhesive", "PVC adhesive", "Rubber adhesive", "Super glue"],
    labels: [
      { text: "ADHESIVES", top: "12%", left: "42%" },
      { text: "CHEMICALS", top: "22%", left: "58%" },
      { text: "INDUSTRIAL SOLUTIONS", top: "35%", left: "72%" }
    ]
  },
];

export default function ProductShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const activeProduct = products[activeIndex];
  const nextIndex = (activeIndex + 1) % products.length;
  const nextProduct = products[nextIndex];

  return (
    <section className="py-12 md:py-20 px-0 sm:px-6 md:px-12 lg:px-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto mb-10 md:mb-16 px-6 sm:px-0 text-center md:text-left">
        <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-4">Product Showcase 06</h2>
        <p className="font-body text-base md:text-lg text-muted-foreground max-w-2xl mx-auto md:mx-0">
          Discover our specialized sectors where we bring you the finest products directly from India.
        </p>
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-7xl mx-auto sm:rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl bg-[#0a1118] h-[600px] md:h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProduct.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-full flex flex-col md:flex-row"
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5 }}
                src={activeProduct.image}
                alt={activeProduct.title}
                className="w-full h-full object-cover opacity-70"
              />
              {/* Darker Gradient Overlay as seen in image */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a1118] via-[#0a1118]/80 to-transparent" />
            </div>

            {/* Content Section */}
            <div className="relative z-10 flex flex-col justify-center p-8 md:p-16 lg:p-20 h-full w-full md:max-w-2xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-[#FF4D1C] p-3 w-fit rounded-full mb-8"
              >
                {activeProduct.icon}
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-display font-bold text-5xl md:text-6xl text-white mb-6 tracking-tight"
              >
                {activeProduct.title}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-body text-base md:text-lg text-white/70 mb-10 leading-relaxed max-w-md"
              >
                {activeProduct.desc}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-2 md:gap-3 mb-12"
              >
                {activeProduct.tags.map((tag, j) => (
                  <span 
                    key={j} 
                    className="bg-[#1a222e]/80 backdrop-blur-sm px-4 md:px-5 py-2 rounded-full text-[10px] md:text-xs font-bold tracking-wider text-white/90 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-3 text-[#FF4D1C] font-bold hover:text-white transition-all group/btn text-base md:text-lg w-fit"
              >
                Explore this category <ChevronRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
              </motion.button>
            </div>

            {/* Image Labels (Desktop Only) */}
            <div className="hidden lg:block absolute inset-0 pointer-events-none">
                {activeProduct.labels.map((label, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ delay: 0.8 + (idx * 0.2) }}
                        className="absolute font-display font-bold text-white/40 tracking-[0.2em] text-[10px] md:text-xs"
                        style={{
                            top: label.top,
                            left: label.left,
                        }}
                    >
                        {label.text}
                    </motion.div>
                ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Up Next Card (Desktop Only) */}
        <div className="absolute bottom-8 right-8 z-20 hidden lg:block">
          <p className="text-white/40 text-[9px] font-bold tracking-[0.3em] uppercase mb-4 text-right">UP NEXT</p>
          <motion.button
            onClick={() => setActiveIndex(nextIndex)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative w-64 h-36 rounded-[28px] overflow-hidden shadow-2xl border border-white/10"
          >
            <img
              src={nextProduct.image}
              alt={nextProduct.title}
              className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[#0a1118]/60 group-hover:bg-[#0a1118]/40 transition-colors" />
            <div className="absolute inset-0 p-5 flex flex-col justify-end">
              <div className="flex items-center justify-between">
                <h4 className="font-display font-bold text-sm text-white">{nextProduct.title}</h4>
                <div className="bg-white/10 p-1.5 rounded-full backdrop-blur-md border border-white/10 group-hover:bg-[#FF4D1C] transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-5 mt-16">
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`transition-all duration-700 rounded-full h-1.5 ${i === activeIndex ? 'w-16 bg-[#FF4D1C] shadow-lg shadow-[#FF4D1C]/20' : 'w-4 bg-gray-300 hover:bg-gray-400'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
