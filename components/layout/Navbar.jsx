"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronRight, ChevronDown } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  {
  name: "Products",
  href: "/products",
  dropdown: [
    {
      name: "Fire Hydrant System",
      children: [
        { name: "Hydrant Valve", href: "/products/hydrant-valve" },
        { name: "Canvas Hose", href: "/products/canvas-hose" },
        { name: "Branch Pipes", href: "/products/branch-pipes" },
        { name: "Hose Reel Drum", href: "/products/hose-reel-drum" },
        { name: "Fire Inlet", href: "/products/fire-inlet" },
        { name: "Hose Box", href: "/products/hose-box" },
      ],
    },

    {
      name: "Automatic Sprinkler System",
      children: [
        { name: "Sprinkler", href: "/products/sprinkler" },
        { name: "Alarm Valve", href: "/products/alarm-valve" },
      ],
    },

    {
      name: "Fire Alarm & Smoke Detection System",
      children: [
        {
          name: "Fire Alarm & Smoke Detection System",
          href: "/products/alarm-system",
        },
      ],
    },

    {
      name: "Fire Pumps & Control Panels",
      children: [
        { name: "Monoblock Pumps", href: "/products/monoblock-pumps" },
        { name: "Coupled Pumps", href: "/products/coupled-pumps" },
        {
          name: "Diesel Engine Driven Pumps",
          href: "/products/diesel-engine-driven-pumps",
        },
        { name: "Pump Control Panel", href: "/products/control-panels" },
      ],
    },

    {
      name: "Fire Extinguisher",
      children: [
        {
          name: "Fire Extinguisher",
          href: "/products/fire-extinguisher",
        },
        {
          name: "Fire Extinguisher Spares",
          href: "/products/fire-extinguisher-spares",
        },
      ],
    },

    {
      name: "Accessories",
      children: [
        { name: "Hydrant Spares", href: "/products/hydrant-spares" },
        { name: "Paint", href: "/products/paint" },
        { name: "Hardware & Tools", href: "/products/hardware-tools" },
        {
          name: "Pressure Switch (DANFOSS) KP 36",
          href: "/products/pressure-switch",
        },
        { name: "Pressure Gauge", href: "/products/pressure-gauge" },
        {
          name: "Wrapping Coating Material",
          href: "/products/wrapping-coating-material",
        },
      ],
    },

    {
      name: "Isolation Valve",
      children: [
        { name: "Butterfly Valves", href: "/products/butterfly-valves" },
        { name: "Non Return Valves", href: "/products/non-return-valves" },
        { name: "Sluice Valve", href: "/products/sluice-valve" },
        { name: "Ball Valve", href: "/products/ball-valve" },
        { name: "Gate Valve", href: "/products/gate-valve" },
        { name: "Air Release Valve", href: "/products/air-valve" },
        { name: "Foot Valve", href: "/products/foot-valve" },
      ],
    },
  ],
},
  { name: "Services", href: "/services" },
  { name: "Clients", href: "/clients" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);
  const [mobileActiveCategory, setMobileActiveCategory] = useState(null);
  const dropdownRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProductDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-500 ease-in-out ${
      scrolled ? "p-0" : "p-3 md:p-6"
    }`}>
      <div 
        className={`mx-auto flex items-center justify-between transition-all duration-500 ease-in-out bg-white/95 backdrop-blur-md shadow-lg border-gray-100 ${
          scrolled 
            ? "max-w-full w-full rounded-none px-4 md:px-12 py-3 md:py-4 border-b" 
            : "max-w-7xl rounded-full px-4 md:px-8 py-2 md:py-3 border"
        }`}
      >
        
        {/* Left: Logo Section */}
        <Link href="/" className="flex items-center gap-2 md:gap-3 group shrink-0">
          <div className="w-8 h-8 md:w-11 md:h-11">
            <img
              src="/images/logo1.png"
              alt="Shree Atharva Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-[11px] md:text-base font-black tracking-tighter text-[#1A52A2] leading-none uppercase">
              Shree Atharva
            </h1>
            <p className="text-[7px] md:text-[10px] tracking-[0.2em] font-bold text-[#DA1F28] uppercase">
              Enterprises
            </p>
          </div>
        </Link>

        {/* Center: Desktop Pages Text */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-6 xl:gap-8 text-sm font-bold text-slate-700">
          {navLinks.map((link) => {
            if (link.dropdown) {
              return (
                <div 
                  key={link.name} 
                  className="relative"
                  ref={dropdownRef}
                  onMouseEnter={() => setProductDropdownOpen(true)}
                  onMouseLeave={() => setProductDropdownOpen(false)}
                >
                  <button 
                    className="hover:text-[#1A52A2] flex items-center gap-1 transition-colors whitespace-nowrap font-bold text-sm text-slate-700 focus:outline-none py-2"
                  >
                    {link.name}
                    <ChevronDown size={14} className={`transition-transform duration-300 ${productDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  
                  <AnimatePresence>
                    {productDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 -translate-x-1/2 mt-3 w-[660px] bg-white border border-slate-100 rounded-2xl shadow-2xl overflow-hidden z-[10000]"
                      >
                        <div className="flex w-full min-h-[400px]">
                          {/* Left Categories Column */}
                          <div className="w-[280px] bg-slate-50/70 border-r border-slate-100 p-3 space-y-1">
                            <p className="px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                              Categories
                            </p>
                            {link.dropdown.map((category, index) => (
                              <div
                                key={category.name}
                                onMouseEnter={() => setActiveCategory(index)}
                                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-all ${
                                  activeCategory === index
                                    ? "bg-white text-[#DA1F28] shadow-sm font-bold"
                                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 font-medium"
                                }`}
                              >
                                <span className="text-xs leading-snug">
                                  {category.name}
                                </span>
                                <ChevronRight 
                                  size={14} 
                                  className={`transition-transform duration-200 shrink-0 ml-2 ${
                                    activeCategory === index ? "text-[#DA1F28] translate-x-0.5" : "text-slate-300"
                                  }`} 
                                />
                              </div>
                            ))}
                          </div>

                          {/* Right Sub Categories Column */}
                          <div className="flex-1 bg-white p-5 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                                <span className="text-xs font-black uppercase tracking-wider text-[#1A52A2]">
                                  {link.dropdown[activeCategory]?.name}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                  {link.dropdown[activeCategory]?.children?.length || 0} Products
                                </span>
                              </div>

                              <div className="grid grid-cols-1 gap-1">
                                {link.dropdown[activeCategory]?.children?.map((item) => (
                                  <Link
                                    key={item.name}
                                    href={item.href || "#"}
                                    onClick={() => setProductDropdownOpen(false)}
                                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-700 hover:text-[#DA1F28] hover:bg-red-50/60 transition-all group"
                                  >
                                    <span className="group-hover:translate-x-1 transition-transform">
                                      {item.name}
                                    </span>
                                    <ChevronRight size={13} className="text-slate-300 group-hover:text-[#DA1F28] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                                  </Link>
                                ))}
                              </div>
                            </div>

                            {/* Footer link to all products */}
                            <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between">
                              <Link
                                href="/products"
                                onClick={() => setProductDropdownOpen(false)}
                                className="text-[11px] font-bold text-[#1A52A2] hover:text-[#DA1F28] transition-colors flex items-center gap-1.5"
                              >
                                <span>Explore All Products</span>
                                <ChevronRight size={12} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link 
                key={link.name} 
                href={link.href}
                className="hover:text-[#1A52A2] transition-colors whitespace-nowrap"
              >
                {link.name}
              </Link>
            );
          })}
        </div>
          
        {/* Right: CTA & Contact */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-4 border-l border-gray-200 pl-6 shrink-0">
          <a href="tel:+917304251133" className="p-2 text-[#DA1F28] hover:bg-red-50 rounded-full transition-colors">
            <Phone size={18} fill="currentColor" />
          </a>
          <Link href="/contact">
            <button className="px-4 xl:px-6 py-2.5 bg-[#DA1F28] text-white text-xs font-bold rounded-full hover:scale-105 transition-transform shadow-md active:scale-95">
              Get Quote
            </button>
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <div className="lg:hidden flex items-center gap-2">
          {/* Mobile Quick Call */}
          <a href="tel:+917304251133" className="p-2 text-[#DA1F28] bg-red-50 rounded-full">
            <Phone size={18} fill="currentColor" />
          </a>
          <button 
            className="p-2 text-[#1A52A2] hover:bg-slate-50 rounded-lg transition-colors focus:outline-none"
            onClick={() => setIsOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* MOBILE SIDEBAR SYSTEM */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsOpen(false);
                setMobileProductOpen(false);
                setMobileActiveCategory(null);
              }}
              className="fixed inset-0 bg-[#0A132E]/60 backdrop-blur-sm z-[1100] lg:hidden"
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-white z-[1200] shadow-2xl lg:hidden flex flex-col"
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-5 border-b border-slate-50">
                <div className="flex items-center gap-2">
                   <img src="/images/logo1.png" alt="Logo" className="w-8 h-8 object-contain" />
                   <span className="font-black text-[#1A52A2] text-sm uppercase tracking-tighter">Atharva</span>
                </div>
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    setMobileProductOpen(false);
                    setMobileActiveCategory(null);
                  }}
                  className="p-2 bg-slate-50 text-slate-400 rounded-full hover:text-[#DA1F28] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 no-scrollbar">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 px-4">Main Menu</p>
                {navLinks.map((link) => {
                  if (link.dropdown) {
                    return (
                      <div key={link.name} className="flex flex-col">
                        <button 
                          onClick={() => setMobileProductOpen(!mobileProductOpen)}
                          className="flex items-center justify-between py-3.5 px-4 rounded-xl hover:bg-[#1A52A2]/5 transition-all text-left w-full focus:outline-none"
                        >
                          <span className="text-base font-bold text-slate-700">
                            {link.name}
                          </span>
                          <ChevronDown size={18} className={`text-slate-300 transition-transform duration-300 ${mobileProductOpen ? "rotate-180 text-[#1A52A2]" : ""}`} />
                        </button>
                        
                        <AnimatePresence initial={false}>
                          {mobileProductOpen && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden pl-2 bg-slate-50/50 rounded-xl mt-1 max-h-[48vh] overflow-y-auto no-scrollbar space-y-1 py-1"
                            >
                              <Link 
                                href={link.href || "/products"}
                                onClick={() => {
                                  setIsOpen(false);
                                  setMobileProductOpen(false);
                                  setMobileActiveCategory(null);
                                }}
                                className="flex items-center justify-between py-2 px-3 rounded-lg text-xs font-bold text-[#1A52A2] uppercase tracking-wider hover:bg-slate-100 transition-all"
                              >
                                <span>All Products</span>
                                <ChevronRight size={13} />
                              </Link>

                              {link.dropdown.map((category, catIndex) => {
                                const hasChildren = category.children && category.children.length > 0;
                                const isExpanded = mobileActiveCategory === catIndex;

                                if (hasChildren) {
                                  return (
                                    <div key={category.name} className="border-t border-slate-100/80 pt-1">
                                      <button 
                                        type="button"
                                        onClick={() => setMobileActiveCategory(isExpanded ? null : catIndex)}
                                        className="flex items-center justify-between w-full py-2 px-3 text-left font-semibold text-xs text-slate-700 hover:text-[#1A52A2] rounded-lg transition-colors focus:outline-none"
                                      >
                                        <span className="leading-tight">{category.name}</span>
                                        <ChevronDown size={14} className={`text-slate-400 shrink-0 ml-2 transition-transform duration-200 ${isExpanded ? "rotate-180 text-[#1A52A2]" : ""}`} />
                                      </button>
                                      
                                      {isExpanded && (
                                        <div className="pl-3 pr-1 py-1 space-y-0.5">
                                          {category.children.map((subLink) => (
                                            <Link 
                                              key={subLink.name}
                                              href={subLink.href || "#"} 
                                              onClick={() => {
                                                setIsOpen(false);
                                                setMobileProductOpen(false);
                                                setMobileActiveCategory(null);
                                              }}
                                              className="flex items-center justify-between py-1.5 px-3 rounded-lg hover:text-[#1A52A2] hover:bg-slate-100 transition-all text-left"
                                            >
                                              <span className="text-[13px] font-medium tracking-tight text-slate-600 antialiased">
                                                {subLink.name}
                                              </span>
                                              <ChevronRight size={12} className="text-slate-300 shrink-0" />
                                            </Link>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  );
                                }

                                return (
                                  <Link 
                                    key={category.name}
                                    href={category.href || "#"} 
                                    onClick={() => {
                                      setIsOpen(false);
                                      setMobileProductOpen(false);
                                      setMobileActiveCategory(null);
                                    }}
                                    className="flex items-center justify-between py-2 px-3 rounded-lg hover:text-[#1A52A2] hover:bg-slate-100 transition-all"
                                  >
                                    <span className="text-[13px] font-semibold text-slate-700 antialiased">
                                      {category.name}
                                    </span>
                                    <ChevronRight size={14} className="text-slate-300" />
                                  </Link>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <Link 
                      key={link.name}
                      href={link.href} 
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between group py-3.5 px-4 rounded-xl hover:bg-[#1A52A2]/5 transition-all"
                    >
                      <span className="text-base font-bold text-slate-700 group-hover:text-[#1A52A2]">
                        {link.name}
                      </span>
                      <ChevronRight size={18} className="text-slate-300 group-hover:text-[#1A52A2] group-hover:translate-x-1 transition-all" />
                    </Link>
                  );
                })}
              </div>

              {/* Sidebar Footer */}
              <div className="p-5 bg-slate-50 mt-auto">
                <div className="flex flex-col gap-3">
                  <a 
                    href="tel:+917304251133" 
                    className="flex items-center gap-4 p-3.5 bg-white rounded-2xl border border-slate-100 shadow-sm"
                  >
                    <div className="p-2 bg-red-50 text-[#DA1F28] rounded-lg shrink-0">
                      <Phone size={18} fill="currentColor" />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Call Us</span>
                      <span className="text-sm font-black text-[#0A132E] truncate">+91 7304251133</span>
                    </div>
                  </a>

                  <Link href="/contact" onClick={() => setIsOpen(false)} className="w-full">
                    <button className="w-full py-4 bg-[#DA1F28] text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-lg shadow-red-500/20 active:scale-95 transition-all">
                      Get A Free Quote
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Global CSS Injectors for Clean Multi-item Dropdown Scroll paths */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </nav>
  );
}