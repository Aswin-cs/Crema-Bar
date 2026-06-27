"use client";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

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
                <p>Beach Road, Kerala</p>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="text-primary">📞</span>
                <a
                  href="tel:000000000"
                  className="font-sans font-[700] tracking-wider hover:text-primary transition-colors hover:underline"
                >
                  000000000
                </a>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="text-primary">🕒</span>
                <p>Open Daily · 10:00 AM – 10:00 PM</p>
              </div>
            </div>

            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-[700] hover:bg-[#25D366] transition-colors w-max"
            >
              <FaWhatsapp className="w-5 h-5" />
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
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15717.399580235332!2d76.216667!3d9.966667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1719478830123!5m2!1sen!2sin"
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
