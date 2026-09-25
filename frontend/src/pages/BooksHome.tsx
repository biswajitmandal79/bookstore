import React, { useState } from 'react';
import { Book } from '../types';
import BookCard from '../components/BookCard/BookCard';
import './BooksHome.css';

const CATEGORIES = ['All', 'Fiction & Fantasy', 'Self-Development', 'Technology & Programming', 'Business & Finance', 'Sci-Fi & Space'];

interface BooksHomeProps {
  books: Book[];
  wishlistIds: string[];
  loading: boolean;
  onAddToCart: (book: Book) => void;
  onToggleWishlist: (bookId: string) => void;
}

const BooksHome: React.FC<BooksHomeProps> = ({ books, wishlistIds, loading, onAddToCart, onToggleWishlist }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = books.filter(b => {
    const matchCat = category === 'All' || b.category === category;
    const matchSearch = !search || b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section className="books-section">
      <div className="books-inner">
        <div className="books-toolbar">
          <div className="search-box">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search books or authors…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="search-input"
            />
            {search && <button className="search-clear" onClick={() => setSearch('')}>✕</button>}
          </div>
          <div className="books-result-count">{filtered.length} book{filtered.length !== 1 ? 's' : ''}</div>
        </div>

        <div className="category-tabs">
          {CATEGORIES.map(cat => (
            <button key={cat} className={`cat-tab ${category === cat ? 'active' : ''}`} onClick={() => setCategory(cat)}>
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="books-loading">
            <div className="spinner" /><p>Loading books…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="books-empty">
            <span>📚</span>
            <p>No books found</p>
            <span>Try a different search or category</span>
          </div>
        ) : (
          <div className="books-grid">
            {filtered.map(book => (
              <BookCard
                key={book.id}
                book={book}
                isWishlisted={wishlistIds.includes(book.id)}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BooksHome;
