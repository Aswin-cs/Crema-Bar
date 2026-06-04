import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Showcase from "@/components/Showcase";
import About from "@/components/About";
import Menu from "@/components/Menu";
import Inside from "@/components/Inside";
import Gallery from "@/components/Gallery";
import Location from "@/components/Location";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <SplashScreen />
      <Navbar />
      <Hero />
      <About />
      <Showcase />
      <Menu />
      <Inside />
      <Gallery />
      <Location />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
