"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [phase, setPhase] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Lock scrolling while splash screen is active
    document.body.style.overflow = "hidden";
    
    // Phase 0: Initial white screen
    // Phase 1: White screen slides out, revealing Violet screen with logo
    const t1 = setTimeout(() => setPhase(1), 200); 
    
    // Phase 2: Violet screen slides out, revealing website
    const t2 = setTimeout(() => setPhase(2), 1500); 
    
    // Hide completely and restore scroll
    const t3 = setTimeout(() => {
      document.body.style.overflow = "auto";
      setVisible(false);
    }, 2200); 

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      {/* Violet Screen */}
      <AnimatePresence>
        {phase < 2 && (
          <motion.div
            key="violet-screen"
            className="absolute inset-0 bg-gradient-to-br from-[#9b4add] via-[#7b34a2] to-[#461763] flex flex-col items-center justify-center z-40 pointer-events-auto"
            initial={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center gap-6"
            >
              <img src="/images/logo image.jpeg" alt="Zaithoon's Custard Logo" className="w-40 h-40 md:w-48 md:h-48 rounded-full border-2 border-white shadow-2xl" />
              <div className="flex items-center gap-4">
                <span className="font-[800] text-white text-3xl md:text-5xl italic">Zaithoon's</span>
                <span className="font-[400] text-white text-3xl md:text-5xl italic">Custard</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* White Screen Overlay */}
      <AnimatePresence>
        {phase === 0 && (
          <motion.div
            key="white-screen"
            className="absolute inset-0 bg-white z-50 pointer-events-auto"
            initial={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
