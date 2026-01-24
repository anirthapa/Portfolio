// Add scroll reveal animation
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document
  .querySelectorAll(
    ".contact-wrapper, .info-item, .contact-form-container, .timeline-item",
  )
  .forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px) scale(0.95)";
    el.style.transition =
      "opacity 0.8s cubic-bezier(0.5, 0, 0, 1), transform 0.8s cubic-bezier(0.5, 0, 0, 1)";
    if (el.classList.contains("timeline-item")) {
      el.style.transitionDelay = `${index * 0.2}s`; // Stagger effect
    }
    observer.observe(el);
  });

// Add visible class styles dynamically
const style = document.createElement("style");
style.textContent = `
  .visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

function scrollToElement(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

// Update Copyright Year
function updateCopyrightYear() {
  const yearSpan = document.getElementById('copyright-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

// Update Job Duration
function updateJobDuration() {
  const durationElement = document.getElementById('current-job-duration');
  const durationTextSpan = document.getElementById('duration-text');
  
  if (durationElement && durationTextSpan) {
    const startDateStr = durationElement.getAttribute('data-start');
    const startDate = new Date(startDateStr);
    const currentDate = new Date();
    
    // Calculate difference in months
    let months = (currentDate.getFullYear() - startDate.getFullYear()) * 12;
    months -= startDate.getMonth();
    months += currentDate.getMonth();
    
    // Add 1 to make it inclusive (like LinkedIn) e.g., Nov to Jan = Nov, Dec, Jan = 3 months
    months += 1;
    
    // Handle cases where start date is in future (shouldn't happen but good safety) or very recent
    if (months <= 0) months = 0;

    let durationString = "";
    if (months < 12) {
        durationString = `${months} mos`;
    } else {
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        durationString = `${years} yr${years > 1 ? 's' : ''}${remainingMonths > 0 ? " " + remainingMonths + " mos" : ""}`;
    }
    
    durationTextSpan.textContent = durationString;
  }
}

// Initialize dynamic updates
updateCopyrightYear();
updateJobDuration();
