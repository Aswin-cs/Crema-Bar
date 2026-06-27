"use client";
import { motion } from "framer-motion";

export default function About() {
  const tags = ["100% Pure Milk", "Fresh Daily", "Premium Nuts"];

  return (
    <section id="about" className="py-24 bg-white text-textDark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          
          <motion.div 
            className="flex-1 w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="aspect-square w-full max-w-md mx-auto md:mx-0 p-[3px] rounded-3xl relative overflow-hidden bg-borderLight/30 flex items-center justify-center">
              {/* Rotating conic-gradient border track strictly using theme colors */}
              <div className="absolute inset-[-1000%] animate-border-flow bg-[conic-gradient(from_0deg,#244a81ff_0%,#234d88ff_25%,#E5E3DB_50%,#234d88ff_75%,#244a81ff_100%)]" />
              
              {/* Inner container displaying the blended child photo */}
              <div className="relative w-full h-full bg-bgLight rounded-[21px] overflow-hidden flex items-center justify-center">
                <img src="/images/cafe_showcase.jpeg" alt="Shop Photo" className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="flex-1 space-y-6 text-center md:text-left flex flex-col items-center md:items-start"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <span className="font-[700] text-primary uppercase tracking-widest text-sm block mb-1">
              About Us
            </span>
            <div className="relative inline-block mb-4 max-w-full">
              <h2 className="font-[800] text-4xl md:text-[40px] leading-tight text-primary font-montserrat tracking-wider relative z-10">
                CREMA BAR
              </h2>
              <svg className="absolute w-full h-4 md:h-5 -bottom-1 md:-bottom-2 left-0 text-[#ff6b6b] z-0" viewBox="0 0 100 10" preserveAspectRatio="none">
                <motion.path 
                  d="M0,5 Q5,0 10,5 T20,5 T30,5 T40,5 T50,5 T60,5 T70,5 T80,5 T90,5 T100,5" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
                  viewport={{ once: true }}
                />
              </svg>
            </div>
            <p className="font-[400] text-[#555555] text-lg leading-relaxed">
              Your favorite dessert destination. Every cup is freshly prepared with 100% pure milk, vibrant seasonal fruits, and premium nuts, all crowned with a generous scoop of pista ice cream. Crafted with love, served with absolute hygiene, and dedicated to bringing you the smoothest, most indulgent flavors in town.
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-4 w-full">
              {tags.map((tag, idx) => (
                <div key={idx} className="bg-bgLight text-primary font-[600] border border-borderDark px-4 py-2 rounded-full text-sm">
                  {tag}
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
