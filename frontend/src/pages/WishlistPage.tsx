import React from 'react';
import { Book } from '../types';
import BookCard from '../components/BookCard/BookCard';
import './WishlistPage.css';

interface WishlistPageProps {
  books: Book[];
  wishlistIds: string[];
  loading: boolean;
  onAddToCart: (book: Book) => void;
  onToggleWishlist: (bookId: string) => void;
}

const WishlistPage: React.FC<WishlistPageProps> = ({
  books,
  wishlistIds,
  loading,
  onAddToCart,
  onToggleWishlist,
}) => {
  if (loading) {
    return (
      <div className="page-section">
        <div className="page-section-inner">
          <div className="page-loading">
            <div className="spinner" />
            <p>Loading wishlist…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="page-section">
      <div className="page-section-inner">
        <div className="page-header">
          <h2 className="page-heading">My Wishlist</h2>
          <p className="page-subheading">{books.length} book{books.length !== 1 ? 's' : ''} saved</p>
        </div>

        {books.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">❤️</span>
            <p>Your wishlist is empty</p>
            <span>Click the heart icon on any book to save it here.</span>
          </div>
        ) : (
          <div className="wishlist-grid">
            {books.map((book) => (
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

export default WishlistPage;
