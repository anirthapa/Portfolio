import React from 'react';
import './Contact.css';

const socials = [
  { label: 'GitHub', href: 'https://github.com/Aneer-Thapa1' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/anir-jung-thapa-270a922bb/' },
  { label: 'Instagram', href: 'https://www.instagram.com/aneer.codes/' },
];

const Contact = () => {
  return (
    <section className="section contact-section" id="contact">
      <div className="contact-marquee" aria-hidden="true">
        <div>LET’S BUILD — LET’S BUILD — LET’S BUILD — LET’S BUILD —</div>
      </div>

      <div className="section-container contact-container">
        <p className="contact-kicker fade-up">Have a project in mind?</p>

        <a
          href="mailto:anir234thapa@gmail.com"
          className="contact-main-link fade-up"
          data-magnetic
          data-cursor-label="Email"
        >
          <span>LET’S BUILD</span>
          <span className="text-gradient">TOGETHER.</span>
          <span className="contact-main-arrow" aria-hidden="true">↗</span>
        </a>

        <div className="contact-footer fade-up">
          <p>Open to collaborations, freelance work, and interesting conversations.</p>
          <nav className="contact-socials" aria-label="Social links">
            {socials.map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" data-magnetic>
                {label}<span aria-hidden="true">↗</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Contact;
