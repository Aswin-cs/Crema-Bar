"use client";
import { motion } from "framer-motion";

export default function Inside() {
  const ingredients = [
    { icon: "🥛", label: "Pure Milk" },
    { icon: "🍌", label: "Fresh Banana" },
    { icon: "🥜", label: "Roasted Nuts" },
    { icon: "🍓", label: "Seasonal Fruits" },
  ];

  return (
    <section id="story" className="py-24 bg-white text-textDark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          
          <motion.div 
            className="flex-1 space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <span className="font-[700] text-primary uppercase tracking-widest text-sm inline-block">
              What's Inside?
            </span>
            <h2 className="font-[900] text-[36px] leading-tight text-textDark uppercase tracking-wider">
              PURE INGREDIENTS, EVERY CUP
            </h2>
            <p className="font-[400] text-[#555555] text-lg leading-relaxed mb-6">
              Our custard is a blend of mashed banana, rice flakes, whole milk, and roasted peanuts — topped with seasonal fruits and pista ice cream.
            </p>
            
            <div className="flex flex-col items-start gap-3">
              {ingredients.map((item, idx) => (
                <div key={idx} className="bg-bgLight text-primary font-[600] border border-borderDark px-4 py-2 rounded-full inline-flex items-center gap-2">
                  <span>{item.icon}</span> {item.label}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="flex-1 w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="relative w-full max-w-md aspect-square mx-auto md:ml-auto">
              {/* Border Wrapper */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden p-[2.5px] bg-borderLight/50 z-10 shadow-lg">
                {/* Moving border flow */}
                <div className="absolute inset-0 w-[200%] h-[200%] top-[-50%] left-[-50%] pointer-events-none">
                  <motion.div
                    className="w-full h-full"
                    style={{
                      background: "conic-gradient(from 0deg, transparent 30%, #244a81ff 50%, transparent 70%, transparent 90%, #234d88ff 100%)",
                      transformOrigin: "center center"
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                  />
                </div>

                {/* Inner content container */}
                <div className="relative w-full h-full bg-bgLight rounded-[14px] overflow-hidden flex items-center justify-center">
                  <img 
                    src="/images/sample_dessert.jpeg" 
                    alt="Dish Photo" 
                    className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-multiply transition-transform duration-700 hover:scale-105" 
                  />
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
