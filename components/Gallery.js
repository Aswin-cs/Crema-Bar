"use client";
import { motion } from "framer-motion";
import MagicBento from "./MagicBento";

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-bgLight">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="font-[900] text-4xl md:text-5xl text-primary uppercase tracking-wider mb-3">THE ZAITHOON'S DIFFERENCE</h2>
          <p className="font-[400] text-[#555555]">What makes our custard so special</p>
        </motion.div>

        <div className="w-full relative flex justify-center">
          <MagicBento
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="36, 0, 70"
          />
        </div>

      </div>
    </section>
  );
}
