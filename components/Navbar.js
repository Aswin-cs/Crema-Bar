"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 w-full z-50 flex justify-center mt-4 px-4 pointer-events-none">
      <nav className={`pointer-events-auto w-full max-w-4xl border border-borderLight rounded-full transition-all duration-300 bg-white/60 backdrop-blur-2xl ${
        scrolled ? "shadow-sm" : ""
      }`}>
        <div className="px-6 h-16 flex justify-between items-center">
          <div className="flex-shrink-0 cursor-pointer flex items-center gap-2">
            <img src="/images/logo image.jpeg" alt="Zaithoon's Custard Logo" className="w-8 h-8 rounded-full" />
            <div>
              <span className="font-bold font-raleway font-800 text-primary text-xl italic">Zaithoon's</span>
              <span className="font-raleway font-[400] text-primary text-xl ml-1 italic">Custard</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            {["Home", "About", "Menu", "Gallery", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="font-[500] text-base tracking-wide transition-colors duration-300 hover:text-primary text-[#555555]">
                {item}
              </a>
            ))}
            <a href="#location" className="bg-primary text-white px-5 py-2 rounded-full font-bold font-[700] text-sm hover:bg-opacity-90 transition-colors">
              Find Us
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-2xl text-primary focus:outline-none">
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-borderLight rounded-b-3xl overflow-hidden mt-1 absolute w-full left-0"
            >
              <div className="px-6 pt-2 pb-6 flex flex-col space-y-2">
                {["Home", "About", "Menu", "Gallery", "Contact"].map((item) => (
                  <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="block py-2 text-textDark font-[600] hover:text-primary transition-colors text-center">
                    {item}
                  </a>
                ))}
                <div className="pt-2">
                  <a href="#location" onClick={() => setMobileMenuOpen(false)} className="inline-block bg-primary text-white px-6 py-2 rounded-full font-[700] text-sm w-full text-center">
                    Find Us
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
