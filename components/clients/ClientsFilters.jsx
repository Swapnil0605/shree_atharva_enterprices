"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ClientsFilters({ selected, setSelected, categories: propCategories }) {
  const defaultFilters = [
    "All",
    "Industries",
    "Distilleries",
    "Warehouses & Cold Storages",
    "Pharama & Chemical",
    "Residential",
    "Commercial/ Showrooms/ Petrol",
    "Hospitals",
    "School & Colleges",
    "Banks & Hotels",
    "Government Jobs",
    "Architects/ Consultants",
    "Associate / Sister Concern",
  ];

  const filters = propCategories && propCategories.length > 0 ? propCategories : defaultFilters;

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -250,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 250,
      behavior: "smooth",
    });
  };

  return (
    <>
      <nav className="relative w-full flex items-center justify-center pb-0 -mt-6 md:-mt-10 z-30">

        {/* Left Arrow (Desktop / Tablet with mouse) */}
        <button
          onClick={scrollLeft}
          className="hidden sm:flex absolute left-2 md:left-5 lg:left-8 z-50 w-11 h-11 rounded-full bg-white border border-gray-200 shadow-lg items-center justify-center hover:bg-[#1D4ED8] hover:text-white transition-all duration-300"
          aria-label="Scroll filters left"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Filters */}
        <div
          ref={scrollRef}
          className="relative overflow-x-auto no-scrollbar scroll-smooth w-full sm:max-w-[85%] px-2 sm:px-4"
        >
          <div className="flex items-center gap-2 p-1.5 bg-[#0a132e]/5 border border-slate-200/60 rounded-2xl md:rounded-full w-max mx-auto backdrop-blur-sm">

            {filters.map((filter) => {
              const isActive = selected === filter;

              return (
                <button
                  key={filter}
                  onClick={() => setSelected(filter)}
                  className={`relative px-5 py-2.5 md:px-8 md:py-3 rounded-xl md:rounded-full text-xs md:text-sm font-black tracking-wider uppercase transition-colors duration-300 whitespace-nowrap z-10 ${
                    isActive
                      ? "text-white"
                      : "text-slate-500 hover:text-[#1D4ED8]"
                  }`}
                >
                  <span className="relative z-20">{filter}</span>

                  {isActive && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 z-10 rounded-xl md:rounded-full shadow-lg shadow-blue-900/20"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                      }}
                      style={{
                        background:
                          "linear-gradient(135deg,#1D4ED8 0%,#1e3a8a 100%)",
                      }}
                    >
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#DA1F28] rounded-full shadow-[0_0_8px_#DA1F28]" />
                    </motion.div>
                  )}
                </button>
              );
            })}

          </div>
        </div>

        {/* Right Arrow (Desktop / Tablet with mouse) */}
        <button
          onClick={scrollRight}
          className="hidden sm:flex absolute right-2 md:right-5 lg:right-8 z-50 w-11 h-11 rounded-full bg-white border border-gray-200 shadow-lg items-center justify-center hover:bg-[#1D4ED8] hover:text-white transition-all duration-300"
          aria-label="Scroll filters right"
        >
          <ChevronRight size={22} />
        </button>

      </nav>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scroll-smooth {
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  );
}