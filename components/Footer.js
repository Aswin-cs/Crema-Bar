import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer id="contact" className="bg-primary text-white pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          <div>
            <div className="mb-2 flex items-center gap-3">
              <img src="/images/logo.svg" alt="Logo" className="w-12 h-12 object-contain" />
              <span className="font-[800] text-2xl font-montserrat tracking-wider">CREMA BAR</span>
            </div>
            <p className="text-white/80 font-[400]">Pure. Fresh. Delicious.</p>
          </div>

          <div>
            <h4 className="font-[800] mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "About", "Menu", "Gallery", "Contact"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="font-[500] hover:underline transition-all">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-[800] mb-6 uppercase tracking-wider text-sm">Connect With Us</h4>
            <div className="font-[400] text-sm mb-6 text-white/95 flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <span>Beach Road, Kerala</span>
              <span className="text-white/30 hidden sm:inline">|</span>
              <a
                href="tel:000000000"
                className="font-sans font-[700] tracking-wider hover:underline text-white transition-colors"
              >
                000000000
              </a>
            </div>
            <a href="https://www.instagram.com/dev_noir_" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-primary px-6 py-2.5 rounded-full font-[800] text-sm hover:scale-105 transition-transform shadow-lg mb-6">
              Follow on Instagram
            </a>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/dev_noir_"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-transparent hover:text-white hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888]"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-transparent hover:text-white hover:bg-[#25D366]"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/20 pt-8 text-center text-sm space-y-2">
          <p className="font-[400] text-white/70">&copy; {new Date().getFullYear()} CREMA BAR. All rights reserved.</p>
          <p className="font-[400] text-white/40 text-xs max-w-md mx-auto">
            Disclaimer: This is a demo website created for showcase purposes only. The contents, images, and logos are fictional and used for demonstration.
          </p>
        </div>
      </div>
    </footer>
  );
}
