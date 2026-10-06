'use client';

import { HelmetProvider } from 'react-helmet-async';
import App from '../src/App';

export default function LegacyPortfolio() {
  return (
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
}
