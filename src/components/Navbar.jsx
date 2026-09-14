import React, { useEffect, useState } from 'react';

const links = [
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Work' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    let frame = 0;

    const updateNavigation = () => {
      frame = 0;
      setIsScrolled(window.scrollY > 50);

      const marker = window.scrollY + window.innerHeight * 0.45;
      const sections = ['hero', ...links.map(({ id }) => id)];
      const current = sections.reduce((active, id) => {
        const section = document.getElementById(id);
        return section && section.offsetTop <= marker ? id : active;
      }, 'hero');
      setActiveSection(current);
    };

    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateNavigation);
    };

    updateNavigation();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToSection = (event, targetId) => {
    event.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`site-nav ${isScrolled ? 'is-scrolled' : ''}`} aria-label="Primary navigation">
      <div className="nav-container site-nav-inner">
        <a
          className="site-logo"
          href="#hero"
          onClick={(event) => scrollToSection(event, 'hero')}
          data-magnetic
        >
          ANIR.
        </a>
        <div className="nav-links">
          {links.map(({ id, label }) => (
            <a
              key={id}
              className={`nav-link ${activeSection === id ? 'is-active' : ''}`}
              href={`#${id}`}
              onClick={(event) => scrollToSection(event, id)}
              data-magnetic
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
