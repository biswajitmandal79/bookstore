import React from 'react';
import { Writer } from '../types';
import './WritersPage.css';

interface WritersPageProps {
  writers: Writer[];
  loading: boolean;
}

const WritersPage: React.FC<WritersPageProps> = ({ writers, loading }) => {
  if (loading) {
    return (
      <div className="page-section">
        <div className="page-section-inner">
          <div className="page-loading">
            <div className="spinner" />
            <p>Loading writers…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="page-section">
      <div className="page-section-inner">
        <div className="page-header">
          <h2 className="page-heading">My Writers</h2>
          <p className="page-subheading">{writers.length} authors you follow</p>
        </div>

        {writers.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">✍️</span>
            <p>No writers yet</p>
          </div>
        ) : (
          <div className="writers-grid">
            {writers.map((writer) => (
              <div key={writer.id} className="writer-card">
                <div className="writer-avatar-wrap">
                  <img src={writer.avatar} alt={writer.name} className="writer-avatar" />
                </div>
                <div className="writer-info">
                  <h3 className="writer-name">{writer.name}</h3>
                  <p className="writer-bio">{writer.bio}</p>
                  <div className="writer-stats">
                    <div className="writer-stat">
                      <span className="writer-stat-num">{writer.booksCount}</span>
                      <span className="writer-stat-label">Books</span>
                    </div>
                    <div className="writer-stat-sep" />
                    <div className="writer-stat">
                      <span className="writer-stat-num">{writer.followers}</span>
                      <span className="writer-stat-label">Followers</span>
                    </div>
                  </div>
                </div>
                <button className="follow-btn">Follow</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default WritersPage;
