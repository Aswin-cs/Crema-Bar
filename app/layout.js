import { Raleway, Montserrat } from 'next/font/google';
import "./globals.css";
import CustomCursor from '../components/CustomCursor';

const raleway = Raleway({ 
  subsets: ['latin'], 
  weight: ['300','400','500','600','700','800','900'],
  variable: '--font-raleway'
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat'
});

export const metadata = {
  title: "CREMA BAR - Premium Cafe",
  description: "Delicious desserts, cakes, pastas and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} ${montserrat.variable} font-raleway`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
