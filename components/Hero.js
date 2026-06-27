"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import ShinyText from "./ShinyText";

const heroImages = [
  { file: "cream_white_chocolate_cake.jpeg", alt: "White Chocolate Cake" },
  { file: "cream_tiramisu.jpeg", alt: "Layered Tiramisu" },
  { file: "cream_eclairs.jpeg", alt: "Cream-filled Eclairs" },
  { file: "cream_fettuccine.jpeg", alt: "Creamy Fettuccine" },
  { file: "cream_cheesecake.jpeg", alt: "Classic Cheesecake" },
  { file: "cream_pot_pie.jpeg", alt: "Cream Pot Pie" },
  { file: "cream_panna_cotta.jpeg", alt: "Vanilla Panna Cotta" },
  { file: "cream_carbonara.jpeg", alt: "Creamy Carbonara" }
];

// Array of 24 elements for a seamless looping marquee
const images = Array.from({ length: 24 });



// Floating orb component for reuse
function FloatingOrb({ style, duration = 6, delay = 0, yRange = 20 }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={style}
      animate={{ y: [0, -yRange, 0], scale: [1, 1.05, 1] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen bg-bgLight overflow-hidden flex flex-col items-center justify-center pt-32 pb-32">
      {/* Animated Gradient Movie Background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(-45deg, rgba(27,68,129,0.05), rgba(27,68,129,0.15), rgba(27,68,129,0.1), rgba(27,68,129,0.05))",
          backgroundSize: "400% 400%"
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
        }}
        transition={{
          duration: 15,
          ease: "easeInOut",
          repeat: Infinity
        }}
      />

      {/* Top Violet Gradient for Navbar Blur */}
      <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-primary/30 to-transparent pointer-events-none" />

      {/* Floating Orbs - Background Blobs */}
      <FloatingOrb
        style={{
          width: 500, height: 500,
          top: "-10%", left: "-10%",
          background: "radial-gradient(circle, rgba(27,68,129,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        duration={8} delay={0} yRange={25}
      />
      <FloatingOrb
        style={{
          width: 400, height: 400,
          bottom: "5%", right: "-8%",
          background: "radial-gradient(circle, rgba(27,68,129,0.15) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        duration={10} delay={2} yRange={18}
      />
      <FloatingOrb
        style={{
          width: 280, height: 280,
          top: "40%", left: "60%",
          background: "radial-gradient(circle, rgba(27,68,129,0.12) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
        duration={7} delay={1} yRange={15}
      />
      <FloatingOrb
        style={{
          width: 200, height: 200,
          top: "20%", right: "15%",
          background: "radial-gradient(circle, rgba(27,68,129,0.1) 0%, transparent 70%)",
          filter: "blur(25px)",
        }}
        duration={9} delay={3} yRange={12}
      />

      {/* Animated SVG Wave Lines - Desktop */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-50 hidden md:block"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 800"
      >
        <motion.path
          d="M0 200 C300 0, 1140 400, 1440 200"
          stroke="#244a81ff"
          strokeWidth="2"
          fill="none"
          animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 4.5, delay: 0.5, times: [0, 0.8, 1], ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
        />
        <motion.path
          d="M0 400 C400 100, 1040 700, 1440 400"
          stroke="#244a81ff"
          strokeWidth="2"
          fill="none"
          animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 5, delay: 2, times: [0, 0.8, 1], ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
        />
        <motion.path
          d="M0 600 C500 300, 940 900, 1440 600"
          stroke="#244a81ff"
          strokeWidth="2"
          fill="none"
          animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 5.5, delay: 3.5, times: [0, 0.8, 1], ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
        />
      </svg>

      {/* Animated SVG Wave Lines - Mobile */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-50 block md:hidden"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 400 800"
      >
        <motion.path
          d="M0 150 C100 100, 300 250, 400 200"
          stroke="#244a81ff"
          strokeWidth="2"
          fill="none"
          animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 5, delay: 0.5, times: [0, 0.8, 1], ease: "easeInOut", repeat: Infinity, repeatDelay: 4 }}
        />
        <motion.path
          d="M0 400 C150 300, 250 500, 400 450"
          stroke="#244a81ff"
          strokeWidth="2"
          fill="none"
          animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 5.5, delay: 2.5, times: [0, 0.8, 1], ease: "easeInOut", repeat: Infinity, repeatDelay: 4 }}
        />
        <motion.path
          d="M0 650 C100 550, 300 750, 400 700"
          stroke="#244a81ff"
          strokeWidth="2"
          fill="none"
          animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 6, delay: 4.5, times: [0, 0.8, 1], ease: "easeInOut", repeat: Infinity, repeatDelay: 4 }}
        />
      </svg>

      {/* Hero Content */}
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
            Premium Cafe . Feel the taste
          </motion.span>

          <motion.h1
            className="font-[900] uppercase leading-[1] mb-6"
            style={{ fontSize: "clamp(48px, 8vw, 100px)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ShinyText
              text="SWEETENING EVERY MOMENT !"
              color="#244a81ff"
              shineColor="#E5E3DB"
              speed={3}
              delay={1}
              spread={120}
              direction="left"
              yoyo={false}
              pauseOnHover={false}
            />
          </motion.h1>

          <motion.p
            className="text-[#555555] font-[500] text-[20px] max-w-2xl mx-auto mb-5 italic leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            "Handcrafted with pure milk and served with a heart full of love,
            <br />
            making every sweet moment a memory to cherish forever."
          </motion.p>

          <motion.p
            className="text-primary font-[600] tracking-wide text-xs mb-10 uppercase"
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
      <div className="absolute bottom-0 left-0 w-full overflow-hidden translate-y-12 md:translate-y-24">
        <div className="flex w-[200%] animate-scroll-left gap-6 pb-0">
          {images.map((item, idx) => (
            <div key={idx} className="w-[180px] h-[220px] md:w-[260px] md:h-[300px] bg-borderLight rounded-2xl flex-shrink-0 flex items-end justify-center pb-4 relative overflow-hidden group border border-borderLight/50">
              <Image src={`/images/${heroImages[idx % 8].file}`} alt={heroImages[idx % 8].alt} fill className="object-cover opacity-60 mix-blend-multiply" />
              <div className="absolute inset-0 z-10 hover:bg-white/10 transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
