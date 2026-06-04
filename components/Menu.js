"use client";
import { motion } from "framer-motion";

const menuItems = [
  { name: "Classic Custard", desc: "Creamy vanilla with fresh fruits", price: "₹60", oldPrice: "₹80" },
  { name: "Pista Special", desc: "Pista ice cream on rich custard", price: "₹80", oldPrice: "₹100" },
  { name: "Fruit Custard", desc: "Loaded with seasonal fruits", price: "₹70", oldPrice: "₹90" },
  { name: "Dry Fruit Delight", desc: "Premium nuts and dry fruits", price: "₹90", oldPrice: "₹120" },
  { name: "Chocolate Custard", desc: "Choco drizzle with crunch", price: "₹75", oldPrice: "₹95" },
  { name: "Royal Special", desc: "Our signature full bowl", price: "₹120", oldPrice: "₹150" },
  { name: "Mango Custard", desc: "Fresh mango creamy base", price: "₹70", oldPrice: "₹90" },
  { name: "Choco Nut", desc: "Chocolate with assorted nuts", price: "₹85", oldPrice: "₹110" },
];

export default function Menu() {
  return (
    <section id="menu" className="py-24 bg-bgLight">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="font-[900] text-4xl md:text-5xl text-primary uppercase tracking-wider mb-3">OUR SPECIALS</h2>
          <p className="font-[400] text-[#555555]">Freshly made with love, every single day</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {menuItems.map((item, idx) => (
            <motion.div 
              key={idx}
              className="bg-white rounded-[2rem] overflow-hidden transition-transform duration-300 hover:-translate-y-2 cursor-pointer flex flex-col h-full group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="w-full aspect-[4/3] relative overflow-hidden">
                <img src={`/images/custard${idx + 1}.jpeg`} alt={item.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-[800] text-primary text-[20px] leading-tight mb-2">{item.name}</h3>
                <p className="font-[500] text-[#666666] text-[14px] line-clamp-2 mb-5">{item.desc}</p>
                <div className="mt-auto flex items-center gap-3">
                  <span className="font-[800] text-textDark text-[18px]">
                    {item.price}
                  </span>
                  <span className="font-[600] text-[#aaaaaa] text-[14px] line-through">
                    {item.oldPrice}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
