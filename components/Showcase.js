"use client";
import { motion, useMotionValue, useScroll, useVelocity, useSpring, useAnimationFrame } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function HoverCard({ src, alt }) {
  const isPng = src.endsWith('.png');

  return (
    <motion.div
      whileHover={{ y: -12 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={`w-[250px] md:w-[300px] flex-shrink-0 aspect-[4/5] relative flex items-end justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none transition-shadow duration-300 transform-gpu will-change-transform ${
        isPng 
          ? 'filter drop-shadow-md hover:drop-shadow-2xl' 
          : 'rounded-2xl bg-bgLight shadow-md hover:shadow-2xl hover:shadow-primary/15'
      }`}
    >
      <motion.img 
        src={src} 
        alt={alt} 
        style={{
          scale: isPng ? 0.9 : 1.0
        }}
        whileHover={{ scale: isPng ? 0.95 : 1.05 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`w-full h-full pointer-events-none select-none transform-gpu ${
          isPng ? 'object-contain' : 'object-cover'
        }`}
      />
    </motion.div>
  );
}

export default function Showcase() {
  const images = [
    { src: "/images/cream_white_chocolate_cake.jpeg", alt: "White Chocolate Cake" },
    { src: "/images/sample_dish.jpeg", alt: "Sample Dish" },
    { src: "/images/cream_tiramisu.jpeg", alt: "Layered Tiramisu" },
    { src: "/images/cream_eclairs.jpeg", alt: "Cream-filled Eclairs" },
    { src: "/images/cream_fettuccine.jpeg", alt: "Creamy Fettuccine" },
    { src: "/images/cream_cheesecake.jpeg", alt: "Classic Cheesecake" },
  ];
  
  const marqueeImages = [...images, ...images];

  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [halfWidth, setHalfWidth] = useState(0);
  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Scroll tracking for velocity-based speed and direction adjustments
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 300 });

  // Measure track widths
  useEffect(() => {
    const handleResize = () => {
      if (trackRef.current) {
        const totalWidth = trackRef.current.scrollWidth;
        setHalfWidth(totalWidth / 2);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const baseSpeed = -1.2; // Base speed: slowly moving right-to-left (negative)

  useAnimationFrame((time, delta) => {
    if (isDragging || halfWidth === 0) return;

    // Capture dynamic velocity (pixels/sec)
    const velocity = smoothVelocity.get();

    // Map velocity to speed and direction:
    // Scroll down (velocity > 0) -> accelerates right-to-left (negative delta)
    // Scroll up (velocity < 0) -> scrolls left-to-right (positive delta)
    // Scale factor (0.006) adjusts how sensitive the marquee speed is to scroll speed.
    const scrollDelta = -velocity * 0.006;

    // Pause base speed if hovered, but scroll velocity can still slide it
    const currentBaseSpeed = isHovered ? 0 : baseSpeed;

    // Keep it frame-rate independent by scaling with delta time
    const timeFactor = delta / 16.666;
    const frameDelta = (currentBaseSpeed + scrollDelta) * timeFactor;

    let newX = x.get() + frameDelta;

    // Infinite wrapping logic
    if (newX < -halfWidth) {
      newX += halfWidth;
    } else if (newX > 0) {
      newX -= halfWidth;
    }

    x.set(newX);
  });

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    
    let currentX = x.get();
    // Seamless wrapping check immediately after dragging
    if (currentX < -halfWidth) {
      x.set(currentX + halfWidth);
    } else if (currentX > 0) {
      x.set(currentX - halfWidth);
    }
  };

  return (
    <section className="py-24 bg-white overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="font-[900] text-4xl md:text-5xl text-primary uppercase tracking-wider">Supreme Custards</h2>
          <p className="font-[500] text-lg text-[#555555] max-w-xl mx-auto mt-4 italic leading-relaxed">
            "A royal symphony of slow-cooked milk and premium toppings,
            <br />
            crafted to sweeten your special moments."
          </p>
        </motion.div>
      </div>

      <div 
        ref={containerRef} 
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={{
            left: -halfWidth * 1.5,
            right: halfWidth * 0.5,
          }}
          dragElastic={0.15}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          style={{ x }}
          className="flex w-max gap-8 px-4 will-change-transform touch-pan-y"
        >
          {marqueeImages.map((item, idx) => (
            <HoverCard key={idx} src={item.src} alt={item.alt} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
