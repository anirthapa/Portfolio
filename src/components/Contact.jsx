import React from 'react';

const Contact = () => {
  return (
    <section className="section" id="contact" style={{ minHeight: '80vh', borderTop: '1px solid var(--border)', marginTop: '8rem' }}>
      <div className="section-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

        <p style={{ textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--text-secondary)', marginBottom: '2rem' }} className="fade-up">
          What's Next
        </p>

        <a href="mailto:anir234thapa@gmail.com" className="huge-btn fade-up" style={{ textAlign: 'center' }}>
          LET'S BUILD<br /><span className="text-gradient">TOGETHER.</span>
        </a>

        <div style={{ marginTop: '5rem', display: 'flex', gap: '3rem', color: 'var(--text-secondary)' }} className="fade-up">
          <a href="https://github.com/Aneer-Thapa1" style={{ transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>GITHUB</a>
          <a href="https://www.linkedin.com/in/anir-jung-thapa-270a922bb/" style={{ transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>LINKEDIN</a>
          <a href="https://www.instagram.com/aneer.codes/" style={{ transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>INSTAGRAM</a>
        </div>

      </div>
    </section>
  );
};

export default Contact;
