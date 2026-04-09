import React from 'react';

const Experience = () => {
  return (
    <section className="section" id="experience">
      <div className="section-container">
        <div className="section-header fade-up">
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">Professional journey and contributions.</p>
        </div>

        <div className="exp-list fade-up">
          <div className="exp-item">
            <div className="exp-title">Junior Full Stack Developer</div>
            <div className="exp-meta">Detech Solution // Nov 2025 — Present</div>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px' }}>
              Developing high-performance user interfaces, optimizing state management, and translating complex designs into responsive, interactive web applications.
            </p>
          </div>

          <div className="exp-item">
            <div className="exp-title">Full Stack Developer Trainee</div>
            <div className="exp-meta">Detech Solution // Aug 2025 — Nov 2025</div>
          </div>

          <div className="exp-item">
            <div className="exp-title">Teaching Assistant</div>
            <div className="exp-meta">Itahari International College // Jun 2024 — Sep 2024</div>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px' }}>
              Engineered and maintained the core Inventory Management System for the college, ensuring seamless data tracking, optimal resource allocation, and streamlined operational efficiency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
