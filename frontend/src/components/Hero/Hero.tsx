import React from 'react';
import './Hero.css';

interface HeroProps {
  onBrowse: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBrowse }) => {
  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true">
        {/* Floating book decoration */}
        <div className="hero-book hero-book-1">📖</div>
        <div className="hero-book hero-book-2">📚</div>
        <div className="hero-book hero-book-3">📕</div>
        <div className="hero-book hero-book-4">📘</div>
        <div className="hero-book hero-book-5">📗</div>
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
      </div>
      <div className="hero-content">
        <div className="hero-label">✨ New arrivals every week</div>
        <h1 className="hero-title">
          Discover Your Next<br />
          <span className="hero-title-accent">Favourite Book</span>
        </h1>
        <p className="hero-subtitle">
          Explore thousands of titles across fiction, technology, self-improvement,
          and more. Curated just for you.
        </p>
        <div className="hero-actions">
          <button className="hero-btn-primary" onClick={onBrowse}>
            Browse Books
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
          <button className="hero-btn-secondary" onClick={onBrowse}>
            View Featured
          </button>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-num">10K+</span>
            <span className="hero-stat-label">Books</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-num">500+</span>
            <span className="hero-stat-label">Authors</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-num">50K+</span>
            <span className="hero-stat-label">Readers</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
