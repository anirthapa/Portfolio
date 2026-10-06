import './globals.css';

export const metadata = {
  metadataBase: new URL('https://anirjungthapa.com.np'),
  title: 'Anir Jung Thapa — Developer & Digital Maker',
  description: 'Anir Jung Thapa builds thoughtful digital experiences, from full stack products to playful web experiments. Explore selected work and get in touch.',
  openGraph: {
    title: 'Anir Jung Thapa — Developer & Digital Maker',
    description: 'Thoughtful digital experiences, built in Nepal for everywhere.',
    url: 'https://anirjungthapa.com.np',
    siteName: 'Anir Jung Thapa',
    type: 'website',
  },
  twitter: { card: 'summary' },
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
