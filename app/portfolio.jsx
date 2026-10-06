'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';

const EMAIL = 'anir234thapa@gmail.com';
const GITHUB = 'https://github.com/anirthapa';

const projects = [
  {
    name: 'Multiplayer Ludo',
    kind: 'Interactive',
    year: '2026',
    description: 'A real-time take on the classic board game, built to play together online.',
    stack: ['TypeScript', 'Multiplayer', 'Game UI'],
    live: 'https://multiplayer-ludo-lyart.vercel.app/',
    code: 'https://github.com/anirthapa/multiplayer-ludo',
    art: 'ludo',
  },
  {
    name: 'Los Santos Wire',
    kind: 'Websites',
    year: '2026',
    description: 'An editorial-style destination for GTA Online news and updates.',
    stack: ['TypeScript', 'Editorial', 'Web'],
    live: 'https://los-santos-wire.vercel.app/',
    code: 'https://github.com/anirthapa/GTA-ONLINE-UPDATE',
    art: 'wire',
  },
  {
    name: 'Resume Builder',
    kind: 'Products',
    year: '2026',
    description: 'A focused tool for creating a polished resume with less friction.',
    stack: ['JavaScript', 'Product', 'Utility'],
    live: 'https://resume-builder-bay-theta.vercel.app/',
    code: 'https://github.com/anirthapa/Resume-Builder',
    image: '/photos/resume_forge.webp',
    width: 1904,
    height: 948,
    art: 'resume',
  },
  {
    name: 'Baha Connect',
    kind: 'Products',
    year: '2025',
    description: 'A community and home management experience made for people across Nepal.',
    stack: ['Next.js', 'Community', 'Full stack'],
    live: 'https://ourbaha.com/',
    image: '/photos/baha_connect.webp',
    width: 1920,
    height: 945,
    art: 'baha',
  },
  {
    name: 'Hostel Ease',
    kind: 'Products',
    year: '2025',
    description: 'Room discovery and day-to-day hostel management in one practical system.',
    stack: ['JavaScript', 'Management', 'Full stack'],
    code: 'https://github.com/anirthapa/Hostle-Management-System',
    image: '/photos/hostel_ease.webp',
    width: 1095,
    height: 715,
    art: 'hostel',
  },
  {
    name: 'Habit Pulse',
    kind: 'Interactive',
    year: '2025',
    description: 'A habit tracker designed to make daily progress easy to see and keep.',
    stack: ['JavaScript', 'Mobile', 'Wellness'],
    code: 'https://github.com/anirthapa/Habit-Pulse',
    image: '/photos/habit_pulse.webp',
    width: 1354,
    height: 675,
    art: 'habit',
  },
];

const filters = ['All work', 'Products', 'Websites', 'Interactive'];

const quickLinks = [
  { label: 'Go to work', hint: '#work', href: '#work' },
  { label: 'Go to about', hint: '#about', href: '#about' },
  { label: 'Go to contact', hint: '#contact', href: '#contact' },
  { label: 'GitHub profile', hint: 'External link', href: GITHUB },
  { label: 'Email Anir', hint: EMAIL, href: `mailto:${EMAIL}` },
];

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>;
}

function ProjectArt({ project }) {
  return (
    <div className={`project-art art-${project.art}`}>
      {project.image ? (
        <Image src={project.image} alt={`${project.name} preview`} width={project.width} height={project.height} sizes="(max-width: 700px) 100vw, 50vw" loading="lazy" />
      ) : project.art === 'ludo' ? (
        <div className="ludo-board" aria-hidden="true">
          <span className="ludo-mark red">●</span><span className="ludo-mark yellow">●</span>
          <span className="ludo-center">PLAY<br />TOGETHER</span>
          <span className="ludo-mark blue">●</span><span className="ludo-mark green">●</span>
        </div>
      ) : (
        <div className="wire-cover" aria-hidden="true">
          <span>THE WIRE / LOS SANTOS</span>
          <strong>THE CITY<br />NEVER<br />LOGS OFF.</strong>
          <span>NEWS · CULTURE · ONLINE</span>
        </div>
      )}
      <span className="art-index" aria-hidden="true">A / {String(projects.indexOf(project) + 1).padStart(2, '0')}</span>
    </div>
  );
}

