"use client";
import { motion } from "framer-motion";

export default function Showcase() {
  const images = [
    "/images/custard1.jpeg",
    "/images/custard.png",
    "/images/custard2.jpeg",
    "/images/custard3.jpeg",
    "/images/custard4.jpeg",
    "/images/custard5.jpeg",
  ];
  
  // Duplicate twice to ensure enough width for seamless 50% translation
  const marqueeImages = [...images, ...images];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="font-[900] text-4xl md:text-5xl text-primary uppercase tracking-wider">Supreme Custards</h2>
        </motion.div>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="flex w-[200%] md:w-max animate-scroll-left gap-8 px-4 [animation-duration:12s] md:[animation-duration:30s] hover:[animation-play-state:paused] active:[animation-play-state:paused]">
          {marqueeImages.map((src, idx) => (
            <div 
              key={idx}
              className={`w-[250px] md:w-[300px] flex-shrink-0 aspect-[4/5] relative flex items-end justify-center overflow-hidden ${src.endsWith('.png') ? '' : 'rounded-2xl bg-bgLight'}`}
            >
              <img 
                src={src} 
                alt="Supreme Custard" 
                className={`w-full h-full ${src.endsWith('.png') ? 'object-contain scale-90' : 'object-cover'} transition-transform duration-700 hover:scale-105`} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
