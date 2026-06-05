"use client";
import { useEffect, useRef } from "react";
import { useScroll, useTransform, useMotionValue, useAnimate, motion } from "framer-motion";

export default function ScrollToTop() {
  const [scope, animate] = useAnimate();
  const timeoutRef = useRef(null);
  const isVisibleRef = useRef(false);
  const isScrollingRef = useRef(false);

  const { scrollYProgress, scrollY } = useScroll();

  const radius = 20;
  const circumference = 2 * Math.PI * radius;

  // Directly drive ring animation off scroll — zero React re-renders
  const dashOffset = useTransform(scrollYProgress, [0, 1], [circumference, 0]);

  const showButton = () => {
    if (!scope.current) return;
    animate(scope.current, { opacity: 1, scale: 1, y: 0 }, {
      type: "spring",
      stiffness: 320,
      damping: 22,
      mass: 0.7,
    });
  };

  const hideButton = (fast = false) => {
    if (!scope.current) return;
    animate(scope.current, { opacity: 0, scale: 0.5, y: 16 }, {
      duration: fast ? 0.12 : 0.18,
      ease: "easeIn",
    });
  };

  useEffect(() => {
    if (!scope.current) return;

    // Start hidden
    animate(scope.current, { opacity: 0, scale: 0.5, y: 16 }, { duration: 0 });

    const unsubscribe = scrollY.on("change", (latest) => {
      const pastThreshold = latest > 300;

      // Handle scroll-hide / scroll-show state
      if (isScrollingRef.current === false && pastThreshold) {
        // Instant hide while scrolling starts — no flicker
        hideButton(true);
      }
      isScrollingRef.current = true;
      isVisibleRef.current = pastThreshold;

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        if (isVisibleRef.current) {
          showButton();
        }
      }, 700);
    });

    return () => {
      unsubscribe();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      ref={scope}
      onClick={scrollToTop}
      style={{ opacity: 0 }}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center cursor-pointer shadow-md border border-borderLight/40 group hover:shadow-lg transition-shadow duration-300"
      aria-label="Scroll to top"
    >
      {/* Radial Progress Ring */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 48 48"
        style={{ transform: "rotate(-90deg)" }}
      >
        {/* Track */}
        <circle
          cx="24" cy="24" r={radius}
          stroke="#ede0fa"
          strokeWidth="3.5"
          fill="transparent"
          opacity="0.55"
        />
        {/* Progress */}
        <motion.circle
          cx="24" cy="24" r={radius}
          stroke="#7b34a2"
          strokeWidth="3.5"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: dashOffset }}
        />
      </svg>

      {/* Arrow */}
      <svg
        className="w-5 h-5 relative z-10 group-hover:-translate-y-0.5 transition-transform duration-200"
        fill="none" stroke="#7b34a2" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}

