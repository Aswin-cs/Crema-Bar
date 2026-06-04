"use client";
import { motion } from "framer-motion";

export default function Location() {
  return (
    <section id="location" className="pt-16 pb-8 md:pt-24 md:pb-24 bg-white text-textDark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          
          <motion.div 
            className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="font-[700] text-[36px] text-primary mb-6 md:mb-8 uppercase tracking-wider">
              CONTACT US
            </h2>
            
            <div className="space-y-6 mb-10 text-[16px] font-[500] text-textDark w-full">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="text-primary">📍</span>
                <p>Zaithoon's Custard, Thrissur, Kerala</p>
              </div>
              
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="text-primary">📞</span>
                <p>+91 98765 43210</p>
              </div>
              
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="text-primary">🕒</span>
                <p>Open Daily · 10:00 AM – 10:00 PM</p>
              </div>
            </div>

            <a 
              href="https://wa.me/919876543210" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-[700] hover:bg-opacity-90 transition-colors w-max"
            >
              Chat on WhatsApp
            </a>
          </motion.div>

          <motion.div 
            className="flex-1 w-full h-[250px] md:h-auto md:min-h-[400px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3735.765550339465!2d76.62937467934567!3d10.773600400000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba86d00595861bb%3A0xfa86cc2e1249fc82!2sZaithoon&#39;s%20Custard!5e1!3m2!1sen!2sin!4v1780584599130!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl border border-borderLight"
            ></iframe>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
