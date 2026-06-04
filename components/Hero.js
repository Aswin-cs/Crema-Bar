"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Duplicated for smooth loop

  return (
    <section id="home" className="relative min-h-screen bg-bgLight overflow-hidden flex flex-col items-center justify-center pt-32 pb-64 md:pb-72">
      {/* Top Violet Gradient for Navbar Blur */}
      <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-primary/30 to-transparent pointer-events-none" />

      {/* Inline SVG Background - Desktop */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[50%] hidden md:block" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1440 800">
        <path d="M0 200 C300 0, 1140 400, 1440 200" stroke="#7b34a2" strokeWidth="2" fill="none" />
        <path d="M0 400 C400 100, 1040 700, 1440 400" stroke="#7b34a2" strokeWidth="2" fill="none" />
        <path d="M0 600 C500 300, 940 900, 1440 600" stroke="#7b34a2" strokeWidth="2" fill="none" />
      </svg>

      {/* Inline SVG Background - Mobile */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[50%] block md:hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 400 800">
        <path d="M0 150 C100 100, 300 250, 400 200" stroke="#7b34a2" strokeWidth="2" fill="none" />
        <path d="M0 400 C150 300, 250 500, 400 450" stroke="#7b34a2" strokeWidth="2" fill="none" />
        <path d="M0 650 C100 550, 300 750, 400 700" stroke="#7b34a2" strokeWidth="2" fill="none" />
      </svg>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center mt-12 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
          className="flex flex-col items-center"
        >
          <motion.span 
            className="text-primary font-[600] tracking-wide text-sm mb-6 inline-block uppercase"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Pure Milk Custard · Thrissur
          </motion.span>
          
          <motion.h1 
            className="text-primary font-[900] uppercase leading-[1] mb-6"
            style={{ fontSize: "clamp(48px, 8vw, 100px)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            SWEETENING EVERY MOMENT !
          </motion.h1>
          
          <motion.p 
            className="text-[#555555] font-[500] text-[18px] max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            100% Pure Milk · Fresh Fruits · Premium Nuts · Pista Ice Cream
          </motion.p>
          
          <motion.a 
            href="#menu"
            className="bg-primary text-white px-8 py-3 rounded-full font-[700] hover:bg-opacity-90 transition-colors inline-block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Explore Now
          </motion.a>
        </motion.div>
      </div>

      {/* Scrolling Images Strip Peeking at Bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden translate-y-12 md:translate-y-24">
        <div className="flex w-[200%] animate-scroll-left gap-6 pb-0">
          {images.map((item, idx) => (
            <div key={idx} className="w-[180px] h-[220px] md:w-[260px] md:h-[300px] bg-borderLight rounded-2xl flex-shrink-0 flex items-end justify-center pb-4 relative overflow-hidden group border border-borderLight/50">
              <Image src={`/images/custard${(idx % 12) + 1}.jpeg`} alt="Custard" fill className="object-cover opacity-60 mix-blend-multiply" />
              <div className="absolute inset-0 z-10 hover:bg-white/10 transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
