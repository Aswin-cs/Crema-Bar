export default function Footer() {
  return (
    <footer id="contact" className="bg-primary text-white pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div>
            <div className="mb-2 flex items-center gap-3">
              <img src="/images/logo image.jpeg" alt="Zaithoon's Custard Logo" className="w-10 h-10 rounded-full bg-white p-1" />
              <span className="font-[800] text-2xl italic">Zaithoon's Custard</span>
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
            <p className="font-[400] text-sm mb-1">Zaithoon's Custard, Thrissur, Kerala</p>
            <p className="font-[400] text-sm mb-6">+91 98765 43210</p>
            <a href="https://www.instagram.com/zaithoons_custard_official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-primary px-6 py-2.5 rounded-full font-[800] text-sm hover:scale-105 transition-transform shadow-lg mb-6">
              Follow on Instagram
            </a>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/zaithoons_custard_official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-primary transition-colors font-[600] text-xs">
                Ig
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-primary transition-colors font-[600] text-xs">
                Fb
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-primary transition-colors font-[600] text-xs">
                Wa
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/20 pt-8 text-center text-sm">
          <p className="font-[400] text-white/70">&copy; {new Date().getFullYear()} Zaithoon's Custard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
