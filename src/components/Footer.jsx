import React from 'react';

const Footer = () => {
  return (
    <footer style={{ padding: '2rem 0', textAlign: 'center', borderTop: '1px solid var(--border)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
      © {new Date().getFullYear()} Anir Jung Thapa. Optimized for Performance & Design.
    </footer>
  );
};

export default Footer;
