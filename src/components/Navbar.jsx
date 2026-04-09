import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: isScrolled ? '1rem 0' : '2rem 0',
      background: isScrolled ? 'rgba(5, 5, 5, 0.8)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(10px)' : 'none',
      borderBottom: isScrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'all 0.4s ease'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="#hero" onClick={(e) => scrollToSection(e, 'hero')} style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '2px', color: '#fff' }}>
          ANIR.
        </a>
        <div style={{ display: 'flex', gap: '3rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 500 }}>
          <a href="#skills" onClick={(e) => scrollToSection(e, 'skills')} style={{ color: 'var(--text-secondary)' }}>Skills</a>
          <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} style={{ color: 'var(--text-secondary)' }}>Experience</a>
          <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} style={{ color: 'var(--text-secondary)' }}>Work</a>
          <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} style={{ color: '#fff' }}>Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
