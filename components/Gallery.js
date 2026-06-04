"use client";
import { motion } from "framer-motion";
import Masonry from "./Masonry";

export default function Gallery() {
  const galleryMedia = [
    { id: "1", type: 'video', img: '/images/happiness1.mp4', height: 400 },
    { id: "2", type: 'video', img: '/videos/video1.mp4', height: 250 },
    { id: "3", type: 'image', img: '/images/custard11.jpeg', height: 600 },
    { id: "4", type: 'video', img: '/videos/video2.mp4', height: 450 },
    { id: "5", type: 'video', img: '/videos/video3.mp4', height: 350 },
    { id: "6", type: 'image', img: '/images/custard12.jpeg', height: 400 },
    { id: "7", type: 'video', img: '/videos/video4.mp4', height: 500 },
    { id: "8", type: 'video', img: '/videos/video5.mp4', height: 300 },
    { id: "9", type: 'video', img: '/videos/video6.mp4', height: 400 },
  ];

  return (
    <section id="gallery" className="py-24 bg-bgLight">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="font-[900] text-4xl md:text-5xl text-primary uppercase tracking-wider">OUR SWEET MEMORIES!</h2>
        </motion.div>

        <div className="w-full relative" style={{ minHeight: '600px' }}>
          <Masonry
            items={galleryMedia}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover
            hoverScale={0.95}
            blurToFocus
            colorShiftOnHover={false}
          />
        </div>
        
      </div>
    </section>
  );
}
