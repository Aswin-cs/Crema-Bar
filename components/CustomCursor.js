"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [ripples, setRipples] = useState([]);
  const [hoverLabel, setHoverLabel] = useState("");
  const [isOverPurple, setIsOverPurple] = useState(false);

  const holdTimerRef = useRef(null);
  const holdStartRef = useRef(null);
  const holdRafRef = useRef(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Ring follows with a smooth spring lag
  const springConfig = { damping: 28, stiffness: 180, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  // Trail dots
  const trailSpring1 = { damping: 22, stiffness: 120, mass: 0.8 };
  const trail1X = useSpring(cursorX, trailSpring1);
  const trail1Y = useSpring(cursorY, trailSpring1);

  const trailSpring2 = { damping: 18, stiffness: 90, mass: 1.0 };
  const trail2X = useSpring(cursorX, trailSpring2);
  const trail2Y = useSpring(cursorY, trailSpring2);

  // ---- Mouse tracking ----
  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  // ---- Click + hold/pressurize ----
  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseDown = (e) => {
      setIsClicking(true);

      // Start hold timer for pressurize effect
      holdStartRef.current = Date.now();
      const updateHold = () => {
        const elapsed = Date.now() - holdStartRef.current;
        const progress = Math.min(elapsed / 1200, 1); // 1.2s to fill
        setHoldProgress(progress);
        if (progress < 1) {
          holdRafRef.current = requestAnimationFrame(updateHold);
        }
      };
      holdRafRef.current = requestAnimationFrame(updateHold);
    };

    const handleMouseUp = (e) => {
      setIsClicking(false);

      // Cancel hold
      if (holdRafRef.current) cancelAnimationFrame(holdRafRef.current);

      // Spawn click ripple
      const id = Date.now();
      const intensity = holdProgress; // stronger ripple for longer hold
      setRipples((prev) => [
        ...prev,
        { id, x: e.clientX, y: e.clientY, intensity },
      ]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 700);

      setHoldProgress(0);
      holdStartRef.current = null;
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      if (holdRafRef.current) cancelAnimationFrame(holdRafRef.current);
    };
  }, [isTouchDevice, holdProgress]);

  // ---- Hover detection on interactive elements ----
  const handleHoverDetection = useCallback(() => {
    const hoverTargets = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select, [data-cursor-hover]"
    );

    const enterHandler = (e) => {
      setIsHovering(true);
      // Pick up label from data attribute or aria-label or inner text
      const label =
        e.currentTarget.getAttribute("data-cursor-label") ||
        e.currentTarget.getAttribute("aria-label") ||
        "";
      setHoverLabel(label);
    };
    const leaveHandler = () => {
      setIsHovering(false);
      setHoverLabel("");
    };

    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", enterHandler);
      el.addEventListener("mouseleave", leaveHandler);
    });

    return () => {
      hoverTargets.forEach((el) => {
        el.removeEventListener("mouseenter", enterHandler);
        el.removeEventListener("mouseleave", leaveHandler);
      });
    };
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;
    const cleanup = handleHoverDetection();

    const observer = new MutationObserver(() => {
      handleHoverDetection();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cleanup();
      observer.disconnect();
    };
  }, [isTouchDevice, handleHoverDetection]);

  // ---- Detect if cursor is over a purple background ----
  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseOver = (e) => {
      const element = e.target;
      if (!element) return;

      let currentEl = element;
      let foundPurple = false;
      
      while (currentEl && currentEl !== document.body) {
        // Quick class name or tag check
        const classList = currentEl.className;
        if (typeof classList === "string" && (
          classList.includes("bg-primary") || 
          classList.includes("bg-footer") ||
          currentEl.tagName === "FOOTER"
        )) {
          foundPurple = true;
          break;
        }

        // Computed style check
        const style = window.getComputedStyle(currentEl);
        const bg = style.backgroundColor;
        if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
          const match = bg.match(/\d+/g);
          if (match && match.length >= 3) {
            const r = parseInt(match[0]);
            const g = parseInt(match[1]);
            const b = parseInt(match[2]);
            const a = match[3] !== undefined ? parseFloat(match[3]) : 1;
            // Our blue color (#1b4481) is rgb(27, 68, 129).
            // Check for blue hue
            if (a > 0.1 && b > 100 && r < 50 && g < 100) {
              foundPurple = true;
              break;
            }
          }
        }
        currentEl = currentEl.parentElement;
      }
      setIsOverPurple(foundPurple);
    };

    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;  // Derive sizes & colors
  const dotSize = isHovering ? 3.5 : 6;
  const ringSize = isHovering ? 20 : 32;

  const currentColor = isOverPurple
    ? "#ffffff"
    : (isHovering ? "#244a81" : "#1b4481");

  const currentRingBg = isOverPurple
    ? "rgba(255, 255, 255, 0.1)"
    : (isHovering ? "rgba(36, 74, 129, 0.08)" : "transparent");

  // Hold makes ring grow and glow
  const holdRingSize = ringSize + holdProgress * 28;
  const holdBorderWidth = 1.5 + holdProgress * 1.5;
  const holdOpacity = 0.35 + holdProgress * 0.45;
  
  const holdGlow = holdProgress > 0.1
    ? (isOverPurple
        ? `0 0 ${Math.round(holdProgress * 25)}px rgba(255, 255, 255, ${holdProgress * 0.7})`
        : `0 0 ${Math.round(holdProgress * 25)}px rgba(27, 68, 129, ${holdProgress * 0.5})`)
    : "none";

  const currentRingBorder = isOverPurple
    ? "1.5px solid rgba(255, 255, 255, 0.8)"
    : (isHovering 
        ? "1.5px solid rgba(36, 74, 129, 0.7)" 
        : `${holdBorderWidth}px solid rgba(27, 68, 129, ${holdOpacity})`);

  const trail2Bg = isOverPurple
    ? "rgba(255, 255, 255, 0.2)"
    : (isHovering ? "rgba(36, 74, 129, 0.15)" : "rgba(27, 68, 129, 0.15)");

  const trail1Bg = isOverPurple
    ? "rgba(255, 255, 255, 0.4)"
    : (isHovering ? "rgba(36, 74, 129, 0.25)" : "rgba(27, 68, 129, 0.25)");

  const progressStrokeColor = isOverPurple
    ? "rgba(255, 255, 255, 0.7)"
    : "rgba(27, 68, 129, 0.5)";

  return (
    <>
      {/* Trail dot 2 (furthest lag) */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: trail2X,
          y: trail2Y,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 9996,
          width: 3,
          height: 3,
          borderRadius: "50%",
          backgroundColor: trail2Bg,
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Trail dot 1 (medium lag) */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: trail1X,
          y: trail1Y,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 9997,
          width: 4,
          height: 4,
          borderRadius: "50%",
          backgroundColor: trail1Bg,
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Inner Dot */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 9999,
          borderRadius: "50%",
          backgroundColor: currentColor,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isClicking ? 0.4 : 1,
          width: dotSize,
          height: dotSize,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Outer Ring */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 9998,
          borderRadius: "50%",
          border: currentRingBorder,
          backgroundColor: currentRingBg,
          opacity: isVisible ? 1 : 0,
          boxShadow: holdGlow,
          mixBlendMode: "normal",
        }}
        animate={{
          scale: isClicking && holdProgress < 0.05 ? 0.8 : 1,
          width: holdRingSize,
          height: holdRingSize,
        }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
      />

      {/* Hold progress ring (SVG circle) */}
      {holdProgress > 0.05 && (
        <motion.div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            x: ringX,
            y: ringY,
            translateX: "-50%",
            translateY: "-50%",
            pointerEvents: "none",
            zIndex: 9998,
            width: holdRingSize + 8,
            height: holdRingSize + 8,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <svg
            width={holdRingSize + 8}
            height={holdRingSize + 8}
            viewBox={`0 0 ${holdRingSize + 8} ${holdRingSize + 8}`}
            style={{ transform: "rotate(-90deg)" }}
          >
            <circle
              cx={(holdRingSize + 8) / 2}
              cy={(holdRingSize + 8) / 2}
              r={(holdRingSize + 8) / 2 - 2}
              fill="none"
              stroke={progressStrokeColor}
              strokeWidth="2"
              strokeDasharray={`${Math.PI * (holdRingSize + 4)}`}
              strokeDashoffset={`${Math.PI * (holdRingSize + 4) * (1 - holdProgress)}`}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.05s linear" }}
            />
          </svg>
        </motion.div>
      )}

      {/* Hover label tooltip */}
      <AnimatePresence>
        {isHovering && hoverLabel && (
          <motion.div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              x: ringX,
              y: ringY,
              translateX: "-50%",
              translateY: "calc(-100% - 28px)",
              pointerEvents: "none",
              zIndex: 10000,
              fontSize: "11px",
              fontWeight: 600,
              color: isOverPurple ? "#ffffff" : "#1b4481",
              backgroundColor: isOverPurple ? "rgba(27, 68, 129, 0.95)" : "rgba(255,255,255,0.92)",
              backdropFilter: "blur(6px)",
              padding: "4px 10px",
              borderRadius: "6px",
              whiteSpace: "nowrap",
              boxShadow: isOverPurple ? "0 2px 12px rgba(0,0,0,0.2)" : "0 2px 12px rgba(27,68,129,0.15)",
              border: isOverPurple ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(27,68,129,0.12)",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {hoverLabel}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            style={{
              position: "fixed",
              top: ripple.y,
              left: ripple.x,
              translateX: "-50%",
              translateY: "-50%",
              pointerEvents: "none",
              zIndex: 9995,
              borderRadius: "50%",
              border: isOverPurple
                ? "1.5px solid rgba(255, 255, 255, 0.6)"
                : (isHovering 
                    ? "1.5px solid rgba(36, 74, 129, 0.5)" 
                    : "1.5px solid rgba(27, 68, 129, 0.4)"),
            }}
            initial={{
              width: 10,
              height: 10,
              opacity: 0.7,
            }}
            animate={{
              width: 60 + ripple.intensity * 50,
              height: 60 + ripple.intensity * 50,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </>
  );
}