export default function Portfolio() {
  const [filter, setFilter] = useState('All work');
  const [theme, setTheme] = useState('light');
  const [menuOpen, setMenuOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [clock, setClock] = useState('');
  const commandInput = useRef(null);
  const visibleProjects = useMemo(() => filter === 'All work' ? projects : projects.filter((project) => project.kind === filter), [filter]);
  const visibleCommands = quickLinks.filter(({ label, hint }) => `${label} ${hint}`.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('portfolio-theme');
    const themeFrame = window.requestAnimationFrame(() => {
      if (savedTheme === 'dark') setTheme('dark');
    });
    const updateClock = () => setClock(new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kathmandu', hour: '2-digit', minute: '2-digit', hour12: false,
    }).format(new Date()));
    updateClock();
    const clockId = window.setInterval(updateClock, 60000);
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty('--scroll-progress', max > 0 ? `${window.scrollY / max * 100}%` : '0%');
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.clearInterval(clockId);
      window.cancelAnimationFrame(themeFrame);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setCommandOpen((open) => !open);
      }
      if (event.key === 'Escape') {
        setCommandOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (commandOpen) commandInput.current?.focus();
    else {
      const frame = window.requestAnimationFrame(() => setQuery(''));
      return () => window.cancelAnimationFrame(frame);
    }
  }, [commandOpen]);

  const closeNavigation = () => setMenuOpen(false);

  const openQuickLink = (href) => {
    setCommandOpen(false);
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    } else if (href.startsWith('mailto:')) {
      window.location.href = href;
    } else {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <>
      <div className="scroll-bar" aria-hidden="true" />
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="header-inner wrap">
          <a className="brand" href="#top" onClick={closeNavigation} aria-label="Anir Jung Thapa, back to top">anir<span className="brand-dot">.</span></a>
          <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
            <a href="#work" onClick={closeNavigation}>Work <span>01</span></a>
            <a href="#about" onClick={closeNavigation}>About <span>02</span></a>
            <a href="#contact" onClick={closeNavigation}>Contact <span>03</span></a>
          </nav>
          <div className="header-actions">
            <button className="icon-button command-button" type="button" onClick={() => setCommandOpen(true)} aria-label="Open quick navigation" title="Quick navigation (Ctrl+K)">⌘ <small>K</small></button>
            <button className="icon-button theme-button" type="button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`} title="Toggle theme">{theme === 'light' ? '◐' : '☼'}</button>
            <button className="icon-button menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? '×' : '☰'}</button>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero wrap" id="top" aria-labelledby="hero-title">
          <div className="hero-topline"><span><i className="status-dot" /> Available for the right project</span><span>Based in Nepal · {clock || 'NPT'}</span></div>
          <div className="hero-content">
            <p className="eyebrow">DEVELOPER / DESIGN MINDED / CURIOUS BY DEFAULT</p>
            <h1 id="hero-title"><span>Building digital</span>{' '}<span><em>things</em> that feel</span>{' '}<span>different<span className="hero-period">.</span></span></h1>
            <div className="hero-bottom">
              <p>Hi, I&apos;m <strong>Anir Jung Thapa</strong>. I turn ideas into expressive, useful products on the web.</p>
              <a className="round-link" href="#work" aria-label="Explore selected work"><Arrow /></a>
            </div>
          </div>
          <div className="hero-footer"><span>SCROLL TO EXPLORE ↓</span><span>01 / 04</span></div>
          <div className="hero-orbit" aria-hidden="true"><span className="orbit-core">AJT<br />✳</span></div>
        </section>

        <section className="section work-section" id="work" aria-labelledby="work-heading">
          <div className="wrap">
            <div className="section-topline"><span>01 / SELECTED WORK</span><span>2025 — 2026</span></div>
            <div className="section-heading-row"><h2 id="work-heading">Proof is in<br /><em>the projects.</em></h2><p>A collection of things I&apos;ve made, from useful products to playful experiments.</p></div>
            <div className="work-controls" aria-label="Filter projects">
              {filters.map((item) => <button type="button" key={item} className={`filter-pill ${filter === item ? 'active' : ''}`} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}<span>{item === 'All work' ? projects.length : projects.filter((project) => project.kind === item).length}</span></button>)}
            </div>
            <div className="project-grid" aria-live="polite">
              {visibleProjects.map((project) => (
                <article className="project-card" key={project.name}>
                  <a className="project-preview" href={project.live || project.code} target="_blank" rel="noopener noreferrer" aria-label={`${project.live ? 'Visit' : 'View code for'} ${project.name}`}><ProjectArt project={project} /><span className="preview-arrow" aria-hidden="true">↗</span></a>
                  <div className="project-card-heading"><div><span className="project-type">{project.kind} / {project.year}</span><h3>{project.name}</h3></div><span className="project-number">{String(projects.indexOf(project) + 1).padStart(2, '0')}</span></div>
                  <p>{project.description}</p>
                  <div className="project-tags">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                  <div className="project-links">{project.live && <a href={project.live} target="_blank" rel="noopener noreferrer">Live site <Arrow diagonal /></a>}{project.code && <a href={project.code} target="_blank" rel="noopener noreferrer">Source code <Arrow diagonal /></a>}</div>
                </article>
              ))}
            </div>
            <a className="all-github" href={GITHUB} target="_blank" rel="noopener noreferrer">More experiments on GitHub <Arrow diagonal /></a>
          </div>
        </section>

        <section className="section about-section" id="about" aria-labelledby="about-heading">
          <div className="wrap">
            <div className="section-topline"><span>02 / THE PERSON BEHIND THE PIXELS</span><span>NEPAL ↗ EVERYWHERE</span></div>
            <div className="about-grid">
              <div><p className="eyebrow">A LITTLE ABOUT ME</p><h2 id="about-heading">I like the space<br />where <em>ideas</em><br />meet code.</h2></div>
              <div className="about-copy"><p>I&apos;m a full stack developer who cares about how a product works <em>and</em> how it feels. I enjoy taking a rough idea and shaping it into something clear, fast, and memorable.</p><p>My work spans interfaces, APIs, and the details between them. I&apos;m currently building at Detech Solution and always exploring what&apos;s next.</p><div className="capabilities"><span>01 / Frontend craft</span><span>02 / Full stack products</span><span>03 / Creative interaction</span></div><a className="text-link" href="/Anir-Jung-Thapa-CV.pdf" target="_blank" rel="noopener noreferrer">View my résumé <Arrow diagonal /></a></div>
            </div>
            <div className="tool-strip"><span>TOOLS I REACH FOR</span><div>React <i>✳</i> Next.js <i>✳</i> TypeScript <i>✳</i> Node.js <i>✳</i> CSS <i>✳</i> Databases</div></div>
          </div>
        </section>

        <section className="section contact-section" id="contact" aria-labelledby="contact-heading">
          <div className="wrap"><div className="section-topline"><span>03 / LET&apos;S CONNECT</span><span>HAVE SOMETHING IN MIND?</span></div><p className="eyebrow">OPEN FOR GOOD IDEAS</p><h2 id="contact-heading">Let&apos;s make<br /><em>something</em><br />matter<span>.</span></h2><div className="contact-actions"><a className="contact-mail" href={`mailto:${EMAIL}`}>Start a conversation <Arrow diagonal /></a><button className="copy-button" type="button" onClick={copyEmail} aria-live="polite">{copied ? 'Copied!' : 'Copy email'} <span>{copied ? '✓' : '⧉'}</span></button></div><div className="contact-address">{EMAIL}</div></div>
        </section>
      </main>

      <footer className="site-footer"><div className="wrap footer-inner"><a className="brand" href="#top">anir<span className="brand-dot">.</span></a><p>© {new Date().getFullYear()} Anir Jung Thapa. Built with intention.</p><div><a href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/anir-jung-thapa-270a922bb/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="#top">Back to top ↑</a></div></div></footer>

      {commandOpen && <div className="command-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setCommandOpen(false); }}><div className="command-dialog" role="dialog" aria-modal="true" aria-label="Quick navigation"><div className="command-search"><span aria-hidden="true">⌕</span><input ref={commandInput} value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && visibleCommands[0]) openQuickLink(visibleCommands[0].href); }} placeholder="Where would you like to go?" aria-label="Search navigation" /><button type="button" onClick={() => setCommandOpen(false)} aria-label="Close quick navigation">ESC</button></div><div className="command-results">{visibleCommands.length ? visibleCommands.map((item) => <button type="button" key={item.label} onClick={() => openQuickLink(item.href)}><span>{item.label}</span><small>{item.hint}</small></button>) : <p>No matching destination.</p>}</div><div className="command-hint">TIP · PRESS CTRL / ⌘ + K ANYTIME</div></div></div>}
    </>
  );
}
