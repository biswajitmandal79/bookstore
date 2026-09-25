import React from 'react';
import { Book } from '../../types';
import './BookCard.css';

interface BookCardProps {
  book: Book;
  isWishlisted: boolean;
  onAddToCart: (book: Book) => void;
  onToggleWishlist: (bookId: string) => void;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="star-rating" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={star <= Math.round(rating) ? '#f59e0b' : 'none'}
          stroke="#f59e0b"
          strokeWidth="1.5"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      <span className="star-value">{rating}</span>
    </div>
  );
};

const BookCard: React.FC<BookCardProps> = ({ book, isWishlisted, onAddToCart, onToggleWishlist }) => {
  const discount = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);

  return (
    <article className="book-card">
      <div className="book-card-cover">
        <img src={book.coverImage} alt={book.title} loading="lazy" />
        <div className="book-card-overlay" />
        <button
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={() => onToggleWishlist(book.id)}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={isWishlisted ? '#f87171' : 'none'} stroke={isWishlisted ? '#f87171' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
        {discount > 0 && (
          <span className="book-discount-badge">-{discount}%</span>
        )}
        {book.featured && (
          <span className="book-featured-badge">Featured</span>
        )}
      </div>

      <div className="book-card-body">
        <span className="book-category">{book.category}</span>
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        <StarRating rating={book.rating} />
        <p className="book-reviews">({book.reviewsCount.toLocaleString()} reviews)</p>
        <p className="book-description">{book.description}</p>
        <div className="book-card-footer">
          <div className="book-price">
            <span className="price-current">${book.price.toFixed(2)}</span>
            {book.originalPrice > book.price && (
              <span className="price-original">${book.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button className="add-to-cart-btn" onClick={() => onAddToCart(book)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Add
          </button>
        </div>
      </div>
    </article>
  );
};

export default BookCard;
