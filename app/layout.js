import { Raleway } from 'next/font/google';
import "./globals.css";
import CustomCursor from '../components/CustomCursor';

const raleway = Raleway({ 
  subsets: ['latin'], 
  weight: ['300','400','500','600','700','800','900'],
  variable: '--font-raleway'
});

export const metadata = {
  title: "Zaithoon's Custard - Premium Custard in Thrissur",
  description: "Pure milk custard, fresh fruits, premium nuts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} font-raleway`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
