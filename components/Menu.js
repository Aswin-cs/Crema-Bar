"use client";
import { motion } from "framer-motion";

const menuItems = [
  { name: "White Chocolate Cake", desc: "Delicate and glazed to perfection", price: "₹150", oldPrice: "₹180", image: "cream_white_chocolate_cake.jpeg" },
  { name: "Layered Tiramisu", desc: "Classic Italian dessert in a glass", price: "₹120", oldPrice: "₹150", image: "cream_tiramisu.jpeg" },
  { name: "Cream-filled Eclairs", desc: "Delicate pastries on a platter", price: "₹100", oldPrice: "₹130", image: "cream_eclairs.jpeg" },
  { name: "Creamy Fettuccine", desc: "Rich and creamy pasta", price: "₹250", oldPrice: "₹300", image: "cream_fettuccine.jpeg" },
  { name: "Classic Cheesecake", desc: "Ultra-creamy New York style", price: "₹180", oldPrice: "₹220", image: "cream_cheesecake.jpeg" },
  { name: "Cream Pot Pie", desc: "Velvety vegetable pot pie", price: "₹200", oldPrice: "₹240", image: "cream_pot_pie.jpeg" },
  { name: "Vanilla Panna Cotta", desc: "Exquisite and topped with shavings", price: "₹140", oldPrice: "₹170", image: "cream_panna_cotta.jpeg" },
  { name: "Creamy Carbonara", desc: "Rigatoni with egg and rich sauce", price: "₹280", oldPrice: "₹320", image: "cream_carbonara.jpeg" },
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
          <p className="font-[500] text-lg text-[#555555] max-w-xl mx-auto italic leading-relaxed">
            "A delicious curation of our finest recipes, slow-churned daily
            <br />
            to bring a smile to your face and warmth to your heart."
          </p>
        </motion.div>

        <div className="flex flex-col md:grid md:grid-cols-4 gap-6 relative">
          {menuItems.map((item, idx) => (
            <motion.div 
              key={idx}
              className="bg-white rounded-[2rem] overflow-hidden cursor-pointer flex flex-col h-full group sticky md:static shadow-xl md:shadow-none border border-borderLight md:border-none"
              style={{ top: `calc(100px + ${idx * 15}px)` }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ 
                y: -12,
                boxShadow: "0 25px 50px -12px rgba(27, 68, 129, 0.25), 0 8px 20px -8px rgba(27, 68, 129, 0.15)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="w-full aspect-[4/3] relative overflow-hidden">
                <img src={`/images/${item.image}`} alt={item.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
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
