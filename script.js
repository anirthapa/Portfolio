// ===== Portfolio Script — Modernized with Parallax =====

(function () {
  "use strict";

  // ===== Custom Cursor =====
  const cursorDot = document.getElementById("cursorDot");
  const cursorRing = document.getElementById("cursorRing");
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  if (cursorDot && cursorRing) {
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + "px";
      cursorDot.style.top = mouseY + "px";
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.left = ringX + "px";
      cursorRing.style.top = ringY + "px";
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll("a, button, .skill-chip, .project-card, .social-card, .exp-card");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorDot.classList.add("hover");
        cursorRing.classList.add("hover");
      });
      el.addEventListener("mouseleave", () => {
        cursorDot.classList.remove("hover");
        cursorRing.classList.remove("hover");
      });
    });
  }

  // ===== Scroll Progress Bar =====
  const scrollProgress = document.getElementById("scrollProgress");
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    if (scrollProgress) {
      scrollProgress.style.width = scrollPercent + "%";
    }
  }

  // ===== Navbar Scroll Effect =====
  const navbar = document.getElementById("navbar");
  function updateNavbar() {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
  }

  // ===== Active Nav Link on Scroll =====
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveLink() {
    const scrollY = window.scrollY + 200;
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("data-section") === sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  // ===== Hamburger Menu =====
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      mobileMenu.classList.toggle("active");
      document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "";
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }

  // ===== Parallax Effect =====
  const parallaxLayers = document.querySelectorAll(".parallax-layer");
  const parallaxDividers = document.querySelectorAll(".parallax-divider");

  function updateParallax() {
    const scrollY = window.scrollY;

    parallaxLayers.forEach((layer) => {
      const speed = parseFloat(layer.dataset.speed) || 0.1;
      layer.style.transform = `translateY(${scrollY * speed}px)`;
    });

    parallaxDividers.forEach((divider) => {
      const speed = parseFloat(divider.dataset.speed) || 0.15;
      const rect = divider.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const offset = (centerY - window.innerHeight / 2) * speed;
      divider.style.transform = `translateY(${offset}px)`;
    });
  }

  // ===== Scroll Reveal Animations =====
  const revealElements = document.querySelectorAll("[data-reveal]");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay) || 0;
          setTimeout(() => {
            entry.target.classList.add("revealed");
          }, delay);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // ===== Typewriter Effect =====
  const typewriterEl = document.getElementById("typewriter");
  const roles = ["Full Stack Developer", "Frontend Engineer", "UI/UX Enthusiast", "Problem Solver"];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeWriter() {
    if (!typewriterEl) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 500; // Pause before new word
    }

    setTimeout(typeWriter, typeSpeed);
  }

  typeWriter();

  // ===== Counter Animation =====
  const statNumbers = document.querySelectorAll(".stat-number");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.count);
          animateCounter(entry.target, target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((el) => counterObserver.observe(el));

  function animateCounter(element, target) {
    let current = 0;
    const increment = target / 40;
    const duration = 1500;
    const stepTime = duration / 40;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, stepTime);
  }

  // ===== Project Card Tilt Effect =====
  const tiltCards = document.querySelectorAll("[data-tilt]");
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
    });
  });

  // ===== Scroll Event Listener (Throttled) =====
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateScrollProgress();
        updateNavbar();
        updateActiveLink();
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  });

  // ===== Smooth Scroll for Nav Links =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // ===== Copyright Year =====
  const yearEl = document.getElementById("copyright-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ===== Job Duration Calculator =====
  function updateJobDuration() {
    const durationElement = document.getElementById("current-job-duration");
    const durationTextSpan = document.getElementById("duration-text");

    if (durationElement && durationTextSpan) {
      const startDateStr = durationElement.getAttribute("data-start");
      const startDate = new Date(startDateStr);
      const currentDate = new Date();

      let months = (currentDate.getFullYear() - startDate.getFullYear()) * 12;
      months -= startDate.getMonth();
      months += currentDate.getMonth();
      months += 1; // Inclusive count

      if (months <= 0) months = 0;

      let durationString = "";
      if (months < 12) {
        durationString = `${months} mos`;
      } else {
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        durationString = `${years} yr${years > 1 ? "s" : ""}${remainingMonths > 0 ? " " + remainingMonths + " mos" : ""}`;
      }

      durationTextSpan.textContent = durationString;
    }
  }

  updateJobDuration();

  // ===== Initialize on Load =====
  updateScrollProgress();
  updateNavbar();
  updateParallax();

})();
