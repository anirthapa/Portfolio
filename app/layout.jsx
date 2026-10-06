import '../src/index.css';
import { Inter, Montserrat } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat', display: 'swap' });

export const metadata = {
  metadataBase: new URL('https://anirjungthapa.com.np'),
  title: 'Anir Jung Thapa — Exceptional Digital Experiences',
  description: 'Portfolio of Anir Jung Thapa, a full stack developer building interactive digital experiences.',
  openGraph: {
    title: 'Anir Jung Thapa — Exceptional Digital Experiences',
    description: 'Full stack development and interactive digital experiences by Anir Jung Thapa.',
    url: 'https://anirjungthapa.com.np',
    siteName: 'Anir Jung Thapa',
    type: 'website',
  },
  twitter: { card: 'summary' },
  icons: { icon: '/favicon.png' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
