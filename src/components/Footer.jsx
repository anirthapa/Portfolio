import React from 'react';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner section-container">
        <span>© {new Date().getFullYear()} Anir Jung Thapa</span>
        <span>Designed & built with intention.</span>
      </div>
    </footer>
  );
};

export default Footer;
