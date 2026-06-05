"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import IceCreamAnimation from "./IceCreamAnimation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      
      // Fallback: Check if user scrolled to the absolute bottom of the page
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        setActiveIndex(4); // "Contact" is the last section (index 4)
      } else if (window.scrollY < 50) {
        setActiveIndex(0); // "Home" is the first section (index 0)
      }
    };
    window.addEventListener("scroll", handleScroll);

    const sections = ["home", "about", "menu", "gallery", "contact"];
    const sectionElements = sections.map((id) => document.getElementById(id)).filter(Boolean);

    const observerOptions = {
      root: null,
      rootMargin: "-35% 0px -45% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const index = sections.indexOf(id);
          if (index !== -1) {
            setActiveIndex(index);
          }
        }
      });
    }, observerOptions);

    sectionElements.forEach((el) => observer.observe(el));

    // Initialize scrolled state on mount
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sectionElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <div className="fixed top-0 w-full z-50 flex justify-center mt-4 px-4 pointer-events-none">
        <nav className={`pointer-events-auto w-full max-w-4xl border border-borderLight rounded-full transition-all duration-300 bg-white/60 backdrop-blur-2xl ${
          scrolled ? "shadow-sm" : ""
        }`}>
          <div className="px-6 h-16 flex justify-between items-center">
            <div className="flex-shrink-0 cursor-pointer flex items-center gap-2">
              <IceCreamAnimation className="w-8 h-8 rounded-full bg-[#E6E6FA] overflow-hidden" />
              <div>
                <span className="font-bold font-raleway font-800 text-primary text-xl italic">Zaithoon's</span>
                <span className="font-raleway font-[400] text-primary text-xl ml-1 italic">Custard</span>
              </div>
            </div>
            
            <div 
              className="hidden md:flex items-center space-x-1"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {["Home", "About", "Menu", "Gallery", "Contact"].map((item, index) => {
                const isHovered = hoveredIndex === index;
                const isActive = activeIndex === index && hoveredIndex === null;
                const isHighlighted = isHovered || isActive;

                return (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    className={`relative px-4 py-1.5 font-[500] text-base tracking-wide transition-colors duration-200 z-10 ${
                      hoveredIndex === index || activeIndex === index
                        ? "text-primary font-[600]"
                        : "text-[#555555] font-[500]"
                    }`}
                  >
                    {isHighlighted && (
                      <motion.span
                        layoutId="navbarActiveBg"
                        className={`absolute inset-0 rounded-full -z-10 ${
                          isHovered ? "bg-primary/10" : "bg-primary/5"
                        }`}
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    {item}
                  </a>
                );
              })}
              <motion.a 
                href="#location" 
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0px 6px 15px rgba(123, 52, 162, 0.3)" 
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="bg-primary text-white px-5 py-2 rounded-full font-bold font-[700] text-sm ml-4 transition-colors duration-200 hover:bg-[#6a2590]"
              >
                Find Us
              </motion.a>
            </div>

            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(true)} 
                className="text-2xl text-primary focus:outline-none p-1"
                aria-label="Open Menu"
              >
                <FiMenu />
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Full-screen Mobile Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[9999] bg-white flex flex-col md:hidden pointer-events-auto"
          >
            {/* Mobile Header Row */}
            <div className="px-6 h-20 flex justify-between items-center border-b border-borderLight mt-4">
              <div className="flex items-center gap-2">
                <IceCreamAnimation className="w-8 h-8 rounded-full bg-[#E6E6FA] overflow-hidden" />
                <div>
                  <span className="font-bold font-raleway font-800 text-primary text-xl italic">Zaithoon's</span>
                  <span className="font-raleway font-[400] text-primary text-xl ml-1 italic">Custard</span>
                </div>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)} 
                className="text-3xl text-primary focus:outline-none p-2"
                aria-label="Close Menu"
              >
                <FiX />
              </button>
            </div>

            {/* Mobile Links container */}
            <div className="flex-1 flex flex-col justify-center items-center space-y-6 px-6 pb-20 bg-bgLight">
              {["Home", "About", "Menu", "Gallery", "Contact"].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 + 0.1 }}
                >
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="text-2xl font-[700] text-primary hover:text-primary/70 transition-colors duration-300 tracking-wide uppercase"
                  >
                    {item}
                  </a>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 5 * 0.05 + 0.1 }}
                className="w-full max-w-xs pt-4"
              >
                <a 
                  href="#location" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="block bg-primary text-white px-8 py-3 rounded-full font-[700] text-lg text-center shadow-lg shadow-primary/20 hover:bg-opacity-90 transition-colors"
                >
                  Find Us
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
