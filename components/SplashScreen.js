"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// All critical images used across the site that should be preloaded
const PRELOAD_IMAGES = [
  "/images/logo.svg",
  "/images/cafe_showcase.jpeg",
  "/images/sample_dish.jpeg",
  "/images/sample_dessert.jpeg",
  "/images/cream_white_chocolate_cake.jpeg",
  "/images/cream_tiramisu.jpeg",
  "/images/cream_eclairs.jpeg",
  "/images/cream_fettuccine.jpeg",
  "/images/cream_cheesecake.jpeg",
  "/images/cream_pot_pie.jpeg",
  "/images/cream_panna_cotta.jpeg",
  "/images/cream_carbonara.jpeg",
];

// Maximum time to wait for assets before proceeding anyway (ms)
const MAX_WAIT_MS = 8000;
// Minimum time to show the splash (for branding / smoothness)
const MIN_SPLASH_MS = 1800;

function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ src, status: "loaded" });
    img.onerror = () => resolve({ src, status: "error" });
    img.src = src;
  });
}

export default function SplashScreen() {
  const [phase, setPhase] = useState(0);
  const [visible, setVisible] = useState(true);
  const [assetsReady, setAssetsReady] = useState(false);
  const [cssLoaded, setCssLoaded] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);

  // Monitor if CSS is loaded by checking computed styling of a temporary test element
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkCss = () => {
      const testEl = document.createElement("div");
      testEl.className = "text-primary";
      document.body.appendChild(testEl);
      const computedColor = window.getComputedStyle(testEl).color;
      document.body.removeChild(testEl);

      // check if color matches rgb(36, 74, 129)
      if (computedColor === "rgb(36, 74, 129)" || computedColor === "rgba(36, 74, 129, 1)") {
        setCssLoaded(true);
        return true;
      }
      return false;
    };

    if (checkCss()) return;

    const interval = setInterval(() => {
      if (checkCss()) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Preload all assets
  useEffect(() => {
    document.body.style.overflow = "hidden";

    let cancelled = false;
    const start = Date.now();

    // Start preloading all images in parallel
    const preloadAll = Promise.all(PRELOAD_IMAGES.map(preloadImage));

    // Monitor logo loading status specifically
    preloadImage("/images/logo.svg").then((res) => {
      if (!cancelled && res.status === "loaded") {
        setLogoLoaded(true);
      }
    });

    // Also wait for fonts
    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();

    // Race: wait for all assets OR max timeout
    const maxTimer = new Promise((resolve) => setTimeout(resolve, MAX_WAIT_MS));

    const proceed = () => {
      if (cancelled) return;
      // Ensure minimum splash time for smooth branding
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_SPLASH_MS - elapsed);
      setTimeout(() => {
        if (!cancelled) setAssetsReady(true);
      }, remaining);
    };

    Promise.race([
      Promise.all([preloadAll, fontsReady]),
      maxTimer,
    ])
      .then(proceed)
      .catch((err) => {
        console.error("Asset preloading failed, clearing splash screen anyway:", err);
        proceed();
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Phase 1: Slide out the white overlay screen immediately on mount to reveal the violet loading screen
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 100);
    return () => clearTimeout(t1);
  }, []);

  // Phase 2: Slide out the violet screen to reveal the website once assets are ready
  useEffect(() => {
    if (!assetsReady) return;

    // Violet screen slides out
    const t2 = setTimeout(() => setPhase(2), 800);

    // Hide completely and restore scroll
    const t3 = setTimeout(() => {
      document.body.style.overflow = "auto";
      setVisible(false);
    }, 1500);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      document.body.style.overflow = "auto";
    };
  }, [assetsReady]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      {/* Violet Screen */}
      <AnimatePresence>
        {phase < 2 && (
          <motion.div
            key="violet-screen"
            className={`absolute inset-0 flex flex-col items-center justify-center z-40 pointer-events-auto transition-colors duration-300 ${
              cssLoaded
                ? "bg-gradient-to-br from-[#234d88ff] via-[#244a81ff] to-[#1b4481ff]"
                : "bg-transparent"
            }`}
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
              {logoLoaded && (
                <motion.img 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src="/images/logo.svg" 
                  alt="Zaithoon's Custard Logo" 
                  className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-2xl mb-2" 
                />
              )}
              <div className="flex items-center gap-4">
                <span className={`font-[800] text-4xl md:text-6xl font-montserrat tracking-wider transition-colors duration-300 ${cssLoaded ? 'text-white' : 'text-transparent'}`}>CREMA</span>
                <span className={`font-[400] text-4xl md:text-6xl font-montserrat tracking-wider transition-colors duration-300 ${cssLoaded ? 'text-white' : 'text-transparent'}`}>BAR</span>
              </div>

              {/* Loading indicator — visible while assets load */}
              {!assetsReady && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center gap-2 mt-2"
                >
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${cssLoaded ? 'bg-white/70' : 'bg-transparent'}`}
                        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
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
